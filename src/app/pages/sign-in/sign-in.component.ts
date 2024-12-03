import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  

    form: FormGroup;
    loading: boolean = false;
    id: number;
    operacion: string = 'Registrar ';
  
    constructor(
      private fb: FormBuilder,
      private _productService: UserService,
      private router: Router,
      private toastr: ToastrService,
      private aRouter: ActivatedRoute
    ) {
      this.form = this.fb.group({
        email: ['', Validators.required],
        nombre: ['', Validators.required],
        password: [null, Validators.required],
      });
      this.id = Number(aRouter.snapshot.paramMap.get('id'));
    }
  
    ngOnInit(): void {
      if (this.id != 0) {
        this.operacion = 'Editar ';
        this.getProduct(this.id);
      }
    }
  
    getProduct(id: number) {
      this.loading = true;
      this._productService.mostrarUsuario(id).subscribe((data: User) => {
        this.loading = false;
        this.form.setValue({
          email: data.email,
          nombre: data.nombre,
          password: data.password,
        });
      });
    }
    validaciones(): any {
      if (
        this.form.value.email == '' ||
        this.form.value.password == '' ||
        this.form.value.nombre == ''
      ) {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
        return this.validaciones();
      }
      const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
      if (!validEmail?.test(this.form.value.email)) {
        this.toastr.error(
          'email no cumple con un formato valido\n@mail.dominio',
          'Error'
        );
        return this.validaciones();
      }
    }
    addProduct() {
      const usuario: User = {
        email: this.form.value.email,
        nombre: this.form.value.nombre,
        password: this.form.value.password,
      };
      this.loading = true;
  
      if (this.id !== 0) {
        usuario.id = this.id;
        this.validaciones();
        this._productService.actualizarUsuario(this.id, usuario).subscribe(() => {
          this.toastr.info(
            `El usuario ${usuario.email} fue actualizado con exito`,
            'usuario actualizado'
          );
          this.loading = false;
          this.router.navigate(['/Usuarios']);
        });
      } else {
        this.validaciones();
        this._productService.signIn(usuario).subscribe(() => {
          this.toastr.success(
            `El usuario ${usuario.email} fue registrado con exito`,
            'usuario registrado'
          );
          this.loading = false;
          this.router.navigate(['/Usuarios']);
        });
      }
    }
  }
  


