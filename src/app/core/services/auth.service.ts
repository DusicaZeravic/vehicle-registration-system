import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; email: string; password: string }): Observable<any> {  
    return this.http.post(`${this.API_URL}/api/Auth/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token.token);
        localStorage.setItem('user', JSON.stringify({name: response.token.username, email: response.token.email, role: response.token.roles}));
      })
    );
  }

  register(credentials: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Auth/register`, credentials);
  }

  changePassword(credentials: { oldPassword: string; newPassword: string }): Observable<any> {
    return this.http.put(`${this.API_URL}/api/Auth/changePassword`, credentials);
  }
}
