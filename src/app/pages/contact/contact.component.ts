import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="contact-hero">
      <div class="container">
        <h1>Get in Touch</h1>
        <p>We're here to help plan your perfect trip</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info">
            <h2>Let's Plan Your Adventure</h2>
            <p class="subtitle">Have a question about a destination, need help with booking, or want a custom itinerary? Reach out — our travel experts are ready to help.</p>
            
            <div class="info-cards">
              <div class="info-card">
                <div class="icon">📍</div>
                <div>
                  <h4>Office Address</h4>
                  <p>42 Marina Road, Chennai, Tamil Nadu 600001, India</p>
                </div>
              </div>
              <div class="info-card">
                <div class="icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div class="info-card">
                <div class="icon">✉️</div>
                <div>
                  <h4>Email</h4>
                  <p>hello&#64;wandervista.in</p>
                </div>
              </div>
              <div class="info-card">
                <div class="icon">🕒</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon–Sat: 9am–7pm IST</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-container">
            <div class="card">
              <h3>Send a Message</h3>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
                <div class="form-row">
                  <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" formControlName="name" placeholder="Your name">
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" formControlName="email" placeholder="your&#64;email.com">
                  </div>
                </div>
                
                <div class="form-group">
                  <label>Subject</label>
                  <select formControlName="subject">
                    <option value="">Select a subject</option>
                    <option value="Inquiry">General Inquiry</option>
                    <option value="Booking">Booking Support</option>
                    <option value="Custom">Custom Itinerary</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Message</label>
                  <textarea formControlName="message" rows="5" placeholder="Tell us how we can help..."></textarea>
                </div>

                <button type="submit" class="btn btn-primary btn-block" [disabled]="contactForm.invalid">
                  Send Message
                </button>
                
                <p class="success-msg" *ngIf="submitted">✓ Message sent successfully!</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <h2 class="text-center section-title">Frequently Asked Questions</h2>
        <div class="faq-list">
          <div class="faq-item" *ngFor="let faq of faqs; let i = index" (click)="toggleFaq(i)">
            <div class="faq-question">
              <h4>{{faq.q}}</h4>
              <span class="arrow" [class.open]="faq.open">▼</span>
            </div>
            <div class="faq-answer" *ngIf="faq.open">
              <p>{{faq.a}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-hero {
      background: var(--primary-dark);
      padding: 150px 0 80px;
      color: white;
      text-align: center;
    }
    
    .contact-hero h1 { font-size: 3.5rem; color: white; margin-bottom: 1rem; }
    
    .contact-section { padding: 5rem 0; }
    
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 5rem;
      align-items: center;
    }
    
    .contact-info h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
    
    .subtitle { color: var(--text-light); font-size: 1.1rem; margin-bottom: 3rem; }
    
    .info-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    
    .info-card { display: flex; gap: 1rem; align-items: flex-start; }
    
    .info-card .icon {
      width: 50px;
      height: 50px;
      background: #e0f2f1;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }
    
    .info-card h4 { font-family: var(--font-sans); font-size: 1rem; margin-bottom: 0.3rem; }
    
    .info-card p { font-size: 0.9rem; color: var(--text-light); }
    
    /* Form */
    .card {
      background: white;
      padding: 3rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
    }
    
    .card h3 { margin-bottom: 2rem; }
    
    .form-group { margin-bottom: 1.5rem; }
    
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    
    label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; }
    
    input, select, textarea {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      outline: none;
      font-family: inherit;
    }
    
    .btn-block { width: 100%; padding: 1rem; font-size: 1.1rem; }
    
    .success-msg { color: #2e7d32; font-weight: 600; margin-top: 1rem; text-align: center; }
    
    /* FAQ */
    .faq-section { background: #f8f6f0; padding: 6rem 0; }
    
    .faq-list { max-width: 800px; margin: 3rem auto 0; }
    
    .faq-item {
      background: white;
      margin-bottom: 1rem;
      border-radius: var(--radius-sm);
      overflow: hidden;
      cursor: pointer;
      border: 1px solid var(--border-color);
    }
    
    .faq-question {
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .faq-question h4 { font-family: var(--font-sans); font-size: 1.1rem; }
    
    .arrow { font-size: 0.8rem; transition: transform 0.3s ease; }
    
    .arrow.open { transform: rotate(180deg); }
    
    .faq-answer { padding: 0 2rem 1.5rem; border-top: 1px solid #eee; padding-top: 1.5rem; }
    
    .faq-answer p { color: var(--text-light); line-height: 1.8; }
    
    @media (max-width: 992px) {
      .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
    
    @media (max-width: 576px) {
      .info-cards { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  faqs = [
    { q: 'How do I modify or cancel my booking?', a: 'You can modify or cancel your booking through our website or by contacting our support team. Cancellations made 48 hours before the tour are fully refundable.', open: false },
    { q: 'Are the tour prices inclusive of accommodation?', a: 'Yes, most of our tour packages include luxury accommodation and breakfast. Check the specific tour details for a full list of inclusions.', open: false },
    { q: 'Do you offer group discounts?', a: 'Absolutely! Groups of 5 or more are eligible for special discounts. Contact our team for a custom group quote.', open: false },
    { q: 'Is travel insurance included?', a: 'Travel insurance is not included by default, but we highly recommend adding it during the booking process for your safety.', open: false },
    { q: 'Can I create a custom itinerary?', a: 'Yes! We love creating unique experiences. Reach out via the contact form with your preferences, and we will build a custom trip for you.', open: false }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.submitted = true;
      setTimeout(() => {
        this.submitted = false;
        this.contactForm.reset({ subject: '' });
      }, 3000);
    }
  }
}
