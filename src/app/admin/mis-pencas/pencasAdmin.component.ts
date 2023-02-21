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
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { colorChangeComponent } from 'src/app/superAdmin/colorChange/colorChange.component';

@Component({
  selector: 'app-pencasAdmin',
  templateUrl: './pencasAdmin.component.html',
  styleUrls: ['./pencasAdmin.component.css']
})

export class PencasAdminComponent implements OnInit{
  displayedColumns: string[] = ['photos','title', 'price', 'deporte', 'enabled', 'end', 'color'];
  public dataSource:MatTableDataSource<DtPencasCompartida> = new MatTableDataSource();
  pencas: DtPencasCompartida[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loggedUser!: DtUser;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private adminService: AdministracionService,
              private router: Router,
              private helpers: HelperService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar
  ) {
  }



  ngOnInit() {
    if(this.helpers.isAuthenticated()){
     
      this.loggedUser = this.helpers.getLocalStorage();
      if(this.loggedUser.id != undefined){
        this.adminService.getPencasCompartidas(this.loggedUser.id).subscribe(data =>{
            this.dataSource.data =data;
            console.log(data);
          
        })
      }
      };
   
    }

  getQueryUrl(){
    return this.router.url;
  }
  Numero(tipo: Tipo_Deporte) {
    return Number(tipo);
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
  }

  configurarLigaIndividual(idLiga:number){
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    this.router.navigateByUrl('/me/ligaIndividual');
  }
  configurarLigaEquipo(idLiga:number){
    localStorage.setItem('Liga', JSON.stringify(idLiga));
    this.router.navigateByUrl('/me/ligaEquipo');
  }

  VerLiga(idLiga:number, tipo:Tipo_Liga){
    if(Number(tipo) == 1){
      this.configurarLigaIndividual(idLiga);
    }
    if(Number(tipo) == 0){
      this.configurarLigaEquipo(idLiga);
    }
  }

  finalizarPenca(idPenca:number, tipoLiga:Tipo_Liga){
    if(Number(tipoLiga) == 0){
      this.finalizarPencaEquipo(idPenca);
    }
    if(Number(tipoLiga) == 1){
      this.finalizarPencaIndividual(idPenca);
    }
  }

  finalizarPencaIndividual(id:number){
    this.adminService.chequearLigaIndividualFinalizada(id).subscribe({
      next: async (response) => {
        this.showSnackBar(
          'Haz finalizado la penca correctamente',
          SnackBarStatus.SUCCESS
          
        );
        this.helpers.redirectTo('/adminIndex');
      },
      error: (err) => {
        this.showSnackBar(err.error, SnackBarStatus.ERROR);
      },
    });
  }
  finalizarPencaEquipo(id:number){
    this.adminService.chequearLigaEquipoFinalizada(id).subscribe({
      next: async (response) => {
        this.showSnackBar(
          'Haz finalizado la penca correctamente',
          SnackBarStatus.SUCCESS
          
        );
        this.helpers.redirectTo('/adminIndex');
      },
      error: (err) => {
        this.showSnackBar(err.error, SnackBarStatus.ERROR);
      },
    });
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
    this.helpers.redirectTo('access-denied');
    return false;
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
