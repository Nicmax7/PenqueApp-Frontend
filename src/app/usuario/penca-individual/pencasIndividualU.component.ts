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

@Component({
  selector: 'app-pencasIndividualU',
  templateUrl: './pencasIndividualU.component.html',
  styleUrls: ['./pencasIndividualU.component.css']
})

export class pencasIndividualUComponent implements OnInit {
  displayedColumns: string[] = ['photos', 'date', 'v', 'vs', 'l', 'resultado', 'Configuración', 'actions'];
  public dataSource: MatTableDataSource<DtPartido> = new MatTableDataSource();
  competencias: DtCompetencia[] = [];
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


  ngOnInit() {
    this.color = JSON.parse(localStorage.getItem('colorPenca')!);
    if (this.helpers.isAuthenticated()) {

      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if (this.liga != undefined) {
        this.pencasService.mostrarCompetencias(this.liga).subscribe(data => {
          this.competencias = data;
          this.formatearFecha(this.competencias);
          console.log(data);
          setTimeout(() => {
          });

        })
      }
    };

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

  goDashBoard() {
    this.helpers.redirectTo('Usuario/Penca/dashboard');
  }

  getQueryUrl() {
    return this.router.url;
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
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

  goCompetencia(id: number | undefined) {
    localStorage.setItem('idCompetencia', JSON.stringify(id));
    this.helpers.redirectTo('competencia');
  }
  formatearFecha(p: DtCompetencia[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha_competencia?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

}
