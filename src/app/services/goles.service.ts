import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GolesService {
  private apiUrl = 'http://localhost:3001/api/goles'; // URL del endpoint

  constructor(private http: HttpClient) {}

  getGoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mostrarGoles`);
  }
}