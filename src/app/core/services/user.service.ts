import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}