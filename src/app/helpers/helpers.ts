import { Injectable } from "@angular/core";
import { AbstractControl, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { DtUser } from "../models/Datatypes/DtUser";

@Injectable({
    providedIn: 'root',
})

export class HelperService { 

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  getInputErrorMessage(input: FormControl | AbstractControl, minLength?: number) {
    if (input.hasError('required')) {
      return 'El campo no puede estar vacío.';
    }
    if(input.hasError('email') ){
      return 'Correo electrónico inválido.';
    }
    if(input.hasError('minlength')){
      return `El campo debe tener por lo menos ${ minLength } caracteres.`
    }
    else return '';
  }
  isAuthenticated(): boolean {
    const usr: DtUser = this.getLocalStorage();

    //TODO: Handle token expire date.
    return !usr ? false : true;
  }
  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 formatearFecha(fecha: Date){
  console.log(new Date(fecha.toDateString()));
  return new Date(fecha.toDateString());
 }
}