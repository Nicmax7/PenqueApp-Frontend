import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { HelperService } from 'src/app/helpers/helpers';
import { MatDialog } from '@angular/material/dialog';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { MatTableDataSource } from '@angular/material/table';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { ConfiguracionCompetenciaComponent } from './configuracionCompetencia.component';

@Component({
  selector: 'app-configurarLigaIndividual',
  templateUrl: './configurarLigaIndividual.component.html',
  styleUrls: ['./configurarLigaIndividual.component.css'],
})
export class ConfigurarLigaIndividualComponent implements OnInit {
  constructor(
    private auth: SuperAdminService,
    private snackBar: MatSnackBar,
    private helpers: HelperService,
    private superAdminService: SuperAdminService,
    private ligasService: LigasService,
    private pencasService: PencasService,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['photos', 'title', 'date', 'Cant. Participantes', 'estado', 'accion'];
  errorMessage: string = '';
  visibility: boolean = true;
  ligaControl = new FormControl('', [Validators.required]);
  partidoControl = new FormControl('', [Validators.required]);
  public dataSource: MatTableDataSource<DtCompetencia> = new MatTableDataSource();
  dtLiga!: DtLigaIndividual;
  ligaId!: number;
  loggedUser!: DtUser;

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.ligaId = JSON.parse(localStorage.getItem('Liga')!);
      if (this.ligaId != undefined) {
        this.superAdminService.getLigaIndividualById(this.ligaId).subscribe(data => {
          this.dtLiga = data;
        });
      }

      if (this.ligaId != undefined) {
        this.pencasService.mostrarCompetencias(this.ligaId).subscribe(data => {
          this.dataSource.data = data;
          setTimeout(() => {
          });
          this.formatearFecha(this.dataSource.data);
        })
      }
    }
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  nuevaCompetencia(){
    
    this.helpers.redirectTo('altaCompetencia');  
  }

  chequearFinalizada() {
    if (this.ligaId != undefined) {
      this.superAdminService.chequearFinalizadaIndividual(this.ligaId).subscribe({
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

  formatearFecha(p: DtCompetencia[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha_competencia?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

  ConfigurarCompetencia(idCompetencia: number){
    localStorage.setItem('Competencia', JSON.stringify(idCompetencia));
    this.helpers.redirectTo('SuperAdmin/configuracionCompetencia')
  }

  /*openDialog(idCompetencia: number): void {
    localStorage.setItem('Competencia', JSON.stringify(idCompetencia));
    const dialogRef = this.dialog.open(ConfiguracionCompetenciaComponent, {
      width: '650px'
    });
  }*/
}