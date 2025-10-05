import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {
  review: { name: string; message: string; stars: number | null } = { name: '', message: '', stars: null };
  success = false;
  hoverStars: number = 0;

  constructor(private http: HttpClient) {}

  setStars(stars: number) {
    this.review.stars = stars;
  }

  submitReview() {
    if (!this.review.name || !this.review.message || !this.review.stars) {
      return;
    }
    this.http.post('http://localhost:8080/reviews', {
      Name: this.review.name,
      Message: this.review.message,
      Stars: this.review.stars
    }).subscribe({
      next: () => {
        this.success = true;
      },
      error: () => {
        alert('There was an error submitting your review. Please try again later.');
      }
    });
  }
}