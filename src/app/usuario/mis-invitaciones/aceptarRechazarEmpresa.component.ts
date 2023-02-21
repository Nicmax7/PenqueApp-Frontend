import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/helpers/helpers';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';

@Component({
  selector: 'app-aceptarRechazarEmpresa',
  templateUrl: './aceptarRechazarEmpresa.component.html',
  styleUrls: ['./aceptarRechazarEmpresa.component.css'],
})
export class AceptarRechazarEmpresaComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Fecha', 'Aceptar', 'Rechazar'];
  pageNumber: number = 0;
  PAGE_RECORDS: number = 20;
  totalRows = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  usuarioData!: DtPenca[];
  usuario!: DtUser;
  empresa!: number;
  penca!: number;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private helpers: HelperService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.helpers.isAuthenticated()) {
      this.usuario = JSON.parse(localStorage.getItem('authUser')!);
      if (this.usuario.id != undefined) {
        this.userService
          .listarInvitacionesPenca(this.usuario.id)
          .subscribe((data) => {
            this.usuarioData = data;
            this.formatearFechaPenca(this.usuarioData)
          });
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


  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  aceptarUsuario(idPenca: number) {
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
    if (this.usuario.id != undefined) {
      this.userService.aceptarInvitacion(this.usuario.id, idPenca).subscribe({
        next: async (response) => {
          this.showSnackBar(
            'Has aceptado a la penca de empresa satisfactoriamente',
            SnackBarStatus.SUCCESS
          );
          this.helpers.redirectTo('/AceptarRechazarEmpresa');
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
  }

  rechazarUsuario(idPenca: number) {
    this.usuario = JSON.parse(localStorage.getItem('authUser')!);
    if (this.usuario.id != undefined) {
      this.userService.rechazarInvitacion(this.usuario.id, idPenca).subscribe({
        next: async (response) => {
          this.showSnackBar(
            'Has rechazado a la penca de empresa satisfactoriamente',
            SnackBarStatus.SUCCESS
          );
          this.helpers.redirectTo('/AceptarRechazarEmpresa');
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
  }

  formatearFechaPenca(p: DtPenca[]) {
    for(var i=0; i < p.length; i++){
        var splitted = p[i].fecha_Creacion?.toString().split("T", 1);
        p[i].fecha_string = splitted![0];
      }
  }
}
