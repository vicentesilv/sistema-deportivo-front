import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Equipos } from 'src/app/interfaces/equipos';
import { Goles } from 'src/app/interfaces/goles';
import { Jugadores } from 'src/app/interfaces/jugadores';
import { Partidos } from 'src/app/interfaces/partidos';
import { EquiposService } from 'src/app/services/equipos.service';
import { GolesService } from 'src/app/services/goles.service';
import { JugadoresServices } from 'src/app/services/jugadores.service';
import { PartidosService } from 'src/app/services/partidos.service';

@Component({
  selector: 'app-pagina-predicciones',
  templateUrl: './pagina-predicciones.component.html',
  styleUrls: ['./pagina-predicciones.component.css'],
})
export class PaginaPrediccionesComponent implements OnInit {
  jugadores: Jugadores[] = [];
  selectedJugador: number | null = null;
  goles: Goles[] = [];
  equipo: Equipos[] | null = null;
  partidos: Partidos[] = [];
  detalles = true;

  constructor(
    private jugadoresService: JugadoresServices,
    private golesService: GolesService,
    private equiposService: EquiposService,
    private partidosService: PartidosService
  ) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores() {
    this.jugadoresService.getJugadores().subscribe((data) => {
      this.jugadores = data;
    });
  }

  onJugadorSelect() {
    this.detalles = true;
    this.goles = [];
    this.equipo = null;
    this.partidos = [];
  }

  mostrarDetalles() {
    if (this.selectedJugador === null) return;

    const data: {
      equipo: Equipos[] | null;
      partidos: Partidos[];
      goles: Goles[];
    } = {
      equipo: null,
      partidos: [],
      goles: [],
    };

    this.golesService.getGoles().subscribe((golesData) => {
      data.goles = golesData.filter(
        (gol) => gol.idJugador == this.selectedJugador
      );

      const jugadorSeleccionado = this.jugadores.find(
        (jugador) => jugador.idJugador == this.selectedJugador
      );

      if (jugadorSeleccionado) {
        this.equiposService.getEquipos().subscribe((equiposData) => {
          data.equipo = equiposData.filter(
            (item) =>
              item.nombre.toLowerCase() ===
              jugadorSeleccionado.idEquipo.toLowerCase()
          );

          this.partidosService.getEquipos().subscribe((partidosData) => {
            data.partidos = partidosData
              .filter(
                (item) =>
                  item.idEquipo.toLowerCase() ===
                  jugadorSeleccionado.idEquipo.toLowerCase()
              )
              .map((item) => ({
                ...item,
                fecha: formatDate(item.fecha, 'dd/MM/yyyy', 'en-US'),
              }));

            this.equipo = data.equipo;
            this.partidos = data.partidos;
            this.goles = data.goles;

            console.log(data);
          });
        });
      }
    });
  }
}
