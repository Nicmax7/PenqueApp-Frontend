import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtRegistro } from 'src/app/models/Datatypes/DtRegistro';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: UserService, private snackBar: MatSnackBar) {}

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

  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  public async register() {
    if (
      this.emailFormControl.value == '' ||
      this.passwordFormControl.value == '' ||
      this.fullnameFormControl.value == '' ||
      this.emailFormControl.value == null
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } else {
      if (this.esEmailValido(this.emailFormControl.value)) {
        let data: DtRegistro = {
          nombre: this.fullnameFormControl.value,
          password: this.passwordFormControl.value,
          email: this.emailFormControl.value,
        };

        this.auth.register(data).subscribe({
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
