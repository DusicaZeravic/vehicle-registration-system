import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private readonly API_URL = 'https://mae-produce-discipline-tutorial.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllInsurances(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Insurance`);
  }

  addNewInsurance(insurance: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Insurance`, insurance);
  }

  getInsuranceById(insuranceId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Insurance/${insuranceId}`);
  }

  editInsurance(insurance: any): Observable<any> {
    return this.http.put(`${this.API_URL}/api/Insurance`, insurance);
  }

  deleteInsurance(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Insurance`, {
      params: { id }
    });
  }
}