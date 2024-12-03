import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  form: FormGroup; // Formulario reactivo
  isModalOpen: boolean = false; // Controla la visibilidad del modal
  id: number = 0; // ID del usuario en caso de edición
  operacion: string = 'Registrar'; // Diferencia entre "Crear" y "Editar"
  listarUsuarios: User[] = []

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private toastr: ToastrService,
  ) {
    // Definimos las validaciones del formulario
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength]],
    });
  }

  ngOnInit(): void {
    this.getUsuarios()
  }
  getUsuarios() {
    this._userService.getUsuario().subscribe((data) => {
      this.listarUsuarios = data;
    });
  }
  eliminarUsuario(id: number) {
    this._userService.eliminarUsuario(id).subscribe(() => {
      this.getUsuarios();
      this.toastr.warning(
        'El usuario fue eliminado con exito',
        'Usuario eliminado'
      );
    });
  }

  /**
   * Abre el modal para crear o editar usuario.
   * @param operacion Define si es "Crear" o "Editar".
   * @param user (Opcional) Los datos del usuario a editar.
   */
  abrirModal(operacion: string, user?: User): void {
    this.operacion = operacion; // Cambiamos la operación actual
    this.isModalOpen = true; // Abrimos el modal

    if (operacion === 'Editar' && user) {
      // Rellenamos el formulario con los datos del usuario
      this.id = user.id!;
      this.form.setValue({
        email: user.email,
        nombre: user.nombre,
        password: user.password,
      });
    } else {
      // Limpiamos el formulario para la creación
      this.id = 0;
      this.form.reset();
    }
  }

  /**
   * Cierra el modal y limpia el estado.
   */
  cerrarModal(): void {
    this.isModalOpen = false;
    this.form.reset(); // Opcional: limpiar el formulario al cerrar
  }

  /**
   * Valida el formulario y realiza la acción de Crear o Actualizar.
   */
  addProduct(): void {
    if (this.form.invalid) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }

    // Creamos el objeto usuario con los datos del formulario
    const usuario: User = {
      email: this.form.value.email,
      nombre: this.form.value.nombre,
      password: this.form.value.password,
    };

    if (this.id !== 0) {
      // Actualizar usuario existente
      this._userService.actualizarUsuario(this.id, usuario).subscribe({
        next: () => {
          this.toastr.info(
            `El usuario ${usuario.email} fue actualizado con éxito`,
            'Usuario Actualizado'
          );
          this.cerrarModal(); // Cerramos el modal
        },
        error: () => {
          this.toastr.error('Error al actualizar el usuario', 'Error');
        },
      });
    } else {
      // Crear nuevo usuario
      this._userService.signIn(usuario).subscribe({
        next: () => {
          this.toastr.success(
            `El usuario ${usuario.email} fue registrado con éxito`,
            'Usuario Registrado'
          );
          this.cerrarModal(); // Cerramos el modal
        },
        error: () => {
          this.toastr.error('Error al registrar el usuario', 'Error');
        },
      });
    }
  }
}
