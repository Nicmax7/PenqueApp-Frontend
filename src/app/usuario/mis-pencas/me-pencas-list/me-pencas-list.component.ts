import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas'; 
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service'; 


@Component({
  selector: 'app-me-pencas-list',
  templateUrl: './me-pencas-list.component.html',
  styleUrls: ['./me-pencas-list.component.css'],
})
@Injectable({ providedIn: 'root' })
export class MisPencasListComponent implements OnInit {

  constructor(
    private router: Router,
    private pencasService: PencasService,
    private helper: HelperService
  ) { }

  @Input()
  pencas: DtPenca[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 8;
  hasResults = true;
  usuario: DtUser = {};;


  ngOnInit(): void {
    this.getPencas();
  }

  public getPencas(){
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
      if(this.usuario.id != undefined){
        this.pencasService.misPencas(this.usuario.id).subscribe({
          next: (response) => {
            this.pencas = response
          },
          error: (err) => {
            console.error('err: ', err.error);
            //TODO: Show error!
          }
        })
      }
      
    
    
  }
  isAuthenticated(): boolean {
    const usr: DtUser = this.getLocalStorage();

    //TODO: Handle token expire date.
    return !usr ? false : true;
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
    this.helper.redirectTo('access-denied');
    return false;
  }


}

