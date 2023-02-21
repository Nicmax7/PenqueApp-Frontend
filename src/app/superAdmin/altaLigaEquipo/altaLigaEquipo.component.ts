import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';

@Component({
  selector: 'app-altaLigaEquipo',
  templateUrl: './altaLigaEquipo.component.html',
  styleUrls: ['./altaLigaEquipo.component.css'],
})
export class AltaLigaEquipoComponent {
  constructor(private auth: SuperAdminService, private snackBar: MatSnackBar, private router: Router, private helpers: HelperService) {}

  errorMessage: string = '';
  visibility: boolean = true;
  nameFormControl = new FormControl('', [Validators.required]);
  topeFormControl = new FormControl(new Number(), [Validators.required]);
  deporteFormControl = new FormControl('', [Validators.required]);
  TipoDeporte!: number;
  

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

  public async registrar() 
  {
    if (this.nameFormControl.value == '' || this.topeFormControl.value?.valueOf == null)
    {
        this.showSnackBar('No has ingresado el nombre de la liga de equipos', SnackBarStatus.WARNING);
    }
    else if(this.topeFormControl.value.valueOf() < 3){
        this.showSnackBar('La liga no puede tener menos de 3 partidos.', SnackBarStatus.WARNING);
    }
    else if(this.topeFormControl.value.valueOf() < 3){
      this.showSnackBar('La liga no puede tener menos de 3 partidos.', SnackBarStatus.WARNING);
    }
    else if (this.deporteFormControl.value == 'vacio' || this.deporteFormControl.value == '' || this.deporteFormControl.value == null){
      this.showSnackBar('Debes seleccionar un deporte', SnackBarStatus.WARNING);
    }
    else{
      console.log(this.deporteFormControl.value);
      let Deporte = this.deporteFormControl.value;
      let TipoDeporte;
      if (Deporte == 'Futbol'){ TipoDeporte = Tipo_Deporte.Futbol; this.TipoDeporte = 0;}
      if (Deporte == 'Basquetbol'){ TipoDeporte = Tipo_Deporte.Basquetball; this.TipoDeporte = 1;}
      if (Deporte == 'Tenis'){ TipoDeporte = Tipo_Deporte.Tenis; this.TipoDeporte = 2;}
      if (Deporte == 'Voleybol'){ TipoDeporte = Tipo_Deporte.Voley; this.TipoDeporte = 3;}
      if (Deporte != 'vacio')
      {
        let data: DtLigaEquipo = {
        nombreLiga: this.nameFormControl.value,
        tope: this.topeFormControl.value.valueOf(),
        tipoDeporte: this.TipoDeporte
        }
        this.auth.registrarLigaEquipo(data).subscribe({
          next: (response) => {
            this.showSnackBar(
              'La liga de equipos se ha registrado correctamente',
              SnackBarStatus.SUCCESS
            );
            this.router.navigateByUrl('superAdminIndex');
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          },
        });
      } 
    }
  }
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
}
