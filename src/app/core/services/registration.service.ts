import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly API_URL = 'https://ingredients-llc-wholesale-reuters.trycloudflare.com';

  constructor(private http: HttpClient) {}
}