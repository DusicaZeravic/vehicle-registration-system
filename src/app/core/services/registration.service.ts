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

  getRegistrationById(registrationId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/RegistrationVehicle/${registrationId}`);
  }

  addNewRegistration(registration: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/RegistrationVehicle`, registration);
  }

  editRegistration(registration: any): Observable<any> {
    return this.http.put(`${this.API_URL}/api/RegistrationVehicle`, registration);
  }

  deleteRegistration(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/RegistrationVehicle`, {
      params: { id }
    });
  }
}