import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.restoreSession();
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.user) {
          const sessionUser = { name: response.user.name, email: response.user.email };
          if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(sessionUser));
          }
          this.currentUserSubject.next(sessionUser);
        }
      })
    );
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  private restoreSession() {
    if (typeof window === 'undefined') {
      return;
    }

    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      return;
    }

    try {
      this.currentUserSubject.next(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem('currentUser');
    }
  }
}
