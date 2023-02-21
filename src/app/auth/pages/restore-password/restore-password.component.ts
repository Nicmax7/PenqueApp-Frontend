import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent{

  constructor(private auth: UserService, private snackBar: MatSnackBar) { }

  errorMessage: string = '';
  emailSended: boolean = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  private setErrorMessage(message: string){
    this.errorMessage = message;
  }

  showSnackBar(message: string, status: SnackBarStatus){
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`]
    })
  }

  esEmailValido(email: string): boolean{
    let mailValido = false;
    ('use strict');

    var EMAIL_REGEX =
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
        if (email.match(EMAIL_REGEX)) {
          mailValido = true;
        }
        return mailValido;
  }

  public async restorePassword(){
    if(this.emailFormControl.value == '' || this.emailFormControl.value == null){
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    }else{
      if(this.esEmailValido(this.emailFormControl.value)){
        this.auth.restorePassword(this.emailFormControl.value.toString()).subscribe({
          next: (response) => {
            this.showSnackBar('El mail se ha enviado correctamete', SnackBarStatus.SUCCESS);
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          }          
        })
          
        }else{
          this.showSnackBar("El mail esta mal escrito", SnackBarStatus.ERROR);
      }
    }
  }
}
