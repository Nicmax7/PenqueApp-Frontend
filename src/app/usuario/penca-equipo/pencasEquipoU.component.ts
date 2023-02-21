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
import { Tipo_Resultado } from "src/app/models/enums/Tipo_Resultado"

@Component({
  selector: 'app-pencasEquipoU',
  templateUrl: './pencasEquipoU.component.html',
  styleUrls: ['./pencasEquipoU.component.css']
})

export class pencasEquipoUComponent implements OnInit {
  displayedColumns: string[] = ['photos', 'date', 'v', 'vs', 'l', 'resultado', 'Configuración', 'actions'];
  public dataSource: MatTableDataSource<DtPartido> = new MatTableDataSource();
  partidos: DtPartido[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  liga!: number;
  color!: string;

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private pencasService: PencasService,
    private adminService: AdministracionService,
    private router: Router,
    private helpers: HelperService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
  }

  formatearFecha(p: DtPartido[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

  ngOnInit() {
    this.color = JSON.parse(localStorage.getItem('colorPenca')!);
    if (this.helpers.isAuthenticated()) {

      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if (this.liga != undefined) {
        this.pencasService.getPartidos(this.liga).subscribe(data => {
          this.partidos = data;
          this.formatearFecha(data);

          setTimeout(() => {
          });

        })
      }
    };
  }

  partidoPendiente(resultado: Tipo_Resultado) {
    if (Number(resultado) == 3) return true;
    else return false;
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
  isComun(): boolean {
    const usr: DtUser = this.getLocalStorage();
    if (usr != null) {
      if (Number(usr.tipo_rol) == 2) {
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }


  goPartido(id: number) {
    localStorage.setItem('idPartido', JSON.stringify(id));
    this.helpers.redirectTo('partido');
  }

  goDashBoard() {
    this.helpers.redirectTo('Usuario/Penca/dashboard');
  }

}
