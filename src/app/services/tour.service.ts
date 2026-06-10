import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { DESTINATIONS, TOUR_PACKAGES, Destination, TourPackage, StoredBooking } from '../data/travel-data';

export type { Destination, TourPackage } from '../data/travel-data';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${this.apiUrl}/destinations`).pipe(
      catchError(() => of([...DESTINATIONS]))
    );
  }

  getTourPackages(): Observable<TourPackage[]> {
    return of([...TOUR_PACKAGES]);
  }

  submitBooking(bookingData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bookings`, bookingData).pipe(
      tap((response) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('wandervista.pendingPayment', JSON.stringify({
            amount: bookingData.total,
            tour: bookingData.tour?.name || 'Tour Package',
            booking: response
          }));
        }
      })
    );
  }

  getStoredBookingSummary(): { amount: number; tour: string } | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const rawSummary = localStorage.getItem('wandervista.pendingPayment');
    if (!rawSummary) {
      return null;
    }

    try {
      const parsed = JSON.parse(rawSummary) as { amount?: number; tour?: string };
      if (typeof parsed.amount === 'number' && parsed.tour) {
        return { amount: parsed.amount, tour: parsed.tour };
      }
    } catch {
      return null;
    }

    return null;
  }
}
