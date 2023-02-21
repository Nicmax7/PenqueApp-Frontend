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
import { ConfigurarLigaEquiposAgregarPartido } from 'src/app/superAdmin/configurarLigaEquipos/configurarLigaEquiposAgregarPartido.component';

@Component({
  selector: 'app-configurarLigaEquipos',
  templateUrl: './configurarLigaEquipos.component.html',
  styleUrls: ['./configurarLigaEquipos.component.css'],
})
export class ConfigurarLigaEquiposComponent implements OnInit {
  constructor(
    private auth: SuperAdminService,
    private helper: HelperService,
    private snackBar: MatSnackBar,
    private helpers: HelperService,
    private ligaS: LigasService,
    private superAdminService: SuperAdminService,
    private pencasService: PencasService,
    public dialog: MatDialog,
  ) {}

  displayedColumns: string[] = ['fecha','local', 'vs', 'visitante', 'resultado', 'accion'];
  errorMessage: string = '';
  paises = ["Internacional","Alemania","Argentina","Bélgica","Bolivia","Brasil","Colombia","Dinamarca","Ecuador","España","Estados Unidos","Francia","Inglaterra","Italia","México","Países Bajos","Paraguay","Perú","Portugal","Rusia","Suiza","Turquía","Uruguay","Venezuela"];
  visibility: boolean = true;
  ligaControl = new FormControl('', [Validators.required]);
  partidoControl = new FormControl('', [Validators.required]);
  public dataSource:MatTableDataSource<DtPartido> = new MatTableDataSource();
  dtLiga: DtLigaEquipo = {};
  ligaId!: number;
  loggedUser!: DtUser;

  ngOnInit() {
    if(this.helpers.isAuthenticated()){     
      this.ligaId = JSON.parse(localStorage.getItem('Liga')!);
      if(this.ligaId!= undefined){
        this.superAdminService.getLigaEquipoById(this.ligaId).subscribe(data =>{
          this.dtLiga = data;
        });        
      }

      if(this.ligaId != undefined){
        this.pencasService.getPartidos(this.ligaId).subscribe(data =>{
          this.dataSource.data = data;
          this.formatearFecha(data)
          setTimeout(() => {
          });     
        })
      } 
    }  
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  terminarpartido(id:number){
    this.ligaId = JSON.parse(localStorage.getItem('Liga')!);
    if(this.ligaId!= undefined){
      this.superAdminService.actualizarResultado(id).subscribe({
        next: async (response) => {
          this.helpers.redirectTo('SuperAdmin/configurarLigaEquipos');
          this.showSnackBar(
            'Haz finalizado el partido correctamente',
            SnackBarStatus.SUCCESS          
          );  
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
  }

  chequearFinalizada(){
    if(this.ligaId!= undefined){
      this.superAdminService.chequearFinalizadaEquipo(this.ligaId).subscribe({
        next: async (response) => {
          this.showSnackBar(
            'Haz finalizado la liga correctamente',
            SnackBarStatus.SUCCESS
          );
          this.helpers.redirectTo('superAdminIndex');
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
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

  formatearFecha(p: DtPartido[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfigurarLigaEquiposAgregarPartido, {
      width: '650px'
    });
  }
}


