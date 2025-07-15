import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private readonly API_URL = 'https://mae-produce-discipline-tutorial.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllVehicles(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Vehicle`);
  }

  addNewVehicle(vehicle: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Vehicle`, vehicle);
  }

  getVehicleById(vehicleId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Vehicle/${vehicleId}`);
  }

  getVehicleTypes(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleType`);
  }

  getVehicleBrands(vehicleTypeId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleBrand/ListById/${vehicleTypeId}`);
  }

  getVehicleModels(brandId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/VehicleModel/list/${brandId}`);
  }

  editVehicle(vehicle: any): Observable<any> {
    return this.http.put(`${this.API_URL}/api/Vehicle`, vehicle);
  }

  deleteVehicle(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Vehicle`, {
      params: { id }
    });
  }
}