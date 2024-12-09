import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Goles } from 'src/app/interfaces/goles';
import { Jugadores } from 'src/app/interfaces/jugadores';
import { GolesService } from 'src/app/services/goles.service';
import { JugadoresServices } from 'src/app/services/jugadores.service';

@Component({
  selector: 'app-pagina-futbolistas',
  templateUrl: './pagina-futbolistas.component.html',
  styleUrls: ['./pagina-futbolistas.component.css'],
})
export class PaginaFutbolistasComponent implements OnInit {
  imagenSeleccionada: string | null = null; // Imagen del jugador seleccionado
  futbolistas: Jugadores[] = []; // Lista de jugadores
  todosGoles: Goles[] = []; // Todos los goles (sin filtrar)
  goles: Goles[] = []; // Goles filtrados por jugador

  constructor(
    private _FutbolistaServices: JugadoresServices,
    private _GolesServices: GolesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMostrarEquipos();
    this.getGoles();
  }

  getMostrarEquipos(): void {
    this._FutbolistaServices.getJugadores().subscribe((data) => {
      this.futbolistas = data;
    });
  }

  getGoles(): void {
      this._GolesServices.getGoles().subscribe((data) => {
        this.todosGoles = data; // Almacenar todos los goles
        this.goles = []; // Inicialmente, la tabla de goles está vacía

        // Agregar el nombre del jugador a cada gol
        this.todosGoles.forEach((gol) => {
          const jugador = this.futbolistas.find(
            (futbolista) => futbolista.idJugador === gol.idJugador
          );
          gol.nombreJugador = jugador ? jugador.nombre : 'Desconocido';
        });
      });
    }

  mostrarFoto(img: string, idJugador: number): void {
    this.imagenSeleccionada = img;

    // Filtrar goles del jugador seleccionado
    this.goles = this.todosGoles.filter((gol) => gol.idJugador === idJugador);
  }
}
