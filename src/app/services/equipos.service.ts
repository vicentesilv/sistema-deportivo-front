import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipos } from '../interfaces/equipos';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/equipos'
   }
   getEquipos():Observable<Equipos[]>{
    return this.http.get<Equipos[]>(`${this.myAppUrl}${this.myApiUrl}/mostrarEquipos`)
   }
   getEquipo(id: number):Observable<Equipos>{
    return this.http.get<Equipos>(`${this.myAppUrl}${this.myApiUrl}/mostrarEquipo/${id}`)
   }
}
