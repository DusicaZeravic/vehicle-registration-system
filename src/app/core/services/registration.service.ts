import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private readonly API_URL = 'https://comics-amended-internet-gamecube.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllRegistartions(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/RegistrationVehicle`);
  }
}