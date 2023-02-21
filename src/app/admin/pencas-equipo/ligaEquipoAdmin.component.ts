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
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';

@Component({
  selector: 'app-pencasAdmin',
  templateUrl: './ligaEquipoAdmin.component.html',
  styleUrls: ['./ligaEquipoAdmin.component.css']
})

export class ligaEquipoAdminComponent implements OnInit{
  displayedColumns: string[] = ['photos', 'date','v', 'vs', 'l', 'resultado'];
  public dataSource:MatTableDataSource<DtPartido> = new MatTableDataSource();
  pencas: DtPartido[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  liga!: number;
 // public page: number;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private pencasService: PencasService,
              private adminService: AdministracionService,
              private router: Router,
              private helpers: HelperService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar
  ) {//this.userId = this.activatedRoute.snapshot.params['id'];
  }

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
 // @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {
    if(this.helpers.isAuthenticated()){
     
      this.liga = JSON.parse(localStorage.getItem('Liga')!);
      if(this.liga!= undefined){
        this.pencasService.getPartidos(this.liga).subscribe(data =>{
            this.dataSource.data =data;
            this.formatearFecha(this.dataSource.data)
            console.log(data);
            //this.dataSource.paginator = this.paginator;
            setTimeout(() => {});          
        })
      }
    };
  }

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
  formatearFecha(p:DtPartido[]){
    for(var i=0; i < p.length; i++){
      var splitted = p[i].fecha?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }
  
}
