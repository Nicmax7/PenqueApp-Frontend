import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { AdministracionService } from 'src/app/Servicios/administracion/administracion.service'; 
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service'; 
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { DtPuntaje } from 'src/app/models/Datatypes/DtPuntaje';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtPartido } from 'src/app/models/Datatypes/DtPartido';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';

@Component({
  selector: 'app-pencasEmpresa',
  templateUrl: './pencaEquipoEmpresa.component.html',
  styleUrls: ['./pencaEquipoEmpresa.component.css']
})

export class PencaEquipoEmpresaComponent implements OnInit{
  dtpenca!: DtPenca;
  puntajes!: DtPuntaje[];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  penca!: number;
  liga!: number;
  displayedColumns: string[] = ['fecha','local', 'vs', 'visitante', 'resultado'];
  public dataSource:MatTableDataSource<DtPartido> = new MatTableDataSource();
  partidos: DtPartido[] = [];
  public show:boolean = false;
  public buttonName:any = 'Ver partidos';

  constructor(public dialog: MatDialog,
              private pencasService: PencasService,
              private adminService: AdministracionService,
              private router: Router,
              private helpers: HelperService,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.dtpenca = {id: 0, tipo_Deporte: Tipo_Deporte.Futbol}
    if(this.helpers.isAuthenticated()){
     
      this.penca = JSON.parse(localStorage.getItem('Penca')!);
      if(this.penca!= undefined){
        this.pencasService.getInfoPenca(this.penca).subscribe(data =>{
          this.dtpenca = data;
          this.formatearFechaPenca(this.dtpenca)
        })
        this.pencasService.getPosicionesPenca(this.penca).subscribe(data =>{
          this.puntajes = data;
        }) 
      }

      this.pencasService.getIdLIga(this.penca).subscribe(liga =>{
        this.liga = liga;
        if(this.liga != undefined){
          this.pencasService.getPartidos(this.liga).subscribe(data =>{
              this.dataSource.data =data;
              this.formatearFecha(this.dataSource.data)
              setTimeout(() => {
              });
            
          })
        }
      });   
    };
    console.log(this.penca)
  }

  getQueryUrl(){
    return this.router.url;
  }

  toggle() {
    this.show = !this.show;
    if(this.show)  
      this.buttonName = "Ocultar";
    else
      this.buttonName = "Ver partidos";
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

  finalizarPenca(id:number){
    this.adminService.chequearLigaEquipoFinalizada(id).subscribe({
      next: async (response) => {
        this.showSnackBar(
          'Haz finalizado la penca correctamente',
          SnackBarStatus.SUCCESS
          
        );
        const usr: DtUser = this.helpers.getLocalStorage();
        if( usr!= null ){
          if(Number(usr.tipo_rol) == 3){
            this.helpers.redirectTo('/empresaIndex');
          }
          if(Number(usr.tipo_rol) == 1){
            this.helpers.redirectTo('/adminIndex');
          }
        }
      },
      error: (err) => {
        this.showSnackBar(err.error, SnackBarStatus.ERROR);
      },
    });
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

  formatearFecha(p:DtPartido[]){
    for(var i=0; i < p.length; i++){
      var splitted = p[i].fecha?.toString().split("T", 1);
      p[i].fecha_string = splitted![0];
    }
  }

  formatearFechaPenca(p:DtPenca){
  
      var splitted = p.fecha_Creacion?.toString().split("T", 1);
      p.fecha_string = splitted![0];
    
  }
  
}
