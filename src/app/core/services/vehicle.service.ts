import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly API_URL = 'https://ingredients-llc-wholesale-reuters.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Vehicle`);
  }

  addNewVehicle(vehicle: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Vehicle`, vehicle);
  }

  getVehicleTypes(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleType`);
  }

  getVehicleBrands(vehicleTypeId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleBrand/${vehicleTypeId}`);
  }

  getVehicleModels(brandId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleModel/${brandId}`);
  }

  deleteVehicle(vehicleId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Vehicle/${vehicleId}`);
  }
}