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
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { FormControl, Validators } from '@angular/forms';
import { colorChangeComponent } from '../colorChange/colorChange.component';

@Component({
  selector: 'app-pencasSuperAdmin',
  templateUrl: './pencasSuperAdmin.component.html',
  styleUrls: ['./pencasSuperAdmin.component.css'],
})
export class PencasSuperAdminComponent implements OnInit {
  displayedColumns: string[] = [
    'photos',
    'title',
    'price',
    'deporte',
    'tipo',
    'enabled',
    'color'
   
  ];
  public dataSource: MatTableDataSource<DtPencasCompartida> =
    new MatTableDataSource();
  pencas: DtPencasCompartida[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  deporte = new FormControl('', [Validators.required]);
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

  verPencaIndividual(idLiga: number) {
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    this.router.navigateByUrl('SuperAdmin/pencaIndividualSuperAdmin');
  }
  verPencaEquipo(idLiga: number) {
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    this.router.navigateByUrl('SuperAdmin/pencaEquipoSuperAdmin');
  }

  verPenca(idPenca: number, idLiga: number, tipo: Tipo_Liga, tieneAdmin: Boolean) {
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    if (Number(tipo) == 1) {
      this.verPencaIndividual(idLiga);
    }
    if (Number(tipo) == 0) {
      this.verPencaEquipo(idLiga);
    }
  }

  crearPencaIndividual() {
    this.router.navigateByUrl('SuperAdmin/altaPencaIndividual');
  }
  crearPencaEquipo() {
    this.router.navigateByUrl('SuperAdmin/altaPencaEquipo');
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
  mostrarPencas() {
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
    if (this.deporte.value == 'Competencia') {
      this.numDeporte = 4;
    }
    if (this.deporte.value == 'vacio') {
      this.dataSource.data = [];
    }

    if (this.deporte.value != 'vacio' && this.numDeporte != undefined ) {
      this.loggedUser = this.helpers.getLocalStorage();
      this.superAdmin
        .getPencasCompartidas(this.numDeporte)
        .subscribe((data) => {
          this.dataSource.data = data;
        });
    }
  }

  isAdmin(): boolean {
    const usr: DtUser = this.helpers.getLocalStorage();
    if (usr != null) {
      if (Number(usr.tipo_rol) == 0) {
        return true;
      }
    }

    return false;
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    idPenca:number
  ): void {
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    this.dialog.open(colorChangeComponent, {
      width: '300px',
      height: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.showSnackBar('El cambio será visible para el usuario final', SnackBarStatus.INFO);
  }
}
