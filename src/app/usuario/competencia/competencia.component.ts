import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AdministracionService } from 'src/app/Servicios/administracion/administracion.service';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { Tipo_Liga } from 'src/app/models/enums/Tipo_Liga';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtParticipante } from 'src/app/models/Datatypes/DtParticipante';
import { CompetenciasService } from 'src/app/Servicios/compentecias/competencias.service';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtApuesta } from 'src/app/models/Datatypes/DtApuesta';
import { DtNombre } from 'src/app/models/Datatypes/DtNombre';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.css'],
})
export class CompetenciaComponent implements OnInit {
  displayedColumns: string[] = ['title', 'deporte', 'end'];
  displayedColumnsP: string[] = ['posiciones','title'];
  public dataSource: MatTableDataSource<DtParticipante> =
    new MatTableDataSource();
    public dataPosiciones: MatTableDataSource<DtNombre> =
    new MatTableDataSource();
  participantes: DtParticipante[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  competencia!: number;
  competenciaData!: DtCompetencia;
  nombreParticipante!: string;
  usuario!: DtUser;
  apuesta: boolean = true;
  posiciones!: DtNombre[];
  tablaPosiciones: boolean = true;
  pencaId!: number

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private pencasService: PencasService,
    private adminService: AdministracionService,
    private router: Router,
    private helpers: HelperService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private compS: CompetenciasService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.competenciaData = {
      nombre: '-',
      fecha_competencia: new Date(),
    };
    if (this.helpers.isAuthenticated()) {
      this.competencia = JSON.parse(localStorage.getItem('idCompetencia')!);
      if (this.competencia != undefined) {
        this.compS
          .getParticipantesCompetencia(this.competencia)
          .subscribe((data) => {
            this.dataSource.data = data;
            setTimeout(() => {});
          });

        this.compS.getCompetencia(this.competencia).subscribe({
          next: async (data) => {
            this.competenciaData = data;
            this.formatearFecha(this.competenciaData)
          },
          error: (err) => {},
        });
      }
    }

    this.pencaId = JSON.parse(localStorage.getItem('Penca')!);
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
    if (this.usuario.id != undefined) {
      this.user
        .verApuestaCompetencia(this.competencia, this.usuario.id, this.pencaId)
        .subscribe({
          next: async (response) => {
            if (response != '') {
              this.apuesta = false;
              this.nombreParticipante = response;
            }
          },
          error: (err) => {
            console.log(err.error.text);
          },
        });

      this.compS.mostrarResultados(this.competencia).subscribe((data) => {
        this.posiciones = data;
        this.dataPosiciones.data = data;
        console.log(data);
        if(data.length == 0){
          this.tablaPosiciones = false;
        }
      });
    }
  }

  getQueryUrl() {
    return this.router.url;
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
  }

  isAdmin(): boolean {
    const usr: DtUser = this.helpers.getLocalStorage();
    if (usr != null) {
      if (Number(usr.tipo_rol) == 1) {
        return true;
      }
    }

    return false;
  }

  apostarParticipante(idParticipante: number) {
    console.log(idParticipante);
    var penca = JSON.parse(localStorage.getItem('Penca')!);
    var compentecia = JSON.parse(localStorage.getItem('idCompetencia')!);
    var usuario = JSON.parse(localStorage.getItem('authUser')!);

    let data: DtApuesta = {
      idCompetencia: compentecia,
      idParticipante: idParticipante,
      idPenca: penca,
      idUsuario: usuario.id,
    };
    console.log(data);
    this.user.apostarAparticipante(data).subscribe({
      next: async (response) => {
        this.showSnackBar('Apuesta guardada con exito', SnackBarStatus.SUCCESS);
        this.helpers.redirectTo('competencia');
      },
      error: (err) => {
        this.showSnackBar(err.error, SnackBarStatus.ERROR);
      },
    });
  }
  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
  isComun(): boolean{
    const usr: DtUser = this.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 2){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  

  formatearFecha(p:DtCompetencia){
      var splitted = p.fecha_competencia?.toString().split("T", 1);
      p.fecha_string = splitted![0];
  }
  
}
