import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtChat } from 'src/app/models/Datatypes/DtChat';

@Component({
  selector: 'app-casilla-mensajes',
  templateUrl: './casilla-mensajes.component.html',
  styleUrls: ['./casilla-mensajes.component.css'],
})
export class CasillaMensajesUComponent implements OnInit {
  chats: DtChat[] = [];
  usuario: DtUser = {};

  constructor(
    public dialog: MatDialog,
    private helpers: HelperService,
    private user: UserService
  ) {}

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
    if (this.usuario.id != undefined) {
      this.user.verlistaChats(this.usuario.id).subscribe((data) => {
        this.chats = data;
        console.log(data);
      });
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


  entrarAlChat(nomEmpresa: string, idEmpresa: number, idChat: number) {
    localStorage.setItem('idEmpresa', JSON.stringify(idEmpresa));
    localStorage.setItem('nomEmpresa', JSON.stringify(nomEmpresa));
    localStorage.setItem('idChat', JSON.stringify(idChat));

    this.helpers.redirectTo('Usuario/chat');
  }
}
