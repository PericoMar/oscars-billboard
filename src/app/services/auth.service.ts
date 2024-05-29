import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto por tu URL de backend

  constructor(private http: HttpClient) { }

  checkUserExists(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/checkUserExists?email=${email}`);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  validateCredentials(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/validateCredentials?email=${email}&password=${password}`);
  }
}
