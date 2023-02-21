import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas'; 
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service'; 


@Component({
  selector: 'app-pencas-list',
  templateUrl: './pencas-list.component.html',
  styleUrls: ['./pencas-list.component.css'],
})
@Injectable({ providedIn: 'root' })
export class PencasListComponent implements OnInit {

  constructor(
    private router: Router,
    private pencasService: PencasService,
    private helper: HelperService
  ) { }

  @Input()
  pencasCompartida: DtPencasCompartida[] = [];
  pencasCompartidaReserva: DtPencasCompartida[] = [];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 8;
  hasResults = true;
  searchTerm = '';
  usuario: DtUser = {};


  ngOnInit(): void {
    this.getPencas();
  }

  public getPencas(){
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
      if(this.usuario.id != undefined){
        this.pencasService.getPencasCompartidas(true, this.usuario.id).subscribe({
          next: (response) => {
            this.pencasCompartida = response;
            this.pencasCompartidaReserva = response;
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

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  busqueda() {
   var textoEscrito = this.searchTerm;
    var listafiltrada = this.pencasCompartidaReserva.filter(function(name) {
        return name.nombre.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1;
    })

    this.pencasCompartida = listafiltrada; 
    if (textoEscrito.trim() == ""){
      this.pencasCompartida = this.pencasCompartidaReserva; 
    }
  }

}

