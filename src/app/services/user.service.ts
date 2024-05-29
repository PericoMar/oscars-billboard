import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private localStorageKey = 'currentUser';

  setUser(user: any): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser(): void {
    localStorage.removeItem(this.localStorageKey);
  }
}