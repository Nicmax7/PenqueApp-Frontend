import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service'; 
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { AdministracionService } from 'src/app/Servicios/administracion/administracion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';

@Component({
  selector: 'app-pencasAdmin',
  templateUrl: './ligaIndividualAdmin.component.html',
  styleUrls: ['./ligaIndividualAdmin.component.css']
})

export class ligaIndividualAdminComponent implements OnInit{
  displayedColumns: string[] = ['photos','title', 'date','Cant. Participantes', 'Area', 'estado'];
  public dataSource:MatTableDataSource<DtCompetencia> = new MatTableDataSource();
  pencas: DtCompetencia[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  liga!: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private pencasService: PencasService,
              private router: Router,
              private helpers: HelperService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    if(this.helpers.isAuthenticated()){
     
      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if(this.liga!= undefined){
        this.pencasService.mostrarCompetencias(this.liga).subscribe(data =>{
          this.dataSource.data =data;
          this.formatearFecha(this.dataSource.data)
          setTimeout(() => {});     
        })
      }
    };
  }

  formatearFecha(p:DtCompetencia[]){
    for(var i=0; i < p.length; i++){
      var splitted = p[i].fecha_competencia?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }}
  getQueryUrl(){
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

  isAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 1){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  isSuperAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        return true;
      }
    }

    return false;
  }
  
}
