import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Modulos
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { LoginComponent } from './pages/login/login.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { PaginaUsuariosComponent } from './pages/pagina-usuarios/pagina-usuarios.component';
import { PaginaFutbolistasComponent } from './pages/pagina-futbolistas/pagina-futbolistas.component';
import { PaginaEquiposComponent } from './pages/pagina-equipos/pagina-equipos.component';
import { PaginaPrediccionesComponent } from './pages/pagina-predicciones/pagina-predicciones.component';
import { PaginacontactoComponent } from './pages/paginacontacto/paginacontacto.component';
import { EquiposComponent } from './pages-seundary/equipos/equipos.component';
// import { MostrarEquipoComponent } from './pages-seundary/mostrar-equipo/mostrar-equipo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    
    PaginaUsuariosComponent,
    PaginaFutbolistasComponent,
    PaginaEquiposComponent,
    PaginaPrediccionesComponent,
    PaginacontactoComponent,
    EquiposComponent,
    // MostrarEquipoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
