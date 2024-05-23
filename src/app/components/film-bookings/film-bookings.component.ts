import { Component, Input } from '@angular/core';
import { Film } from '../film/film';
import { CommonModule } from '@angular/common';

export interface Seat{
  userOccupied : boolean,
  occupied : boolean,
  selected : boolean
}

@Component({
  selector: 'app-film-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-bookings.component.html',
  styleUrl: './film-bookings.component.css'
})
export class FilmBookingsComponent {
  @Input() film! : Film;
  seats: Seat[][] = [];

  ngOnInit(): void {
    this.initializeSeats();
  }

  initializeSeats(): void {
    const rows = [
      Array(8).fill(null).map(() => this.createSeat()),
      Array(8).fill(null).map(() => this.createSeat()),
      Array(8).fill(null).map(() => this.createSeat()),
      Array(6).fill(null).map(() => this.createSeat())
    ];
    this.seats = rows;
  }

  createSeat(): Seat {
    return {
      userOccupied: false,
      occupied: Math.random() < 0.2, // 20% chance of being occupied
      selected: false
    };
  }

  getSeatClass(seat: Seat): string {
    if (seat.occupied) {
      return 'seat occupied';
    } else if (seat.userOccupied) {
      return 'seat user-occupied';
    } else if (seat.selected) {
      return 'seat selected';
    } else {
      return 'seat available';
    }
  }

  toggleSeatSelection(seat: Seat): void {
    if (!seat.occupied && !seat.userOccupied) {
      seat.selected = !seat.selected;
    }
  }

}
