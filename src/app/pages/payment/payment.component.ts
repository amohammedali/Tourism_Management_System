import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <section class="payment-hero">
      <div class="container">
        <h1>Secure Payment</h1>
        <p>Complete your booking for your upcoming adventure</p>
      </div>
    </section>

    <section class="payment-section">
      <div class="container">
        <div class="payment-grid">
          <div class="payment-form-container">
            <div class="card">
              <h3>Credit / Debit Card</h3>
              <form [formGroup]="paymentForm" (ngSubmit)="processPayment()">
                <div class="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" formControlName="cardName" placeholder="Full name on card">
                  <div class="error-hint" *ngIf="paymentForm.get('cardName')?.touched && paymentForm.get('cardName')?.invalid">
                    Name is required (min 3 chars)
                  </div>
                </div>

                <div class="form-group">
                  <label>Card Number</label>
                  <div class="card-input-wrapper">
                    <input type="text" formControlName="cardNumber" (input)="formatCardNumber($event)" placeholder="0000 0000 0000 0000" maxlength="19">
                    <span class="card-icon">Card</span>
                  </div>
                  <div class="error-hint" *ngIf="paymentForm.get('cardNumber')?.touched && paymentForm.get('cardNumber')?.invalid">
                    Enter a valid 16-digit card number
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>Expiry Date</label>
                    <input type="text" formControlName="expiry" (input)="formatExpiry($event)" placeholder="MM / YY" maxlength="7">
                    <div class="error-hint" *ngIf="paymentForm.get('expiry')?.touched && paymentForm.get('expiry')?.invalid">
                      Use MM / YY
                    </div>
                  </div>
                  <div class="form-group">
                    <label>CVV</label>
                    <input type="password" formControlName="cvv" placeholder="123" maxlength="3">
                    <div class="error-hint" *ngIf="paymentForm.get('cvv')?.touched && paymentForm.get('cvv')?.invalid">
                      3 digits required
                    </div>
                  </div>
                </div>

                <div class="payment-methods">
                  <span>Visa</span>
                  <span>Mastercard</span>
                </div>

                <div class="validation-feedback" *ngIf="paymentForm.invalid && paymentForm.dirty">
                  <p>Please correct the errors above to enable payment.</p>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="paymentForm.invalid || processing">
                  {{ processing ? 'Processing...' : 'Confirm & Pay $' + amount }}
                </button>
              </form>
            </div>
          </div>

          <div class="payment-summary">
            <div class="card summary-card">
              <h3>Order Summary</h3>
              <div class="summary-item">
                <span>Tour Package</span>
                <span class="val">{{ tourName }}</span>
              </div>
              <div class="summary-item">
                <span>Amount to Pay</span>
                <span class="val highlight">\${{ amount }}</span>
              </div>
              <p class="secure-text">Your payment is handled locally for this demo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal-overlay" *ngIf="paymentSuccess">
      <div class="modal">
        <div class="modal-icon">Success</div>
        <h2>Payment Successful!</h2>
        <p>
          Thank you! Your payment of <strong>\${{ amount }}</strong> has been processed.
          Your booking is now confirmed.
        </p>
        <button class="btn btn-primary" routerLink="/">Go to Homepage</button>
      </div>
    </div>
  `,
  styles: [`
    .payment-hero { background: var(--primary-dark); padding: 150px 0 60px; color: white; text-align: center; }
    .payment-hero h1 { font-size: 3rem; color: white; margin-bottom: 1rem; }

    .payment-section { padding: 4rem 0; background: #fdfdfd; min-height: 70vh; }

    .payment-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 3rem; }

    .card { background: white; padding: 2.5rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); }

    .form-group { margin-bottom: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

    label { display: block; font-size: 0.9rem; font-weight: 600; margin-bottom: 0.5rem; }

    .card-input-wrapper { position: relative; }
    .card-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; color: var(--text-light); }

    input { width: 100%; padding: 0.8rem; border: 1px solid var(--border-color); border-radius: var(--radius-sm); outline: none; font-family: inherit; }
    input:focus { border-color: var(--primary-accent); }

    .payment-methods { display: flex; gap: 1rem; margin: 1.5rem 0; color: var(--text-light); font-weight: 600; }

    .btn-block { width: 100%; padding: 1.2rem; font-size: 1.1rem; }
    .btn-block:disabled { background: #ccc; cursor: not-allowed; }

    .error-hint { color: #d32f2f; font-size: 0.8rem; margin-top: 0.3rem; font-weight: 500; }
    .validation-feedback { background: #fff5f5; color: #c53030; padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.9rem; font-weight: 600; border-left: 4px solid #c53030; }

    .summary-card { background: #f8f6f0; }
    .summary-item { display: flex; justify-content: space-between; margin-bottom: 1rem; }
    .summary-item .val { font-weight: 700; color: var(--primary-dark); }
    .summary-item .val.highlight { font-size: 1.5rem; color: #2e7d32; }
    .secure-text { color: var(--text-light); font-size: 0.85rem; margin-top: 2rem; text-align: center; }

    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 1rem;
    }

    .modal {
      background: white;
      padding: 3rem;
      border-radius: var(--radius-lg);
      max-width: 500px;
      text-align: center;
    }

    .modal-icon { font-size: 2rem; margin-bottom: 1.5rem; color: var(--primary-accent); font-weight: 700; }

    @media (max-width: 992px) { .payment-grid { grid-template-columns: 1fr; } }
  `]
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  processing = false;
  paymentSuccess = false;
  amount = 0;
  tourName = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      cardName: ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9 ]{16,22}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\s?\/\s?([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const storedSummary = this.readStoredSummary();
      this.amount = Number(params['amount'] || storedSummary?.amount || 0);
      this.tourName = params['tour'] || storedSummary?.tour || 'Tour Package';
    });
  }

  formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 16);
    const formattedValue = digitsOnly.match(/.{1,4}/g)?.join(' ') || digitsOnly;
    this.paymentForm.patchValue({ cardNumber: formattedValue }, { emitEvent: false });
  }

  formatExpiry(event: Event) {
    const input = event.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 4);
    const formattedValue = digitsOnly.length > 2
      ? `${digitsOnly.slice(0, 2)} / ${digitsOnly.slice(2)}`
      : digitsOnly;
    this.paymentForm.patchValue({ expiry: formattedValue }, { emitEvent: false });
  }

  processPayment() {
    if (!this.paymentForm.valid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    this.processing = true;

    const payments = this.readPayments();
    payments.unshift({
      amount: this.amount,
      tour: this.tourName,
      cardholder: this.paymentForm.value.cardName,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('wandervista.payments', JSON.stringify(payments));
    localStorage.removeItem('wandervista.pendingPayment');

    this.processing = false;
    this.paymentSuccess = true;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  private readStoredSummary(): { amount: number; tour: string } | null {
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

  private readPayments(): Array<{ amount: number; tour: string; cardholder: string; createdAt: string }> {
    if (typeof window === 'undefined') {
      return [];
    }

    const rawPayments = localStorage.getItem('wandervista.payments');
    if (!rawPayments) {
      return [];
    }

    try {
      const parsed = JSON.parse(rawPayments);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
