import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Partidos } from '../interfaces/partidos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartidosService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/partidos';
  }
  getEquipos(): Observable<Partidos[]> {
    return this.http.get<Partidos[]>(
      `${this.myAppUrl}${this.myApiUrl}/mostrarPartidos`
    );
  }
}
