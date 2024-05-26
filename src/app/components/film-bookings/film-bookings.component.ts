import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Film } from '../film/film';
import { CommonModule, formatDate } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { User } from '../../user';

export interface Seat{
  row: number,
  column : number
  userOccupied : boolean,
  occupied : boolean,
  selected : boolean,
  notAvailable: boolean
}

@Component({
  selector: 'app-film-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-bookings.component.html',
  styleUrl: './film-bookings.component.css'
})
export class FilmBookingsComponent implements OnChanges{
  @Input() film! : Film;
  seats: Seat[][] = [];
  @Input() sesionSelected! : any;
  user : User = {
    correo : "admin@admin.com",
    nombre_usuario : "admin"
  } 
  reservations : Array<any> = [];
  selectedSeats: Seat[] = [];

  constructor (private bookingService : BookingService){}

  ngOnInit(): void {
    this.initializeSeats();
    this.loadBookings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sesionSelected']) {
      console.log(this.sesionSelected)
      this.onSesionChanged();
    }
  }

  initializeSeats(): void {
    const rows: Seat[][] = [];
    for (let row = 0; row <= 3; row++) {
      const rowSeats: Seat[] = [];
      for (let column = 0; column <= 8; column++) {
        rowSeats.push(this.createSeat(column, row, false, false, column === 4 ));
      }
      rows.push(rowSeats);
    }
    this.seats = rows;
  }

  createSeat(column : number , row : number, userOccupied : boolean, occupied : boolean, notAvailable : boolean): Seat {
    return {
      column : column,
      row : row,
      userOccupied: userOccupied,
      occupied: occupied,
      selected: false,
      notAvailable : notAvailable
    };
  }

  loadBookings(): void {
    const currentDate = new Date();
    const sessionTime = new Date();
    const [hours, minutes] = this.sesionSelected.hora.split(':');
    sessionTime.setHours(+hours, +minutes, 0);

    let fecha_anterior: string;
    let fecha_siguiente: string;

    if (sessionTime > currentDate) {
      // La sesión es en el futuro hoy
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);
      fecha_anterior = formatDate(previousDate, 'yyyy-MM-dd', 'en-US');
      fecha_siguiente = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
    } else {
      // La sesión es en el pasado hoy
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + 1);
      fecha_anterior = formatDate(currentDate, 'yyyy-MM-dd', 'en-US');
      fecha_siguiente = formatDate(nextDate, 'yyyy-MM-dd', 'en-US');
    }
    console.log(this.sesionSelected)
    this.bookingService.getBookings(this.sesionSelected.id_sesion, this.sesionSelected.hora, fecha_anterior, fecha_siguiente).subscribe(
      bookings => {
        this.reservations = bookings;
        console.log("entra");
        console.log(this.reservations);
        this.updateSeats();
      },
      error => console.error(error)
    );
  }

  updateSeats(): void {
    console.log(this.reservations);
    this.reservations.forEach(reservation => {
      if (reservation.id_usuario === this.user.correo) {
        this.seats[reservation.fila][reservation.columna].userOccupied = true;
      } else {
        this.seats[reservation.fila][reservation.columna].occupied = true;
      }
    });
  }

  

  getSeatClass(seat: Seat): string {
    if (seat.userOccupied) {
      return 'seat user-occupied';
    } else if (seat.occupied) {
      return 'seat occupied';
    } else if (seat.selected) {
      return 'seat selected';
    } else if(seat.notAvailable) {
      return 'seat not-available';
    } else {
      return 'seat available';
    }
  }

  toggleSeatSelection(seat: Seat): void {
    if (!seat.occupied && !seat.userOccupied && !seat.notAvailable) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        console.log(seat);
        this.selectedSeats.push(seat);
      } else {
        this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
      }
    }
  }

  getSelectedSeatCount(): number {
    return this.selectedSeats.length;
  }

  reserveSeats(): void {
    const now = new Date();
    const dia = now.toISOString().split('T')[0]; // Obtener la fecha en formato 'YYYY-MM-DD'
    const hora = now.toTimeString().split(' ')[0]; // Obtener la hora en formato 'HH:MM:SS'

    const reservedSeats = this.selectedSeats.map(seat => ({
      id_sesion: this.sesionSelected.id_sesion,
      fila: seat.row,
      columna: seat.column,
      correo: this.user.correo,
      dia : dia,
      hora: hora
    }));

    console.log(reservedSeats);

    this.bookingService.reserveSeats(reservedSeats).subscribe(
      response => {
        this.initializeSeats();
        this.loadBookings();
      },
      error => {
        console.error(error);
      }
    );

    this.selectedSeats = [];
  }


  onSesionChanged(){
    this.initializeSeats();
    this.loadBookings();
  }

}
