import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';

@Component({
  selector: 'app-altaCompetencia',
  templateUrl: './altaCompetencia.component.html',
  styleUrls: ['./altaCompetencia.component.css'],
})
export class AltaCompetenciaComponent implements OnInit {
  constructor(
    private superAdminService: SuperAdminService,
    private snackBar: MatSnackBar,
    private helpers: HelperService,
    private ligasService: LigasService,
  ) { }

  errorMessage: string = '';
  visibility: boolean = true;
  fullnameFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl(new Date(), [Validators.required]);
  topeFormControl = new FormControl(new Number(), [Validators.required]);
  dtLiga!: DtLigaIndividual;
  ligaId!: number;
  loggedUser!: DtUser;
  Disciplina!: string;

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.ligaId = JSON.parse(localStorage.getItem('Liga')!);
      if (this.ligaId != undefined) {
        this.superAdminService.getLigaIndividualById(this.ligaId).subscribe(data => {
          this.dtLiga = data;
          if (data.tipoArea == 0) this.Disciplina = 'Natacion';
          if (data.tipoArea == 1) this.Disciplina = 'Ciclismo';
          if (data.tipoArea == 2) this.Disciplina = 'Atletismo';
        });
      }
    }
  }

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  public async registrar() {

    if (
      this.fullnameFormControl.value == '' ||
      this.dateFormControl.value == null ||
      this.topeFormControl.value == null ||
      this.topeFormControl.value == 0
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    }
    else {
      if (this.topeFormControl.value.valueOf() < 3) this.showSnackBar('El tope minimo de participantes es 3', SnackBarStatus.WARNING);
      else {
        let data: DtCompetencia = {
          nombre: this.fullnameFormControl.value,
          fecha_competencia: this.dateFormControl.value,
          topeParticipantes: this.topeFormControl.value.valueOf(),
          area: this.dtLiga.tipoArea,

        };

        this.superAdminService.registrarCompetencia(data).subscribe({
          next: (response) => {
            let idCompetencia = response.id
            this.ligasService
              .agregarCompetenciaLaLiga(Number(idCompetencia), this.ligaId)
              .subscribe({
                next: async (response) => {
                  this.showSnackBar(
                    'Se ha agregado la competencia correctamente',
                    SnackBarStatus.SUCCESS
                  );
                  this.helpers.redirectTo('SuperAdmin/configurarLigaIndividual');
                },
                error: (err) => {
                  this.showSnackBar(err.error, SnackBarStatus.ERROR);
                },
              });
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          },
        });
      }
    }
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

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
}
