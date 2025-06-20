import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly API_URL = 'https://seemed-davis-vat-drove.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Vehicle`);
  }

  addNewVehicle(vehicle: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Vehicle`, vehicle);
  }
}