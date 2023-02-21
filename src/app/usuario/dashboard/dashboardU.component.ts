import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AdministracionService } from 'src/app/Servicios/administracion/administracion.service';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DtPuntaje } from 'src/app/models/Datatypes/DtPuntaje';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';

@Component({
  selector: 'app-dashboardU',
  templateUrl: './dashboardU.component.html',
  styleUrls: ['./dashboardU.component.css']
})

export class DashboardUserComponent implements OnInit{
  displayedColumns: string[] = ['position','title', 'points'];
  public dataSource:MatTableDataSource<DtPuntaje> = new MatTableDataSource();
  posiciones: DtPuntaje[] = [];
  loggedUser!: DtUser;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private adminService: AdministracionService,
              private router: Router,
              private helpers: HelperService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private penca: PencasService
  ) {
  }

  ngOnInit() {
     
     
        this.penca.getPosicionesPenca(JSON.parse(localStorage.getItem('Penca')!)).subscribe(data =>{
            this.dataSource.data = data;
            this.setNumeros(this.dataSource.data);    
        })
   
    }

    setNumeros(user: DtPuntaje[]){
      for(var i=0; i< user.length; i++){
        user[i].posicion = i + 1;
      }
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
  
  getQueryUrl(){
    return this.router.url;
  }
  
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  isAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 1){
        return true;
      }
    }

    return false;
  }
  
}
