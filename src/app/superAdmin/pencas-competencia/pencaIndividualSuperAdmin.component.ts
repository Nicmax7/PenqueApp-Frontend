import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';

@Component({
  selector: 'app-pencasSuperAdmin',
  templateUrl: './pencaIndividualSuperAdmin.component.html',
  styleUrls: ['./pencaIndividualSuperAdmin.component.css']
})

export class PencaIndividualSuperAdminComponent implements OnInit {
  displayedColumns: string[] = ['photos', 'title', 'date', 'Cant. Participantes', 'Area', 'estado'];
  public dataSource: MatTableDataSource<DtCompetencia> = new MatTableDataSource();
  pencas: DtCompetencia[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  liga!: number;
  idPenca!: number;
  dtPenca!: DtPenca;
  tieneAdmin!: boolean;

  constructor(public dialog: MatDialog,
    private pencasService: PencasService,
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.tieneAdmin = JSON.parse(localStorage.getItem('tieneAdmin')!);
    if (this.helpers.isAuthenticated()) {

      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if (this.liga != undefined) {
        this.pencasService.mostrarCompetencias(this.liga).subscribe(data => {
          this.dataSource.data = data;
          setTimeout(() => {
          });
          this.formatearFecha(this.dataSource.data);
        })
      }
      this.idPenca = JSON.parse(localStorage.getItem('Penca')!);
      if (this.idPenca != undefined) {
        this.pencasService.getInfoPenca(this.idPenca).subscribe(data => {
          this.dtPenca = data;
          setTimeout(() => { });
        })
      }  
    };
  }

  asignarAdmin() {
    localStorage.setItem('Penca', JSON.stringify(this.idPenca));
    this.router.navigateByUrl('SuperAdmin/listarAdministradores');
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

  formatearFecha(p: DtCompetencia[]) {
    for (var i = 0; i < p.length; i++) {
      var splitted = p[i].fecha_competencia?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

}
