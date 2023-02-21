import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './helpers/helpers';
import { DtUser } from './models/Datatypes/DtUser';
import { Tipo_Rol } from './models/enums/Tipo_Rol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  [x: string]: any;
  title = 'FrontEnd';

  constructor(
    private router: Router,
    private helpers: HelperService
  ) { }

  

  isAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 1){
        return true;
      }
    }

    return false;
  }

  isComun(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 2){
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

    return false;
  }

  isEmpresa(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 3){
        return true;
      }
    }

    return false;
  }
}
