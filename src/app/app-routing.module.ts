import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

// Guards
import { AuthGuard } from './utils/auth.guard';
import { PaginaUsuariosComponent } from './pages/pagina-usuarios/pagina-usuarios.component';
import { PaginaFutbolistasComponent } from './pages/pagina-futbolistas/pagina-futbolistas.component';
import { PaginaPrediccionesComponent } from './pages/pagina-predicciones/pagina-predicciones.component';
import { PaginacontactoComponent } from './pages/paginacontacto/paginacontacto.component';
import { PaginaEquiposComponent } from './pages/pagina-equipos/pagina-equipos.component';
import { EquiposComponent } from './pages-seundary/equipos/equipos.component';
// import { MostrarEquipoComponent } from './pages-seundary/mostrar-equipo/mostrar-equipo.component';

const routes: Routes = [

  //paginas sesion
  { path: 'inicioSesion', component: LoginComponent },
  { path: 'registro', component: SignInComponent },

  //paginas principales
  { path: 'Usuarios', component: PaginaUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'Futbolistas', component: PaginaFutbolistasComponent, canActivate: [AuthGuard] },
  { path: 'Equipos', component: PaginaEquiposComponent, canActivate: [AuthGuard] },
  { path: 'Predicciones', component: PaginaPrediccionesComponent, canActivate: [AuthGuard] },
  { path: 'Contacto', component: PaginacontactoComponent },

  //paginas secundarias
  { path: 'mostrarEquipo/:id', component: EquiposComponent, canActivate: [AuthGuard] },

  //pagina por defecto
  { path: '**', redirectTo: 'inicioSesion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
