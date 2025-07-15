import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API_URL = 'https://mae-produce-discipline-tutorial.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Client`);
  }

  getClientById(clientId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Client/${clientId}`);
  }

  addNewClient(client: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Client`, client);
  }

  editClient(client: any): Observable<any> {
    return this.http.put(`${this.API_URL}/api/Client`, client);
  }

  deleteClient(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Client`, {
      params: { id }
    });
  }
}