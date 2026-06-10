import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourService, TourPackage } from '../../services/tour.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="booking-hero">
      <div class="container">
        <h1>Book Your Tour</h1>
        <p>Reserve your dream adventure in a few simple steps</p>
      </div>
    </section>

    <section class="booking-section">
      <div class="container">
        <div class="booking-grid">
          <div class="booking-main">
            <div class="card mb-2">
              <h2 class="card-title">Select a Tour</h2>
              <div class="tour-list">
                <div
                  *ngFor="let pkg of tourPackages"
                  class="tour-item"
                  [class.active]="selectedTour?.id === pkg.id"
                  (click)="selectTour(pkg)">
                  <div class="tour-info">
                    <h4>{{ pkg.name }} - {{ pkg.destination }}</h4>
                    <p>{{ pkg.description }} - {{ pkg.duration }}</p>
                  </div>
                  <div class="tour-price">\${{ pkg.pricePerPerson }} <span>per person</span></div>
                </div>
              </div>
            </div>

            <div class="card">
              <h2 class="card-title">Your Details</h2>
              <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
                <div class="form-row">
                  <div class="form-group">
                    <label>First Name</label>
                    <input type="text" formControlName="firstName" placeholder="John">
                  </div>
                  <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" formControlName="lastName" placeholder="Doe">
                  </div>
                </div>

                <div class="form-group">
                  <label>Email Address</label>
                  <input type="email" formControlName="email" placeholder="john@example.com">
                </div>

                <div class="form-group">
                  <label>Phone Number</label>
                  <input type="tel" formControlName="phone" placeholder="+91 98765 43210">
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Travel Date</label>
                    <input type="date" formControlName="date">
                  </div>
                  <div class="form-group">
                    <label>Number of Travelers</label>
                    <select formControlName="travelers">
                      <option *ngFor="let n of [1,2,3,4,5,6,7,8,9,10]" [value]="n">{{ n }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label>Special Requests (optional)</label>
                  <textarea formControlName="requests" rows="4" placeholder="Dietary requirements, accessibility needs..."></textarea>
                </div>

                <div class="validation-feedback" *ngIf="!selectedTour">
                  <p>Please select a tour package above to continue.</p>
                </div>
                <div class="validation-feedback" *ngIf="selectedTour && bookingForm.invalid">
                  <p>Please fill in all required fields correctly.</p>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="bookingForm.invalid || !selectedTour">
                  {{ !selectedTour ? 'Select a Tour' : (bookingForm.invalid ? 'Complete Form' : 'Confirm Booking') }}
                </button>
              </form>
            </div>
          </div>

          <div class="booking-sidebar">
            <div class="summary-card sticky">
              <h3>Booking Summary</h3>

              <div class="summary-image" *ngIf="selectedTour">
                <img [src]="'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400'" alt="Destination">
              </div>

              <div class="summary-details">
                <div class="summary-row">
                  <span>Tour</span>
                  <span class="val">{{ selectedTour?.name || 'Not selected' }}</span>
                </div>
                <div class="summary-row">
                  <span>Date</span>
                  <span class="val">{{ bookingForm.get('date')?.value || 'Not selected' }}</span>
                </div>
                <div class="summary-row">
                  <span>Travelers</span>
                  <span class="val">{{ bookingForm.get('travelers')?.value }}</span>
                </div>
                <div class="summary-row">
                  <span>Price per person</span>
                  <span class="val">\${{ selectedTour?.pricePerPerson || 0 }}</span>
                </div>
                <hr>
                <div class="summary-row total">
                  <span>Total</span>
                  <span>\${{ totalPrice }}</span>
                </div>
              </div>

              <div class="summary-info">
                <p>No booking fees</p>
                <p>Free cancellation up to 48h before</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .booking-hero {
      background: var(--primary-dark);
      padding: 150px 0 80px;
      color: white;
      text-align: center;
    }

    .booking-hero h1 { font-size: 3.5rem; color: white; margin-bottom: 1rem; }

    .booking-section { padding: 4rem 0; background: #fdfdfd; }

    .booking-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      align-items: flex-start;
    }

    .card {
      background: white;
      padding: 2.5rem;
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      border: 1px solid var(--border-color);
    }

    .card-title { font-size: 1.8rem; margin-bottom: 2rem; }

    .tour-list { display: flex; flex-direction: column; gap: 1rem; }

    .tour-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tour-item:hover { border-color: var(--primary-accent); }

    .tour-item.active {
      border-color: var(--primary-accent);
      background: #fffdf5;
    }

    .tour-info h4 { font-family: var(--font-sans); font-size: 1.1rem; margin-bottom: 0.3rem; }

    .tour-info p { font-size: 0.9rem; color: var(--text-light); }

    .tour-price { text-align: right; font-weight: 800; font-size: 1.2rem; color: var(--primary-dark); }

    .tour-price span { display: block; font-size: 0.75rem; font-weight: 500; color: var(--text-light); }

    .form-group { margin-bottom: 1.5rem; }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

    label { display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }

    input, select, textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      outline: none;
      font-family: inherit;
    }

    input:focus, textarea:focus { border-color: var(--primary-accent); }

    .btn-block { width: 100%; padding: 1.2rem; font-size: 1.1rem; margin-top: 1rem; }
    .btn-block:disabled { background: #ccc; cursor: not-allowed; }

    .validation-feedback {
      background: #fff5f5;
      color: #c53030;
      padding: 1rem;
      border-radius: var(--radius-sm);
      margin-bottom: 1rem;
      font-size: 0.9rem;
      font-weight: 600;
      border-left: 4px solid #c53030;
    }

    .summary-card {
      background: #f8f6f0;
      padding: 2rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .sticky { position: sticky; top: 100px; }

    .summary-card h3 { margin-bottom: 1.5rem; }

    .summary-image { height: 150px; border-radius: var(--radius-sm); overflow: hidden; margin-bottom: 1.5rem; }

    .summary-image img { width: 100%; height: 100%; object-fit: cover; }

    .summary-details { margin-bottom: 2rem; }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-size: 0.95rem;
    }

    .summary-row .val { font-weight: 700; color: var(--primary-dark); }

    .summary-row.total {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary-dark);
      margin-top: 1rem;
    }

    .summary-info { color: #2e7d32; font-size: 0.9rem; font-weight: 600; }

    @media (max-width: 992px) {
      .booking-grid { grid-template-columns: 1fr; }
      .summary-card { position: static; }
    }

    @media (max-width: 576px) {
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class BookingComponent implements OnInit {
  tourPackages: TourPackage[] = [];
  selectedTour: TourPackage | null = null;
  bookingForm: FormGroup;
  showSuccess = false;

  constructor(
    private tourService: TourService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      travelers: [1, Validators.required],
      requests: ['']
    });
  }

  ngOnInit() {
    this.tourService.getTourPackages().subscribe(pkgs => {
      this.tourPackages = pkgs;

      this.route.queryParams.subscribe(params => {
        if (params['dest']) {
          const matchedPackage = this.tourPackages.find(packageItem => packageItem.destination.includes(params['dest']));
          this.selectedTour = matchedPackage ?? this.tourPackages[0] ?? null;
        } else {
          this.selectedTour = this.tourPackages[0] ?? null;
        }
      });
    });
  }

  selectTour(pkg: TourPackage) {
    this.selectedTour = pkg;
  }

  get totalPrice(): number {
    if (!this.selectedTour) {
      return 0;
    }

    return this.selectedTour.pricePerPerson * Number(this.bookingForm.get('travelers')?.value || 1);
  }

  onSubmit() {
    if (!this.bookingForm.valid || !this.selectedTour) {
      return;
    }

    const bookingData = {
      ...this.bookingForm.value,
      tour: this.selectedTour,
      total: this.totalPrice
    };

    this.tourService.submitBooking(bookingData).subscribe({
      next: () => {
        this.showSuccess = true;
        this.router.navigate(['/payment'], {
          queryParams: {
            amount: this.totalPrice,
            tour: this.selectedTour?.name
          }
        });
      },
      error: error => {
        console.error('Booking failed:', error);
        alert('Sorry, there was an error processing your booking.');
      }
    });
  }

  closeSuccess() {
    this.showSuccess = false;
    this.bookingForm.reset({ travelers: 1 });
  }
}
