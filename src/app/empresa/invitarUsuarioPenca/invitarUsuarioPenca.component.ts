import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HelperService } from "src/app/helpers/helpers";
import { SnackBarStatus } from "src/app/models/enums/snackBarStatus";
import { EmpresaService } from "src/app/Servicios/empresa/empresa.service";
import { DtInvitacion } from 'src/app/models/Datatypes/DtInvitacion'
import { PencasService } from "src/app/Servicios/pencas_compartidas/pencas.service";
import { UserService } from "src/app/Servicios/usuario/usuario.service";
import { DtUser } from "src/app/models/Datatypes/DtUser";
import { getAdditionalUserInfo } from "@angular/fire/auth";

@Component({
    selector: 'app-invitarUsuarioAPenca',
    templateUrl: './invitarUsuarioPenca.component.html',
    styleUrls: ['./invitarUsuarioPenca.component.css']
})

export class InvitarUsuarioAPencaComponent{
    
    constructor(private emp: EmpresaService, private snackBar: MatSnackBar, private pencaService: PencasService, private helper: HelperService){
    }

    errorMessage: string = '';
    emailSended: boolean = false;
    user!: DtUser;
    emailFormControl = new FormControl ('', [Validators.required, Validators.email]);
    empresa!: number;
    penca!: number;

    private setErrorMessage(message: string){
        this.errorMessage = message;
    }

    showSnackBar(message: string, status: SnackBarStatus){
        this.snackBar.open(message, 'x', {
            panelClass: [`${status.valueOf()}`]
        })
    }

    esEmailValido(email: string): boolean{
        let mailValido = false;
        ('use strict');
    
        var EMAIL_REGEX =
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        
            if (email.match(EMAIL_REGEX)) {
              mailValido = true;
            }
            return mailValido;
      }
    
    public async enviarInvitacion(){
        if(this.emailFormControl.value == '' || this.emailFormControl.value == null){
            this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
        }else{
            this.penca = JSON.parse(localStorage.getItem('Penca')!);
            this.user = JSON.parse(localStorage.getItem('authUser')!);
            
            if(this.penca!= undefined){
                this.pencaService.getInfoPenca(this.penca)
            }
            if((this.esEmailValido(this.emailFormControl.value)) && this.user.id != undefined){
                let data: DtInvitacion = {
                    idEmpresa: this.user.id,
                    idPenca: this.penca,
                    emailUsr: this.emailFormControl.value
                }
                this.emp.invitarUsuarioAPenca(data).subscribe({
                    next: (response) => {
                        this.showSnackBar('El mail se ha enviado correctamente', SnackBarStatus.SUCCESS);
                        this.helper.redirectTo('/empresaIndex');
                    },
                    error: (err) => {
                        this.showSnackBar(err.error, SnackBarStatus.ERROR);
                    }
                })
            }else{
                this.showSnackBar('El mail esta mal escrito', SnackBarStatus.ERROR);
            }
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