import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourService, Destination } from '../../services/tour.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="destinations-hero">
      <div class="container">
        <h1>Explore Destinations</h1>
        <p>Browse 200+ carefully curated travel destinations across the globe</p>
      </div>
    </section>

    <section class="destinations-list">
      <div class="container">
        <!-- Filters & Search -->
        <div class="filters-container">
          <div class="filter-chips">
            <button 
              *ngFor="let cat of categories" 
              [class.active]="selectedCategory === cat"
              (click)="filterByCategory(cat)">
              {{cat}}
            </button>
          </div>
          
          <div class="search-box">
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (input)="filterDestinations()"
              placeholder="Search destinations...">
          </div>
        </div>

        <!-- Grid -->
        <div class="destinations-grid">
          <div class="dest-card" *ngFor="let dest of filteredDestinations">
            <div class="dest-image">
              <img [src]="dest.image" [alt]="dest.name">
              <div class="dest-type">{{dest.type}}</div>
            </div>
            <div class="dest-info">
              <div class="dest-header">
                <span class="tag" *ngFor="let tag of dest.tags">{{tag}}</span>
                <div class="rating">★ {{dest.rating}}</div>
              </div>
              <h3>{{dest.name}}</h3>
              <p class="location">📍 {{dest.location}}</p>
              <p class="description">{{dest.description}}</p>
              <div class="dest-footer">
                <p class="price">From <span>\${{dest.price}}</span></p>
                <a [routerLink]="['/book']" [queryParams]="{dest: dest.name}" class="btn btn-primary btn-sm">Book Now</a>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredDestinations.length === 0" class="no-results">
          <h3>No destinations found</h3>
          <p>Try adjusting your search or filter settings.</p>
          <button (click)="resetFilters()" class="btn btn-outline">Reset All Filters</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .destinations-hero {
      background: var(--primary-dark);
      padding: 150px 0 80px;
      color: white;
      text-align: center;
    }
    
    .destinations-hero h1 {
      font-size: 3.5rem;
      color: white;
      margin-bottom: 1rem;
    }
    
    .destinations-hero p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1.1rem;
    }
    
    .destinations-list {
      padding: 4rem 0;
    }
    
    .filters-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      gap: 2rem;
    }
    
    .filter-chips {
      display: flex;
      gap: 0.8rem;
      flex-wrap: wrap;
    }
    
    .filter-chips button {
      background: white;
      padding: 0.6rem 1.2rem;
      border-radius: 50px;
      border: 1px solid var(--border-color);
      font-weight: 600;
      color: var(--text-light);
    }
    
    .filter-chips button.active {
      background: var(--primary-dark);
      color: white;
      border-color: var(--primary-dark);
    }
    
    .search-box input {
      padding: 0.8rem 1.5rem;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      width: 300px;
      outline: none;
    }
    
    .destinations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2.5rem;
    }
    
    .dest-card {
      background: white;
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .dest-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .dest-image {
      height: 240px;
      position: relative;
    }
    
    .dest-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .dest-type {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.8rem;
      background: linear-gradient(transparent, rgba(0,0,0,0.7));
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .dest-info {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .dest-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .tag {
      background: #e0f2f1;
      color: #00796b;
      padding: 0.2rem 0.6rem;
      border-radius: 4px;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      margin-right: 0.5rem;
    }
    
    .rating {
      color: var(--primary-accent);
      font-weight: 700;
    }
    
    .dest-info h3 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .location {
      color: var(--text-light);
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .description {
      color: var(--text-light);
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      flex: 1;
    }
    
    .dest-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1.2rem;
      border-top: 1px solid var(--border-color);
    }
    
    .price {
      font-size: 0.9rem;
      color: var(--text-light);
    }
    
    .price span {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--primary-dark);
    }
    
    .btn-sm {
      padding: 0.6rem 1.2rem;
      font-size: 0.9rem;
    }
    
    .no-results {
      text-align: center;
      padding: 5rem 0;
    }
    
    .no-results h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    .no-results p {
      color: var(--text-light);
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .filters-container { flex-direction: column; align-items: flex-start; }
      .search-box input { width: 100%; }
      .destinations-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class DestinationsComponent implements OnInit {
  allDestinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  categories = ['All', 'Beach', 'Mountains', 'Cultural', 'Adventure', 'Heritage'];
  selectedCategory = 'All';
  searchQuery = '';

  constructor(private tourService: TourService) {}

  ngOnInit() {
    this.tourService.getDestinations().subscribe(dests => {
      console.log('Destinations loaded:', dests.length);
      this.allDestinations = dests;
      // Force an initial filter call to ensure the UI updates correctly
      this.filterDestinations();
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.filterDestinations();
  }

  filterDestinations() {
    if (!this.allDestinations || this.allDestinations.length === 0) {
      this.filteredDestinations = [];
      return;
    }

    this.filteredDestinations = this.allDestinations.filter(dest => {
      const matchesCategory = this.selectedCategory === 'All' || 
                             dest.type.toLowerCase() === this.selectedCategory.toLowerCase();
      
      const query = this.searchQuery.toLowerCase().trim();
      const matchesSearch = dest.name.toLowerCase().includes(query) || 
                            dest.location.toLowerCase().includes(query) ||
                            dest.description.toLowerCase().includes(query);
                            
      return matchesCategory && matchesSearch;
    });
  }

  resetFilters() {
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.filteredDestinations = this.allDestinations;
  }
}
