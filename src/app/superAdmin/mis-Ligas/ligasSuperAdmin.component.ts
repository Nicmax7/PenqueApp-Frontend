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
import { DtLigaEquipo } from 'src/app/models/Datatypes/DtLigaEquipo';
import { Tipo_Liga } from 'src/app/models/enums/Tipo_Liga';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { FormControl, Validators } from '@angular/forms';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';

@Component({
  selector: 'app-ligasSuperAdmin',
  templateUrl: './ligasSuperAdmin.component.html',
  styleUrls: ['./ligasSuperAdmin.component.css'],
})
export class LigasSuperAdminComponent implements OnInit {
  displayedColumns: string[] = [
    'photos',
    'title',
    'accion'
    
  ];
  public dataSourceI: MatTableDataSource<DtLigaIndividual> =
    new MatTableDataSource();
  public dataSourceE: MatTableDataSource<DtLigaEquipo> =
  new MatTableDataSource();
  pencas: DtPencasCompartida[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  deporte = new FormControl('', [Validators.required]);
  disciplina = new FormControl('', [Validators.required]);
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loggedUser!: DtUser;
  numDeporte!: number;
  // public page: number;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private superAdmin: SuperAdminService,
    private router: Router,
    private helpers: HelperService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  Numero(tipo: Tipo_Deporte) {
    return Number(tipo);
  }

  getQueryUrl() {
    return this.router.url;
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
  }

  configurarLigaIndividual(idLiga: number) {
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    this.router.navigateByUrl('SuperAdmin/configurarLigaIndividual');
  }
  
  configurarLigaEquipo(idLiga: number, deporte: number) {
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    localStorage.setItem('LigaDeporte', JSON.stringify(deporte));
    this.router.navigateByUrl('SuperAdmin/configurarLigaEquipos');
  }

  configurarLiga(idLiga: number, tipo: Tipo_Liga, deporte: number) {
    if (Number(tipo) == 1) {
      this.configurarLigaIndividual(idLiga);
    }
    if (Number(tipo) == 0) {
      this.configurarLigaEquipo(idLiga, deporte);
    }
  }

  crearLigaIndividual() {
    this.router.navigateByUrl('altaLigaIndividual');
  }
  crearLigaEquipo() {
    this.router.navigateByUrl('altaLigaEquipo');
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
  mostrarLigasEquipos() {
    if (this.deporte.value == 'Futbol') {
      this.numDeporte = 0;
    }
    if (this.deporte.value == 'Basketball') {
      this.numDeporte = 1;
    }
    if (this.deporte.value == 'Tennis') {
      this.numDeporte = 2;
    }
    if (this.deporte.value == 'Voley') {
      this.numDeporte = 3;
    }
    if (this.deporte.value == 'vacio') {
      this.dataSourceE.data = [];
    }
    if (this.deporte.value != 'vacio' && this.deporte.value != '') {
      this.loggedUser = this.helpers.getLocalStorage();
      this.superAdmin 
        .getLigasPorDeporte(this.numDeporte)
        .subscribe((data) => {
          this.dataSourceE.data = data;
        });
    }
  }

  mostrarLigasIndividuales() {
    if (this.disciplina.value == 'Natacion') {
      this.numDeporte = 0;
    }
    if (this.disciplina.value == 'Ciclismo') {
      this.numDeporte = 1;
    }
    if (this.disciplina.value == 'Atletismo') {
      this.numDeporte = 2;
    }
    if (this.disciplina.value == 'vacio') {
      this.dataSourceI.data = [];
    }
    if (this.disciplina.value != 'vacio' && this.disciplina.value != '') {
      this.loggedUser = this.helpers.getLocalStorage();
      this.superAdmin
        .getLigasPorDisciplina(this.numDeporte)
        .subscribe((data) => {
          this.dataSourceI.data = data;
        });
    }
  }

  applyFilterE(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceE.filter = filterValue.trim().toLowerCase();
  }

  applyFilterI(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceI.filter = filterValue.trim().toLowerCase();
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
}
