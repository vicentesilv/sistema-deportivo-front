import { EquiposService } from 'src/app/services/equipos.service';
import { Equipos } from './../../interfaces/equipos';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pagina-equipos',
  templateUrl: './pagina-equipos.component.html',
  styleUrls: ['./pagina-equipos.component.css'],
})
export class PaginaEquiposComponent implements OnInit {
  equipos: Equipos[] = [];
  constructor(
    private _EquiposServices: EquiposService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getMostrarEquipos();
  }
  getMostrarEquipos() {
    this._EquiposServices
      .getEquipos()
      .subscribe((data) => (this.equipos = data));
  }
}
