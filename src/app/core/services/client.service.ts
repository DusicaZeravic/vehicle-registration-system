import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API_URL = 'https://comics-amended-internet-gamecube.trycloudflare.com';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<any> {
    return this.http.get(`${this.API_URL}/api/Client`);
  }

  addNewClient(client: any): Observable<any> {
    return this.http.post(`${this.API_URL}/api/Client`, client);
  }

  deleteClient(clientId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/Client/${clientId}`);
  }
}