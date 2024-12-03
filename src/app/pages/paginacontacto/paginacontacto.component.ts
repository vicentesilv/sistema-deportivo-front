import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginacontacto',
  templateUrl: './paginacontacto.component.html',
  styleUrls: ['./paginacontacto.component.css']
})
export class PaginacontactoComponent implements OnInit {
  
  contactos = [{
    "nombre":"MIGUEL ANTONIO ALVARADO TIERNEY",
     "matricula": 23050198,
     "puesto": ["investigador","diseñador de base de datos"],
     "foto": "miguel.jpeg",
     "correo": "malvarado041@gmail.com",
     "telefono": "526692381166",
     "github":""
  },{
    "nombre":"ALBERTO BRODDEN GAETA",
    "matricula": 23050019,
    "puesto": ["investigador","diseñador de base de datos"],
    "foto": "alberto.jpeg",
    "correo": "Brodenberto5@gmail.com",
    "telefono": "526692381166",
    "github": "https://github.com/BroddenGa"
  },{
    "nombre":"VICENTE ALDAHIR SILVA LIZARRAGA",
    "matricula": 23050044,
    "puesto": ["programador","diseñador de base de datos","diseñador"],
    "foto": "vicente.jpeg",
    "correo": "vicentesilvala@gmail.com",
    "telefono": "526692237128",
    "github": "https://github.com/vicentesilv/"
  },{
    "nombre":"DANIEL EDUARDO TIRADO MUNOZ",
    "matricula": 23050125,
    "puesto": ["lider de proyecto","diseñador de base de datos"],
    "foto": "daniel.jpeg",
    "correo": "danieleduardotirado@gmail.com",
    "telefono": "526692237128",
    "github": "https://github.com/Wannalite"
  }
];
  
  constructor() { }

  ngOnInit(): void {
  }

}
