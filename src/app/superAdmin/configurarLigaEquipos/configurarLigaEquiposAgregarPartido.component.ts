import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { HelperService } from 'src/app/helpers/helpers';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { MatTableDataSource } from '@angular/material/table';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtEquipo } from 'src/app/models/Datatypes/DtEquipo';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { DtPartidoCreacion } from 'src/app/models/Datatypes/DtPartidoCreacion';
import { PartidosService } from 'src/app/Servicios/partidos/partidos.service';

@Component({
  selector: 'app-configurarLigaEquipos',
  templateUrl: 'configurarLigaEquiposAgregarPartido.component.html',
  styleUrls: ['./configurarLigaEquipos.component.css'],
})

export class ConfigurarLigaEquiposAgregarPartido implements OnInit {

  constructor(
    private superAdminService: SuperAdminService,
    private ligasService: LigasService,
    private PartidoS: PartidosService,
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ConfigurarLigaEquiposAgregarPartido>,

  ) { }

  errorMessage: string = '';
  visibility: boolean = true;

  visitanteControl = new FormControl('', [Validators.required]);
  localControl = new FormControl('', [Validators.required]);
  paisVFormControl = new FormControl('', [Validators.required]);
  divisionVControl = new FormControl('', [Validators.required]);
  paisLFormControl = new FormControl('', [Validators.required]);
  divisionLControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl(new Date(), [Validators.required]);
  equiposLocal!: DtEquipo[];
  paises = ["Internacional","Alemania","Argentina","Bélgica","Bolivia","Brasil","Colombia","Dinamarca","Ecuador","España","Estados Unidos","Francia","Inglaterra","Italia","México","Países Bajos","Paraguay","Perú","Portugal","Rusia","Suiza","Turquía","Uruguay","Venezuela"];
  equiposVisitante!: DtEquipo[];
  deporteId: string | undefined;
  localId: number | undefined;
  visitanteId: number | undefined;
  LocalId: number | undefined;
  VisitanteId: number | undefined;
  TipoDeporte!: number;
  ligaId!: number;
  dtLiga: DtLigaEquipo = {};
  paisV!: string;
  paisL!: string;
  tipoPartido!: number

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.ligaId = JSON.parse(localStorage.getItem('Liga')!);
      this.tipoPartido = JSON.parse(localStorage.getItem('LigaDeporte')!);
      if (this.ligaId != undefined) {
        this.superAdminService.getLigaEquipoById(this.ligaId).subscribe(data => {
          this.dtLiga = data;
        });
      }
    }
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
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

  cargarEquiposVisitante() {
    let DivisionNum;
    if (this.paisVFormControl.value != undefined){
      this.paisV = this.paisVFormControl.value;
      if (this.paisV == "Internacional"){DivisionNum = 0}  
    }
    if (this.dtLiga.tipoDeporte == 0) { this.TipoDeporte = 0; }
    if (this.dtLiga.tipoDeporte == 1) { this.TipoDeporte = 1; }
    if (this.dtLiga.tipoDeporte == 2) { this.TipoDeporte = 2; DivisionNum = 0;}
    if (this.dtLiga.tipoDeporte == 3) { this.TipoDeporte = 3; }

    if (this.divisionVControl.value == 'Primera') DivisionNum = 0;
    if (this.divisionVControl.value == 'Segunda') DivisionNum = 1;
    if (this.divisionVControl.value == 'Tercera') DivisionNum = 2;
    if (this.paisVFormControl.value != '' && this.paisVFormControl.value != undefined && DivisionNum != undefined) {
      this.PartidoS.GetEquiposByFiltros(this.TipoDeporte, DivisionNum, this.paisVFormControl.value).subscribe({
        next: async (response) => {
          this.equiposVisitante = response;
        },
        error: (err) => { },
      });
    }
  }

  cargarEquiposLocal() {
    let DivisionNum;
    if (this.paisLFormControl.value != undefined){
      this.paisL = this.paisLFormControl.value;
      if (this.paisL == "Internacional"){DivisionNum = 0}  
    }
    if (this.dtLiga.tipoDeporte == 0) { this.TipoDeporte = 0; }
    if (this.dtLiga.tipoDeporte == 1) { this.TipoDeporte = 1; }
    if (this.dtLiga.tipoDeporte == 2) { this.TipoDeporte = 2; DivisionNum = 0;}
    if (this.dtLiga.tipoDeporte == 3) { this.TipoDeporte = 3; }
    console.log(DivisionNum)
    if (this.divisionLControl.value == 'Primera') DivisionNum = 0;
    if (this.divisionLControl.value == 'Segunda') DivisionNum = 1;
    if (this.divisionLControl.value == 'Tercera') DivisionNum = 2;
    console.log(this.paisLFormControl.value)
    if (this.paisLFormControl.value != '' && this.paisLFormControl.value != undefined && DivisionNum != undefined) {
      this.PartidoS.GetEquiposByFiltros(this.TipoDeporte, DivisionNum, this.paisLFormControl.value).subscribe({
        next: async (response) => {
          this.equiposLocal = response;
        },
        error: (err) => { },
      });
    }
  }

  guardarIdVisitante() {
    this.visitanteId = this.VisitanteId;
  }

  guardarIdLocal() {
    this.localId = this.LocalId;
  }

  agregarPartido() {
    if (this.visitanteId == this.localId) {
      this.showSnackBar('Debes elegir equipos diferentes', SnackBarStatus.WARNING);
    }
    else {
      if (
        this.localId == null ||
        this.localId == undefined ||
        this.visitanteId == null ||
        this.visitanteId == undefined ||
        this.dateFormControl.value == null ||
        this.dateFormControl == undefined
      ) {
        this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
      } else {
        let data: DtPartidoCreacion = {
          id: 0,
          fecha: this.dateFormControl.value,
          idlocal: this.localId,
          idvisitante: this.visitanteId,
          local: "",
          visitante: "",
          resultado: 0,
          deporte: this.tipoPartido,
        }
        this.superAdminService
          .registrarPartido(data)
          .subscribe({
            next: async (response) => {
              let idPartido = response.id
              this.dialogRef.close();
              this.ligasService
                .agregarPartidoaLaLiga(Number(idPartido), this.ligaId)
                .subscribe({
                  next: async (response) => {
                    this.showSnackBar(
                      'Se ha agregado el partido correctamente',
                      SnackBarStatus.SUCCESS
                    );
                    this.helpers.redirectTo('SuperAdmin/configurarLigaEquipos');
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}