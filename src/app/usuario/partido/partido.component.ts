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
import { Tipo_Resultado } from 'src/app/models/enums/Tipo_Resultado';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtHistorial } from 'src/app/models/Datatypes/DtHistorial';
import { Tipo_Historial } from 'src/app/models/enums/Tipo_Historial';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { DtEstadistica } from 'src/app/models/Datatypes/DtEstadisticas';
import { DtGrafica } from 'src/app/models/Datatypes/DtGrafica';
import { predecirPartidoComponent } from '../componentes/predecirPartido/predecirPartido.component';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
})
export class partidoComponent implements OnInit {
  displayedColumns: string[] = ['local', 'vs', 'visitante'];
  public dataSource: MatTableDataSource<DtPartido> = new MatTableDataSource();
  partido!: DtPartido;
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  historialE1!: DtHistorial[];
  historialE2!: DtHistorial[];
  miPrediccion!: Tipo_Resultado;
  estadisticas!: DtEstadistica;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  partidoFront!: number;
  single?: any[];
  usuario: DtUser = {};
  pencaId!: number
  deportePenca!: number

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  ligaDt!: DtLigaEquipo;
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    
    domain: ['#B80CF8', '#65F80C', '#F0DE16', '#AAAAAA'],
  };

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private pencasService: PencasService,
    private adminService: AdministracionService,
    private router: Router,
    private helpers: HelperService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private user: UserService,
    private liga: LigasService
  ) {
    Object.assign(this, this.single);
  }

  ngOnInit() {

    this.deportePenca = JSON.parse(localStorage.getItem('DeportePenca')!);
    this.ligaDt = {
      nombreLiga: undefined,
    };

    this.partido = {
      deporte: undefined,
      resultado: Tipo_Resultado.Indefinido,
      id: 0,
    };

    if (this.helpers.isAuthenticated()) {
      this.partidoFront = JSON.parse(localStorage.getItem('idPartido')!);
      if (this.partidoFront != undefined) {
        this.pencasService.getPartido(this.partidoFront).subscribe((data) => {
          this.partido = data;
          localStorage.setItem('Deporte', JSON.stringify(this.partido.deporte));
          console.log(data)
          this.formatearFecha(this.partido);
          if (
            this.partido.idvisitante != null &&
            this.partido.idlocal != null
          ) {
            this.getEquipo1Historial(this.partido.idvisitante);
            this.getEquipo2Historial(this.partido.idlocal);
          }
        });
      }
      this.usuario = JSON.parse(localStorage.getItem('authUser')!);
      this.pencaId = JSON.parse(localStorage.getItem('Penca')!);
      if (this.usuario.id != undefined) {
        this.user
          .verPrediccionPartido(this.partidoFront, this.usuario.id, this.pencaId)
          .subscribe({
            next: async (response) => {
              this.miPrediccion = response;
              Number(this.miPrediccion);
            },
            error: (err) => {},
          });
      }

      this.pencasService.getEstadisticasPartido(this.partidoFront).subscribe({
        next: async (response) => {
          this.estadisticas = response;
          this.crearestadistica(response);
        },
        error: (err) => {},
      });

      this.liga
        .getLigaEquipo(JSON.parse(localStorage.getItem('Liga')!))
        .subscribe({
          next: async (response) => {
            this.ligaDt = response;
          },
          error: (err) => {},
        });
    }
  }

  formatearFecha(p:DtPartido){
      var splitted = p.fecha?.toString().split("T", 1);
      p.fecha_string = splitted![0];
  }

  Numero(tipo: Tipo_Resultado | undefined | Tipo_Deporte) {
    return Number(tipo);
  }
  NumeroH(tipo: Tipo_Historial) {
    return Number(tipo);
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


  getEquipo1Historial(id: number) {
    this.pencasService.getHistorialEquipo(id).subscribe({
      next: async (response) => {
        this.historialE1 = response;
      },
      error: (err) => {},
    });
  }
  getEquipo2Historial(id: number) {
    this.pencasService.getHistorialEquipo(id).subscribe({
      next: async (response) => {
        this.historialE2 = response;
      },
      error: (err) => {},
    });
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  crearestadistica(dte: DtEstadistica) {
    this.single = [
      {
        value: dte.empate,
        name: 'Empate',
      },
      {
        value: dte.visitante,
        name: 'Gana visitante',
      },
      {
        value: dte.local,
        name: 'Gana local',
      },
    ];
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    idPartido: number
  ): void {
    localStorage.setItem('Partido', JSON.stringify(idPartido));
    this.dialog.open(predecirPartidoComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}