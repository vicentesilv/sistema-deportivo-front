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
  resultado:number=0

  formulario = {
    jugadorId: null as number | null,
    sede: '',
    inicioJuego: '',
    equipoRivalId: null as number | null,
    minuto: 0,
    ronda: '',
    marcadorF: 0,
    marcadorC: 0,
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
        this.goles = data.filter(
          (gol) => gol.idJugador == this.formulario.jugadorId
        );
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

  calcularProbabilidad(): void {
    let porcentajeTotal = 0;

    // Sede
    if (this.formulario.sede === 'sede') {
      porcentajeTotal += 20;
    } else if (this.formulario.sede === 'visitante') {
      porcentajeTotal += 10;
    }

    // Arranque
    if (this.formulario.inicioJuego === 'si') {
      porcentajeTotal += 20;
    } else if (this.formulario.inicioJuego === 'no') {
      porcentajeTotal += 10;
    }

    // Tiempo
    const porcentajeTiempo = (20 / 90) * this.formulario.minuto;
    porcentajeTotal += porcentajeTiempo;

    // Ronda
    switch (this.formulario.ronda) {
      case 'regular':
        porcentajeTotal += 20;
        break;
      case 'cuartos':
        porcentajeTotal += 15;
        break;
      case 'semifinal':
        porcentajeTotal += 10;
        break;
      case 'final':
        porcentajeTotal += 5;
        break;
    }

    // Marcador
    if (this.formulario.marcadorF > this.formulario.marcadorC) {
      porcentajeTotal += 10;
    } else {
      porcentajeTotal += 20;
    }

    // Imprimir el porcentaje total
    console.log('Porcentaje total:', porcentajeTotal);

    // Generar un número aleatorio entre 1 y 6 con probabilidad ajustada
    const random = Math.random() * 100;
   

    if (random <= porcentajeTotal) {
      // Más probabilidad para los valores medios
      const pesos = [5, 10, 25, 25, 10, 5];
      const acumulados = pesos.map((peso, i) => pesos.slice(0, i + 1).reduce((a, b) => a + b, 0));

      const randomPeso = Math.random() * 100;
      for (let i = 0; i < acumulados.length; i++) {
        if (randomPeso <= acumulados[i]) {
          this.resultado = i + 1;
          break;
        }
      }
    } else {
      // Valor aleatorio no afectado por el porcentaje
      this.resultado = Math.floor(Math.random() * 6) + 1;
    }

  }

  procesarFormulario(): void {
    console.log('Datos del formulario:', this.formulario);
    this.calcularProbabilidad();
  }

  getEquipoNombre(equipoId: number | null): string | null {
    if (!equipoId) return null;
    const equipo = this.equipos.find((e) => e.idEquipo == equipoId);
    return equipo ? equipo.nombre.toString() : null;
  }
}
