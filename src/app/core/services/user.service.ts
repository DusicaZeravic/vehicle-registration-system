import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = 'https://mae-produce-discipline-tutorial.trycloudflare.com';

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
}