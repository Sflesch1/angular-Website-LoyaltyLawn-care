// Add Review type for API responses
type Review = { Name: string; Message: string; Stars: number };
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home {
  testimonials: { Name: string; Message: string; Stars: number }[] = [];
  currentIndex = 0;
  animating = false;
  intervalId: any;
  animationState: 'enter' | 'leave' | '' = '';
  displayTestimonial: { Name: string; Message: string; Stars: number } | null = null;
  intervalMs = 4500; // Adjustable interval

  constructor(private http: HttpClient) {}

async ngOnInit() {
  // Fetch both 4 and 5 star reviews in a single call
  const reviews = await lastValueFrom(this.http.get<Review[]>('http://localhost:8080/reviews/stars?stars=4,5'));
  this.testimonials = reviews || [];
  if (this.testimonials.length > 0) {
    this.currentIndex = 0;
    this.displayTestimonial = this.testimonials[0];
    this.startRotation();
  }
}

  startRotation() {
    this.intervalId = setInterval(() => {
      this.nextTestimonial();
    }, this.intervalMs);
  }

  nextTestimonial() {
    this.animationState = 'leave';
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
      this.displayTestimonial = this.testimonials[this.currentIndex];
      this.animationState = 'enter';
      setTimeout(() => {
        this.animationState = '';
      }, 600); // Animation duration
    }, 600); // Animation duration
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
