import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpresaService } from 'src/app/Servicios/empresa/empresa.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtPencaEmpresa } from 'src/app/models/Datatypes/DtPencaEmpresa';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { Tipo_Liga } from 'src/app/models/enums/Tipo_Liga';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { colorChangeComponent } from 'src/app/superAdmin/colorChange/colorChange.component';

@Component({
  selector: 'app-pencasEmpresa',
  templateUrl: './pencasEmpresa.component.html',
  styleUrls: ['./pencasEmpresa.component.css']
})

export class PencasEmpresaComponent implements OnInit{
  displayedColumns: string[] = ['photos','title', 'deporte', 'verPenca', 'invitaciones', 'usuariosPendientesDeAceptar','color'];
  public dataSource:MatTableDataSource<DtPencaEmpresa> = new MatTableDataSource();
  pencas: DtPencaEmpresa[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  loggedUser!: DtUser;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private empresaService: EmpresaService,
              private router: Router,
              private helpers: HelperService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar
  ){}

  ngOnInit() {
    if(this.helpers.isAuthenticated()){
     
      this.loggedUser = this.helpers.getLocalStorage();
      if(this.loggedUser.id != undefined){
        this.empresaService.getPencasEmpresa(this.loggedUser.id).subscribe(data =>{
          this.dataSource.data = data;
          console.log(data);        
        })
      }
    };
  }
  Numero(tipo: Tipo_Deporte) {
    return Number(tipo);
  }
  getQueryUrl(){
    return this.router.url;
  }
  isEmpresa(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 3){
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

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
  }

  verPencaIndividual(idPenca:number){
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    this.router.navigateByUrl('Empresa/pencaIndividualEmpresaComponent');
  }
  verPencaEquipo(idPenca:number){
    console.log(idPenca)
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    this.router.navigateByUrl('Empresa/pencaEquipoEmpresaComponent');
  }

  VerPenca(idPenca:number, tipo:Tipo_Liga){
    console.log(tipo)
    if(Number(tipo) == 1){
      this.verPencaIndividual(idPenca);
    }
    if(Number(tipo) == 0){
      this.verPencaEquipo(idPenca);
    }
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

  invitarAUsuario(id : number){
    localStorage.setItem('Penca', JSON.stringify(id));
    this.router.navigateByUrl('invitarUsuarioAPenca');
  }

  verUsuariosParaAceptarRechazar(id : number){
    localStorage.setItem('Penca', JSON.stringify(id));
    this.router.navigateByUrl('aceptarRechazarUsuario');
  }
}
