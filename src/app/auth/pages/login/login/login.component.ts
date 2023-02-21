import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtLogin } from 'src/app/models/Datatypes/DtLogin';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import firebase from 'firebase/compat/app';
import { DtGoogle } from 'src/app/models/Datatypes/DtGoogle';
import { async } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private auth: UserService,private router: Router,private helpers: HelperService,) {}

  errorMessage: string = '';
  emailCorrecto: boolean = true;
  visibility: boolean = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  public login() {
    if (
      this.emailFormControl.value == '' ||
      this.passwordFormControl.value == '' ||
      this.emailFormControl.value == null
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } else {
      if (this.esEmailValido(this.emailFormControl.value)) {
        let data: DtLogin = {
          email: this.emailFormControl.value,
          password: this.passwordFormControl.value,
        };

        this.auth.login(data).subscribe({
          next: async (response) => {
            this.setLocalStorage(response);
            this.showSnackBar(
              'Has iniciado correctamente sesión :)',
              SnackBarStatus.SUCCESS
            );
            this.rutaUsuario();
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

  setLocalStorage(data: DtUser) {
    localStorage.setItem('authUser', JSON.stringify(data));
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

  goAdmin(){
    this.router.navigateByUrl('/adminIndex');
  }
  goUser(){
    this.router.navigateByUrl('/userIndex');
  }
  goSuperA(){
    this.router.navigateByUrl('/superAdminIndex');
  }
  goEmpresa(){
    this.router.navigateByUrl('/empresaIndex');
  }

  rutaUsuario(){
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        this.goSuperA()
      }
      if(Number(usr.tipo_rol) == 1){
        this.goAdmin();
      }
      if(Number(usr.tipo_rol) == 2){
        this.goUser();
      }
      if(Number(usr.tipo_rol) == 3){
        this.goEmpresa();
      }
    }
  }

  loginWithGoogle(){
      this.auth.googlePopUpLogin().then(
        async ({ user }) => {
          let data: DtGoogle = {
            email: user?.email,
            nombre: user?.displayName
          };
          this.auth.loginGoogle(data).subscribe({
            next: async (response) => {
              this.setLocalStorage(response);
              this.showSnackBar('Has iniciado correctamente sesión :)', SnackBarStatus.SUCCESS);
              
            },
            error: (err) => {
              this.showSnackBar(err, SnackBarStatus.WARNING);
            }
          })
        } 
    );this.rutaUsuario()}
    
}