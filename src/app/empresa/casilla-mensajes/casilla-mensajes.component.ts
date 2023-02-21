import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtChat } from 'src/app/models/Datatypes/DtChat';
import { EmpresaService } from 'src/app/Servicios/empresa/empresa.service';

@Component({
  selector: 'app-casilla-mensajes-Empresa',
  templateUrl: './casilla-mensajes.component.html',
  styleUrls: ['./casilla-mensajes.component.css'],
})
export class CasillaMensajesEComponent implements OnInit {
  chats: DtChat[] = [];
  usuario: DtUser = {};

  constructor(
    public dialog: MatDialog,
    private helpers: HelperService,
    private user: EmpresaService
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

  entrarAlChat(nomUsuario: string, idUsuario: number, idChat: number) {
    console.log(idUsuario)
    localStorage.setItem('idUsuario', JSON.stringify(idUsuario));
    localStorage.setItem('nomUsuario', JSON.stringify(nomUsuario));
    localStorage.setItem('idChat', JSON.stringify(idChat));

    this.helpers.redirectTo('Empresa/chat');
  }
}
