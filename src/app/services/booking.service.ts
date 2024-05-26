import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000'; // URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Obtener todas las películas
  getBookings( id_sesion: number, hora: string, fecha_anterior: string, fecha_siguiente: string): Observable<any[]> {
    const params = new HttpParams()
      .set('id_sesion', id_sesion.toString())
      .set('hora', hora)
      .set('fecha_anterior', fecha_anterior)
      .set('fecha_siguiente', fecha_siguiente);
  console.log('ID Sesión:', id_sesion.toString());
  console.log('Hora:', hora);
  console.log('Fecha Anterior:', fecha_anterior);
  console.log('Fecha Siguiente:', fecha_siguiente);
    return this.http.get<any[]>(`${this.apiUrl}/reservas`, { params });
  }

  reserveSeats(reservations: any[]): Observable<any> {
    console.log(reservations);
    return this.http.post(`${this.apiUrl}/reservas`, { reservations }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
