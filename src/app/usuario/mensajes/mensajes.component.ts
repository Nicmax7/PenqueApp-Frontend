import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtMensaje } from 'src/app/models/Datatypes/DtMensaje';
import { Tipo_Rol } from 'src/app/models/enums/Tipo_Rol';
import { FormControl, Validators } from '@angular/forms';
import { DtEnviar } from 'src/app/models/Datatypes/DtEnviar';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelperService } from 'src/app/helpers/helpers';


@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})

export class MensajesUComponent{
  username = 'username';
  message = '';
  messages = ['hola', 'como', 'estas'];
  mensajes: DtMensaje[] = [];
  empresa: string = '';
  idChat!: number;
  mensajeFormControl = new FormControl('', [Validators.required]);
  idEmpresa!: number; 
  tamanio!: number;
  usuario: DtUser = {}

  constructor(private user: UserService,
    private helpers: HelperService, private snackBar: MatSnackBar) {
  }

  ngOnInit(){
    this.idChat = JSON.parse(localStorage.getItem('idChat')!);
    this.user.verChat(this.idChat).subscribe(data =>{
      this.mensajes = data
     this.colocarUser(this.mensajes)    
     this.tamanio = data.length;
  })

  this.empresa = JSON.parse(localStorage.getItem('nomEmpresa')!);
    
  }

  colocarUser(m:DtMensaje[]){
    for(var i=0; i< m.length; i++){
      var splitted = m[i].mensaje.split("■", 2); 
      if(splitted.length == 2) {
        m[i].mensaje = splitted[1];
        m[i].rol = Tipo_Rol.Empresa;
      }
      
      splitted = m[i].mensaje.split("☻", 2); 
      if(splitted.length == 2){
        m[i].mensaje = splitted[1];
        m[i].rol = Tipo_Rol.Comun;
      }
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

  enviarMSG(){
    console.log(this.mensajeFormControl.value)
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
    this.idEmpresa = JSON.parse(localStorage.getItem('idEmpresa')!);
    if(this.usuario.id != undefined && this.mensajeFormControl.value != undefined){
      let data: DtEnviar = {
        idEmpresa: this.idEmpresa,
        idUsuario: this.usuario.id,
        mensaje: this.mensajeFormControl.value
      }
      this.user.enviarMensaje(data).subscribe({
        next: (response) => {
          this.showSnackBar(
            'Mensaje Enviado',
            SnackBarStatus.SUCCESS
          );
          this.helpers.redirectTo('Usuario/chat');
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
    
  }
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }


}
