import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtEmpresa } from 'src/app/models/Datatypes/DtEmpresa';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { HelperService } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-altaEmpresa',
  templateUrl: './altaEmpresa.component.html',
  styleUrls: ['./altaEmpresa.component.css'],
})
export class AltaEmpresaComponent {
  constructor(private auth: SuperAdminService, private snackBar: MatSnackBar, private helpers: HelperService) {}

  MIN_PASSWORD_LENGTH: number = 6;
  errorMessage: string = '';
  visibility: boolean = true;
  emailCorrecto: boolean = true;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.MIN_PASSWORD_LENGTH),
  ]);
  fullnameFormControl = new FormControl('', [Validators.required]);

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  isSuperAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  public async registrar() {
    if (
      this.emailFormControl.value == '' ||
      this.passwordFormControl.value == '' ||
      this.fullnameFormControl.value == '' ||
      this.emailFormControl.value == null
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } else {
      if (this.esEmailValido(this.emailFormControl.value)) {
        let data: DtEmpresa = {
          name: this.fullnameFormControl.value,
          password: this.passwordFormControl.value,
          email: this.emailFormControl.value,
        };

        this.auth.registarEmpresa(data).subscribe({
          next: (response) => {
            this.showSnackBar(
              'Te has registrado correctamente',
              SnackBarStatus.SUCCESS
            );
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          },
        });
      }
      else{
        this.showSnackBar("El email esta mal escrito", SnackBarStatus.ERROR);
      }
    }
  }
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  esEmailValido(email: string): boolean {
    let mailValido = false;
    ('use strict');

    var EMAIL_REGEX =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(EMAIL_REGEX)) {
      mailValido = true;
    }
    return mailValido;
  }
}
