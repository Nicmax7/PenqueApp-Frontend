import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { Router } from '@angular/router';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { HelperService } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-altaLigaIndividual',
  templateUrl: './altaLigaIndividual.component.html',
  styleUrls: ['./altaLigaIndividual.component.css'],
})
export class AltaLigaIndividualComponent {
  constructor(private auth: SuperAdminService, private snackBar: MatSnackBar, private router: Router, private helpers: HelperService) {}

  errorMessage: string = '';
  visibility: boolean = true;
  nameFormControl = new FormControl('', [Validators.required]);
  topeFormControl = new FormControl(new Number(), [Validators.required]);
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

  public async registrar() 
  {
    if (this.nameFormControl.value == '' || this.topeFormControl.value?.valueOf == null)
    {
        this.showSnackBar('No has ingresado el nombre de la liga individual', SnackBarStatus.WARNING);
    }
    else if(this.topeFormControl.value.valueOf() < 3){
        this.showSnackBar('La liga no puede tener menos de 3 competencias.', SnackBarStatus.WARNING);
    }
    else if(this.disciplinaFormControl.value == '' || this.disciplinaFormControl.value == "vacio"){
    }
    else {
      let Disciplina = this.disciplinaFormControl.value;
      let AreaNum = 0;
      if (Disciplina == 'Natacion') AreaNum = 0;
      if (Disciplina == 'Ciclismo') AreaNum = 1;
      if (Disciplina == 'Atletismo') AreaNum = 2;

      let data: DtLigaIndividual = {
      nombre: this.nameFormControl.value,
      topeCompetencias: this.topeFormControl.value.valueOf(),
      tipoArea: AreaNum
      };
      this.auth.registrarLigaIndividual(data).subscribe({
        next: (response) => {
          this.showSnackBar(
            'La liga individual se ha registrado correctamente',
            SnackBarStatus.SUCCESS
          );
          this.router.navigateByUrl('superAdminIndex');
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