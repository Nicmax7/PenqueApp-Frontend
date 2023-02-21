import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pencasAdmin',
  templateUrl: './pencaEquipoSuperAdmin.component.html',
  styleUrls: ['./pencaEquipoSuperAdmin.component.css']
})

export class PencaEquipoSuperAdminComponent implements OnInit {
  displayedColumns: string[] = ['date', 'l', 'vs', 'v', 'resultado'];
  public dataSource: MatTableDataSource<DtPartido> = new MatTableDataSource();
  dtPenca!: DtPenca;
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  liga!: number;
  idPenca!: number;
  tieneAdmin!: boolean;
  // public page: number;

  constructor(public dialog: MatDialog,
    private pencasService: PencasService,
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if (this.liga != undefined) {
        this.pencasService.getPartidos(this.liga).subscribe(data => {
          this.dataSource.data = data;
          this.formatearFecha(this.dataSource.data);
        })
      }
      this.idPenca = JSON.parse(localStorage.getItem('Penca')!);
      if (this.idPenca != undefined) {
        this.pencasService.getInfoPenca(this.idPenca).subscribe(data => {
          this.dtPenca = data;
        })
      }
    };
  }

  asignarAdmin() {
    localStorage.setItem('Penca', JSON.stringify(this.idPenca));
    this.router.navigateByUrl('SuperAdmin/listarAdministradores');
  }

  formatearFecha(p: DtPartido[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
}
