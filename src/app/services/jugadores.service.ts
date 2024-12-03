import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Jugadores } from 'src/app/interfaces/jugadores'
@Injectable({
  providedIn: 'root'
})
export class JugadoresServices {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/jugadores'
   }
   getJugadores():Observable<Jugadores[]>{
    return this.http.get<Jugadores[]>(`${this.myAppUrl}${this.myApiUrl}/mostrarJugadores`)
   }
}
