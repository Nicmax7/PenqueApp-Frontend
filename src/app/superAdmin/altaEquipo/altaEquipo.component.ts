import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtEquipo } from 'src/app/models/Datatypes/DtEquipo';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { HelperService } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-altaEquipo',
  templateUrl: './altaEquipo.component.html',
  styleUrls: ['./altaEquipo.component.css'],
})
export class AltaEquipoComponent {
  constructor(private auth: SuperAdminService, private snackBar: MatSnackBar, private helpers: HelperService) {}

  errorMessage: string = '';
  visibility: boolean = true;
  fullnameFormControl = new FormControl('', [Validators.required]);
  deporteFormControl = new FormControl('', [Validators.required]);
  divisionFormControl = new FormControl('', [Validators.required]);
  paisFormControl = new FormControl('', [Validators.required]);
  paises = ["Internacional","Alemania","Argentina","Bélgica","Bolivia","Brasil","Colombia","Dinamarca","Ecuador","España","Estados Unidos","Francia","Inglaterra","Italia","México","Países Bajos","Paraguay","Perú","Portugal","Rusia","Suiza","Turquía","Uruguay","Venezuela"];

  
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
      this.fullnameFormControl.value == '' ||
      this.deporteFormControl.value == '' ||
      this.deporteFormControl.value == 'vacio' ||
      this.divisionFormControl.value == '' ||
      this.divisionFormControl.value == 'vacio' ||
      this.paisFormControl.value == '' ||
      this.paisFormControl.value == 'vacio'
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } 
    else {
      let Deporte = this.deporteFormControl.value;
      let DeporteNum = 0;
      if (Deporte == 'Futbol') DeporteNum = 0;
      if (Deporte == 'Basquetbol') DeporteNum = 1;
      if (Deporte == 'Tenis') DeporteNum = 2;
      if (Deporte == 'Voleybol') DeporteNum = 3;

      let Division = this.deporteFormControl.value;
      let DivisionNum = 0;
      if (Division == 'Primera') DivisionNum = 0;
      if (Division == 'Segunda') DivisionNum = 1;
      if (Division == 'Tercera') DivisionNum = 2;     
     
      let data: DtEquipo = {
      name: this.fullnameFormControl.value,
      Deporte: DeporteNum,
      Division: DivisionNum,
      Pais: this.paisFormControl.value
      }
      this.auth.registrarEquipo(data).subscribe({
        next: (response) => {
          this.showSnackBar(
            'El equipo se ha registrado correctamente',
            SnackBarStatus.SUCCESS
          );
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
  }
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
}
