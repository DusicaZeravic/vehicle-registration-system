import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'https://87cd-188-255-165-230.ngrok-free.app';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; email: string; password: string }): Observable<any> {  
    return this.http.post(`${this.API_URL}/api/Auth/login`, credentials).pipe(
      tap((response: any) => {
        // npr. čuvanje tokena u localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  register(credentials: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Auth/register`, credentials).pipe(
      tap((response: any) => {
        // npr. čuvanje tokena u localStorage
        localStorage.setItem('token', response.token);
      })
    );
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Client/GetAll`);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
