import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    return localStorage.getItem('user');
  }

  /**
 * Check session expiration
 */
  isSessionValid(): any {
    // checking session expiration
    const token = localStorage.getItem('token') || undefined;
    if (token !== null) {
      
      const decodedJWT = jwtDecode(token);
      const expirationEpoh = decodedJWT.exp;
      const currentEpoh = new Date().getTime() / 1000;

      return currentEpoh > expirationEpoh ? false : true;
    }
  }

  isSignedIn(): boolean {
    return localStorage.getItem('token') !== null && this.isSessionValid();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.role?.includes('Admin');
  }
}