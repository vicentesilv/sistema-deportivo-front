import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipos } from './../../interfaces/equipos';
import { Partidos } from 'src/app/interfaces/partidos';
import { EquiposService } from 'src/app/services/equipos.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipo: Equipos | null = null;
  partido: Partidos[] = []; // Partidos filtrados

  constructor(
    private route: ActivatedRoute,
    private equiposService: EquiposService,
    private partidosService: PartidosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.equiposService.getEquipo(id).subscribe((data) => {
        this.equipo = data;
        this.getMostrarPartidos();
      });
    }
  }

  getMostrarPartidos(): void {
    this.partidosService.getEquipos().subscribe((data) => {
      if (this.equipo) {
        this.partido = data
          .filter((item) => 
            item.idEquipo.toLowerCase() === this.equipo?.nombre.toLowerCase()
          )
          .map((item) => ({
            ...item,
            fecha: formatDate(item.fecha, 'dd/MM/yyyy', 'en-US') // Formatear la fecha
          }));
      }
    });
  }
}
