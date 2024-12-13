import { Component, OnInit } from '@angular/core';
import { Equipos } from 'src/app/interfaces/equipos';
import { Goles } from 'src/app/interfaces/goles';
import { Jugadores } from 'src/app/interfaces/jugadores';
import { EquiposService } from 'src/app/services/equipos.service';
import { GolesService } from 'src/app/services/goles.service';
import { JugadoresServices } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-pagina-predicciones',
  templateUrl: './pagina-predicciones.component.html',
  styleUrls: ['./pagina-predicciones.component.css'],
})
export class PaginaPrediccionesComponent implements OnInit {
  jugadores: Jugadores[] = [];
  equipos: Equipos[] = [];
  goles: Goles[] = [];
  modaLugarTiro: number | null = null;

  formulario = {
    jugadorId: null as number | null,
    sede: '',
    inicioJuego: '',
    equipoRivalId: null as number | null,
    minuto: 0,
    ronda: '',
  };

  constructor(
    private jugadoresService: JugadoresServices,
    private equiposService: EquiposService,
    private golesService: GolesService
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
    this.cargarEquipos();
  }

  cargarJugadores(): void {
    this.jugadoresService.getJugadores().subscribe({
      next: (data) => {
        this.jugadores = data;
      },
      error: (err) => {
        console.error('Error al cargar jugadores:', err);
      },
    });
  }

  cargarEquipos(): void {
    this.equiposService.getEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
      },
      error: (err) => {
        console.error('Error al cargar equipos:', err);
      },
    });
  }

  onJugadorSelect(): void {
    if (!this.formulario.jugadorId) return;

    this.golesService.getGoles().subscribe({
      next: (data) => {
        this.goles = data
        .filter(
          (gol) => gol.idJugador == this.formulario.jugadorId
        );
        // console.log(this.goles); 
        

        this.calcularModaLugarTiro(this.goles); // Calcular la moda
      },
      error: (err) => {
        console.error('Error al cargar goles:', err);
      },
    });
  }

  calcularModaLugarTiro(goles: Goles[]): void {
    if (!goles || goles.length === 0) {
      this.modaLugarTiro = null;
      return;
    }

    const lugarCounts: Record<number, number> = {};

    goles.forEach((gol) => {
      const lugar = gol.lugarTiro;
      lugarCounts[lugar] = (lugarCounts[lugar] || 0) + 1; // Incrementa el conteo
    });

    let maxCount = 0;
    let moda = null;

    for (const lugar in lugarCounts) {
      if (lugarCounts[lugar] > maxCount) {
        maxCount = lugarCounts[lugar];
        moda = +lugar; // Convertir a número
      }
    }

    this.modaLugarTiro = moda; // Asignar la moda encontrada
    console.log('Moda de lugar de tiro:', this.modaLugarTiro);
  }

  procesarFormulario(): void {
    console.log('Moda del lugar de tiro:', this.modaLugarTiro);
    console.log('Datos del formulario:', this.formulario);

    // Aquí puedes procesar los datos o enviarlos a un servidor.
  }
}
