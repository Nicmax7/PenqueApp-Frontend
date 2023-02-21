import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtParticipante } from 'src/app/models/Datatypes/DtParticipante';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { HelperService } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-altaParticipante',
  templateUrl: './altaParticipante.component.html',
  styleUrls: ['./altaParticipante.component.css'],
})
export class AltaParticipanteComponent {
  constructor(private auth: SuperAdminService, private snackBar: MatSnackBar, private helpers: HelperService) { }

  errorMessage: string = '';
  visibility: boolean = true;
  fullnameFormControl = new FormControl('', [Validators.required]);
  disciplinaFormControl = new FormControl('', [Validators.required]);

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  isSuperAdmin(): boolean{
    const usr: DtUser = this.helpers.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 0){
        return true;
      }
    }
    this.helpers.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }

  public async registrar() {
    if (
      this.fullnameFormControl.value == '' ||
      this.disciplinaFormControl.value == '' ||
      this.disciplinaFormControl.value == 'vacio'
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    }
    else {
      let Disciplina = this.disciplinaFormControl.value;
      let AreaNum = 0;
      if (Disciplina == 'Natacion') AreaNum = 0;
      if (Disciplina == 'Ciclismo') AreaNum = 1;
      if (Disciplina == 'Atletismo') AreaNum = 2;

      let data: DtParticipante = {
        nombre: this.fullnameFormControl.value,
        Area: AreaNum,
      };

      this.auth.registrarParticipante(data).subscribe({
        next: (response) => {
          this.showSnackBar(
            'Se ha registrado correctamente al Participante',
            SnackBarStatus.SUCCESS
          );
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
