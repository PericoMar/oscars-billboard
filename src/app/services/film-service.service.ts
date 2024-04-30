import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../components/film/film';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  private apiUrl = 'http://localhost:3000'; // URL del servidor Node.js

  constructor(private http: HttpClient) {}

  // Obtener todas las películas
  getAllFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${this.apiUrl}/films`);
  }
}
