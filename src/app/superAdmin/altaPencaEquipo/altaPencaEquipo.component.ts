import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { DtCrearPencasCompartida } from 'src/app/models/Datatypes/DtCrearPencaCompartida';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';

@Component({
  selector: 'app-altaPencaEquipo',
  templateUrl: './altaPencaEquipo.component.html',
  styleUrls: ['./altaPencaEquipo.component.css'],
})
export class AltaPencaEquipoComponent implements OnInit  {
  constructor(private auth: SuperAdminService,private helper:HelperService, private snackBar: MatSnackBar, private ligaS: LigasService) {}

  ngOnInit() {
  }

  errorMessage: string = '';
  visibility: boolean = true;
  fullnameFormControl = new FormControl('', [Validators.required]);
  disciplinaFormControl = new FormControl('', [Validators.required]);
  entradaFormControl = new FormControl(new Number(), [Validators.required]);
  ligas!: DtLigaEquipo[];
  seleccionado!: string | undefined;

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  isSuperAdmin(): boolean{
    const usr: DtUser = this.helper.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        return true;
      }
    }
    this.helper.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  public async altaPencaEquipo() {
    
    if (
      this.fullnameFormControl.value == '' ||
      this.disciplinaFormControl.value == '' ||
      this.disciplinaFormControl.value == '' ||
      this.seleccionado == 'vacio' ||
      this.seleccionado == undefined ||
      this.entradaFormControl.value == null ||
      this.entradaFormControl.value == 0    
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } 
    else {
      if (this.entradaFormControl.value.valueOf() < 0) this.showSnackBar('No puedes ingresar negativos en el precio de entrada', SnackBarStatus.WARNING);
      else{
        let TpoDeporte = this.disciplinaFormControl.value;
        let deporte = -1;
        if (TpoDeporte == 'Futbol') deporte = 0;
        if (TpoDeporte == 'BasketBall') deporte = 1;
        if (TpoDeporte == 'Tennis') deporte = 2;
        if (TpoDeporte == 'VoleyBall') deporte = 3;
        let data: DtCrearPencasCompartida = {
          nombre: this.fullnameFormControl.value,
          tipoDeporte: deporte,
          entrada: Number(this.entradaFormControl.value),
          idLiga: Number(this.seleccionado)
        }

        this.auth.altaPencaEquipo(data).subscribe({
          next: (response) => {
            this.showSnackBar(
              'Se ha registrado correctamente la Penca de tipo Equipo',
              SnackBarStatus.SUCCESS
            );
            this.helper.redirectTo('SuperAdmin/pencasSuperAdmin');
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

  cargarLigas() {
    let TpoDeporte = this.disciplinaFormControl.value;
        let deporte = -1;
        if (TpoDeporte == 'Futbol') deporte = 0;
        if (TpoDeporte == 'BasketBall') deporte = 1;
        if (TpoDeporte == 'Tennis') deporte = 2;
        if (TpoDeporte == 'VoleyBall') deporte = 3;
    if(deporte != -1)
    {this.ligaS.getLigasEquiposActivasPorDeporte(deporte).subscribe({
      next: async (response) => {
        this.ligas = response;
      },
      error: (err) => {},
    });}
    else{
      this.ligas = [];
    }
  }
}
