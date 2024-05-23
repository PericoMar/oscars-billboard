import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sesion } from '../components/film-bookings/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private apiUrl = 'http://localhost:3000'; // URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Obtener todas las películas
  getSesions(id : string | null): Observable<Sesion[]> {
    return this.http.get<Sesion[]>(`${this.apiUrl}/sesiones/${id}`);
  }
}
