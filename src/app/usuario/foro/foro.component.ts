import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/helpers/helpers';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { DtForo } from 'src/app/models/Datatypes/DtForo';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { DtMensajeForo } from 'src/app/models/Datatypes/DtMensajeForo';
import { DtUser } from 'src/app/models/Datatypes/DtUser';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css'],
})
export class ForoComponent implements OnInit {
  foro: string[] = [];
  penca!: number;
  mensajes: DtForo[] = [];
  comentarioFormControl = new FormControl('', [Validators.required]);
  user: DtUser = {};

  constructor(
    public dialog: MatDialog,
    private pencasService: PencasService,
    private helpers: HelperService,
    private snackBar: MatSnackBar,
    private usuario: UserService
  ) {}

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.penca = JSON.parse(localStorage.getItem('Penca')!);
      if (this.penca != undefined) {
        this.pencasService.verForo(this.penca).subscribe((data) => {
          this.foro = data;
          this.crearCombo(this.foro);
        });
      }
    }
  }
  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
  isComun(): boolean {
    const usr: DtUser = this.getLocalStorage();
    if (usr != null) {
      if (Number(usr.tipo_rol) == 2) {
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  crearCombo(mensajes: string[]) {
    for (var i = 0; i < mensajes.length; i++) {
      var splitted = mensajes[i].split(':', 2);

      let data: DtForo = {
        mensaje: splitted[1],
        usuario: splitted[0],
      };

      this.mensajes.push(data);
    }
  }

  comentar() {
    if (this.comentarioFormControl.value == '') {
      this.showSnackBar('No envies campos vacios', SnackBarStatus.ERROR);
    } else {
      this.user = JSON.parse(localStorage.getItem('authUser')!);
      if (this.user.id != undefined) {
        let data: DtMensajeForo = {
          comentario: this.comentarioFormControl.value,
          idPenca: this.penca,
          idUsuario: this.user.id,
        };

        this.usuario.comentarEnForo(data).subscribe((data) => {
          this.showSnackBar(
            'Su comentario fue añadido con exito',
            SnackBarStatus.SUCCESS
          );
          this.helpers.redirectTo('Usuario/Penca/Foro');
        });
      }
    }
  }
}
