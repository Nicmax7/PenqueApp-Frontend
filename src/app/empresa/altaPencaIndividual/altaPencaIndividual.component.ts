import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DtCompetencia } from 'src/app/models/Datatypes/DtCompetencia';
import { SuperAdminService } from 'src/app/Servicios/superadmin/superadmin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { Tipo_Area } from 'src/app/models/enums/Tipo_Area';
import { LigasService } from 'src/app/Servicios/ligas/ligas.service';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { DtCrearPencasCompartida } from 'src/app/models/Datatypes/DtCrearPencaCompartida';
import { HelperService } from 'src/app/helpers/helpers';
import { DtLigaIndividual } from 'src/app/models/Datatypes/DtLigaIndividual';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { DtPencaEmpresa } from 'src/app/models/Datatypes/DtPencaEmpresa';
import { EmpresaService } from 'src/app/Servicios/empresa/empresa.service';
import { DtUser } from 'src/app/models/Datatypes/DtUser';

@Component({
  selector: 'app-altaPencaIndividualEmpresa',
  templateUrl: './altaPencaIndividual.component.html',
  styleUrls: ['./altaPencaIndividual.component.css'],
})
export class AltaPencaIndividualEmpresaComponent implements OnInit {
  constructor(private emp: EmpresaService,private helper:HelperService, private snackBar: MatSnackBar, private ligaS: LigasService) {}

  ngOnInit() {
    this.cargarLigas();
  }

  errorMessage: string = '';
  visibility: boolean = true;
  fullnameFormControl = new FormControl('', [Validators.required]);
  entradaFormControl = new FormControl(new Number(), [Validators.required]);
  premioFormControl = new FormControl(new Number(), [Validators.required]);
  ligas!: DtLigaIndividual[];
  seleccion!: string | undefined;
  plan!: string | undefined;
  empresa!: DtUser
  numPlan!: number

  public toggleVisibility() {
    this.visibility = !this.visibility;
  }

  private setErrorMessage(message: string) {
    this.errorMessage = message;
  }

  cargarLigas() {
    this.ligaS.getLigasIndividualesActivas().subscribe({
      next: async (response) => {
        this.ligas = response;
      },
      error: (err) => {},
    });
  }

  public async altaPencaIndividual() {
    if (
      this.fullnameFormControl.value == '' ||
      this.fullnameFormControl.value == null ||
      this.premioFormControl.value == null ||
      this.premioFormControl.value == null ||
      this.entradaFormControl.value == null ||
      this.entradaFormControl.value == 0 ||
      this.seleccion == null ||
      this.seleccion == 'vacio' ||
      this.plan == null ||
      this.plan == 'vacio' 
    ) {
      this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
    } 
    else {
      if (this.entradaFormControl.value.valueOf() < 0) this.showSnackBar('No puedes ingresar negativos en el precio de entrada', SnackBarStatus.WARNING);
      else{
        
        this.empresa = this.helper.getLocalStorage();
        if(this.empresa.id != undefined) {
          let data: DtPencaEmpresa = {
            nombre: this.fullnameFormControl.value,
            tipoDeporte: 4,
            entrada: Number(this.entradaFormControl.value),
            idLiga: Number(this.seleccion),
            tipoPlan: this.numPlan,
            idEmpresa: this.empresa.id,
            premioFinal: Number(this.premioFormControl.value),
          }
         
  
          this.emp.altaPencaEmpresaIndividual(data).subscribe({
            next: (response) => {
              this.showSnackBar(
                'Se ha registrado correctamente la Penca de tipo Individual',
                SnackBarStatus.SUCCESS
              );
              this.helper.redirectTo('empresaIndex');
            },
            error: (err) => {
              this.showSnackBar(err.error, SnackBarStatus.ERROR);
            },
          });
        }               
        
      }
    }
  }
  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  mensajeInfo(){
    if(this.plan == "Premium"){
      this.showSnackBar("El plan Premium te costará $1000 que se debitarán de tu billetera", SnackBarStatus.INFO);
      this.numPlan = 1;
    }
   else if(this.plan == "Basico"){
      this.showSnackBar("El plan Basico es 'Gratis', pero solo podras tener 8 usuarios en esta penca", SnackBarStatus.INFO);
      this.numPlan = 0;
    }

    else{
      this.plan = '';
    }
  }
  isEmpresa(): boolean{
    const usr: DtUser = this.helper.getLocalStorage();
    if( usr!= null ){
      if(Number(usr.tipo_rol) == 3){
        return true;
      }
    }
    this.helper.redirectTo('access-denied');
    return false;
  }

  getLocalStorage(): DtUser {
    return JSON.parse(localStorage.getItem('authUser')!);
  }
}
