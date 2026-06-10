import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourService, Destination } from '../../services/tour.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <header class="hero">
      <div class="container hero-content">
        <div class="hero-text">
          <span class="badge">DISCOVER THE WORLD</span>
          <h1>Travel Beyond <span>Boundaries</span></h1>
          <p>Explore handpicked destinations, hidden gems, and unforgettable experiences tailored just for you.</p>
          <div class="hero-actions">
            <a routerLink="/destinations" class="btn btn-primary">Explore Destinations</a>
            <a routerLink="/book" class="btn btn-outline">Book a Tour</a>
          </div>
        </div>
        
        <div class="hero-stats">
          <div class="stat-card">
            <h3>200+</h3>
            <p>Destinations</p>
          </div>
          <div class="stat-card">
            <h3>15k+</h3>
            <p>Happy Travelers</p>
          </div>
          <div class="stat-card">
            <h3>4.9</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>
      
      <!-- Search Bar -->
      <div class="container">
        <div class="search-bar">
          <div class="search-input">
            <label>Where do you want to go?</label>
            <input type="text" placeholder="Search destination...">
          </div>
          <div class="search-input">
            <label>All Types</label>
            <select>
              <option>All Types</option>
              <option>Beach</option>
              <option>Mountains</option>
              <option>Cultural</option>
              <option>Adventure</option>
            </select>
          </div>
          <div class="search-input">
            <label>Date</label>
            <input type="date">
          </div>
          <button class="btn btn-primary">Search Tours</button>
        </div>
      </div>
    </header>

    <!-- Featured Destinations -->
    <section class="featured">
      <div class="container">
        <div class="section-header">
          <div>
            <h2 class="section-title">Featured Destinations</h2>
            <p class="section-subtitle">Handpicked spots loved by travelers</p>
          </div>
          <a routerLink="/destinations" class="btn btn-outline btn-sm">View all destinations</a>
        </div>
        
        <div class="destinations-grid">
          <div class="dest-card" *ngFor="let dest of featuredDestinations">
            <div class="dest-image">
              <img [src]="dest.image" [alt]="dest.name">
              <div class="dest-tags">
                <span class="tag" *ngFor="let tag of dest.tags">{{tag}}</span>
              </div>
            </div>
            <div class="dest-info">
              <div class="dest-header">
                <h3>{{dest.name}}</h3>
                <div class="rating">★ {{dest.rating}}</div>
              </div>
              <p class="location">📍 {{dest.location}}</p>
              <div class="dest-footer">
                <p class="price">From <span>\${{dest.price}}</span></p>
                <a [routerLink]="['/book']" [queryParams]="{dest: dest.name}" class="btn-link">Book Now →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-us">
      <div class="container">
        <div class="text-center">
          <h2 class="section-title">Why Choose WanderVista?</h2>
          <p class="section-subtitle">Your trusted travel partner</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="icon">🗺️</div>
            <h3>Curated Itineraries</h3>
            <p>Expert-planned routes that maximize your time and create lasting memories.</p>
          </div>
          <div class="feature-card">
            <div class="icon">🛡️</div>
            <h3>Secure Booking</h3>
            <p>Your payments and personal data are always protected with bank-grade security.</p>
          </div>
          <div class="feature-card">
            <div class="icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Our travel experts are available round the clock to assist you anywhere.</p>
          </div>
          <div class="feature-card">
            <div class="icon">💰</div>
            <h3>Best Price Guarantee</h3>
            <p>Found it cheaper? We'll match it — no questions asked.</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-dark) 0%, #252545 100%);
      padding: 180px 0 100px;
      color: white;
      position: relative;
    }
    
    .hero-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
      margin-bottom: 60px;
    }
    
    .hero-text {
      flex: 1;
    }
    
    .badge {
      background: rgba(201, 162, 39, 0.2);
      color: var(--primary-accent);
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 2px;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    
    .hero-text h1 {
      font-size: 4.5rem;
      line-height: 1.1;
      color: white;
      margin-bottom: 1.5rem;
    }
    
    .hero-text h1 span {
      color: var(--primary-accent);
    }
    
    .hero-text p {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2.5rem;
      max-width: 500px;
    }
    
    .hero-actions {
      display: flex;
      gap: 1.5rem;
    }
    
    .btn {
      padding: 1rem 2rem;
      border-radius: var(--radius-sm);
      font-weight: 600;
      display: inline-block;
    }
    
    .btn-primary {
      background: var(--primary-accent);
      color: var(--primary-dark);
    }
    
    .btn-outline {
      border: 2px solid white;
      color: white;
    }
    
    .hero-stats {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 1.5rem 2.5rem;
      border-radius: var(--radius-md);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .stat-card h3 {
      font-size: 2rem;
      color: white;
      margin-bottom: 0.2rem;
    }
    
    .stat-card p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }
    
    .search-bar {
      background: white;
      padding: 2.5rem;
      border-radius: var(--radius-md);
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      gap: 2rem;
      align-items: flex-end;
      box-shadow: var(--shadow-lg);
      margin-top: -50px;
      position: relative;
      z-index: 10;
    }
    
    .search-input label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-light);
      margin-bottom: 0.8rem;
    }
    
    .search-input input, .search-input select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid var(--border-color);
      border-radius: var(--radius-sm);
      outline: none;
      font-family: inherit;
    }
    
    /* Featured Section */
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: var(--spacing-md);
    }
    
    .destinations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    
    .dest-card {
      background: white;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
    }
    
    .dest-card:hover {
      transform: translateY(-10px);
      box-shadow: var(--shadow-lg);
    }
    
    .dest-image {
      height: 250px;
      position: relative;
    }
    
    .dest-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .dest-tags {
      position: absolute;
      top: 15px;
      left: 15px;
      display: flex;
      gap: 0.5rem;
    }
    
    .tag {
      background: rgba(255, 255, 255, 0.9);
      padding: 0.3rem 0.8rem;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--primary-dark);
    }
    
    .dest-info {
      padding: 1.5rem;
    }
    
    .dest-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .rating {
      color: var(--primary-accent);
      font-weight: 700;
    }
    
    .location {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
    
    .dest-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--border-color);
    }
    
    .price {
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    .price span {
      font-size: 1.2rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
    
    .btn-link {
      color: var(--primary-dark);
      font-weight: 700;
      font-size: 0.9rem;
    }
    
    .btn-link:hover {
      color: var(--primary-accent);
    }
    
    /* Why Us */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .feature-card {
      background: white;
      padding: 3rem 2rem;
      border-radius: var(--radius-md);
      text-align: center;
      transition: all 0.3s ease;
      border-bottom: 4px solid transparent;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-md);
      border-bottom-color: var(--primary-accent);
    }
    
    .feature-card .icon {
      font-size: 3rem;
      margin-bottom: 1.5rem;
    }
    
    .feature-card h3 {
      font-family: var(--font-sans);
      margin-bottom: 1rem;
    }
    
    .feature-card p {
      color: var(--text-light);
      font-size: 0.95rem;
    }
    
    @media (max-width: 992px) {
      .hero-text h1 { font-size: 3.5rem; }
      .search-bar { grid-template-columns: 1fr 1fr; gap: 1rem; }
    }
    
    @media (max-width: 768px) {
      .hero-content { flex-direction: column; text-align: center; }
      .hero-text p { margin: 0 auto 2rem; }
      .hero-actions { justify-content: center; }
      .hero-stats { flex-direction: row; justify-content: center; flex-wrap: wrap; }
      .search-bar { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredDestinations: Destination[] = [];

  constructor(private tourService: TourService) {}

  ngOnInit() {
    this.tourService.getDestinations().subscribe(dests => {
      this.featuredDestinations = dests.slice(0, 4);
    });
  }
}
