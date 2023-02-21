import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "src/app/Servicios/usuario/usuario.service";
import { FormControl, Validators } from "@angular/forms";
import { SnackBarStatus } from "src/app/models/enums/snackBarStatus";
import { AdministracionService } from "src/app/Servicios/administracion/administracion.service";
import { DtAdmin } from "src/app/models/Datatypes/DtAdmin";
import { DtUser } from "src/app/models/Datatypes/DtUser";
import { HelperService } from "src/app/helpers/helpers";

@Component({
    selector: 'app-registroAdmin',
    templateUrl: './registroAdmin.component.html',
    styleUrls: ['./registroAdmin.component.css']
})

export class RegisterAdminComponent{
    constructor(private admin: AdministracionService, private snackBar: MatSnackBar, private helpers:HelperService){}

    MIN_PASSWORD_LENGHT: number = 6;
    errorMsg: string = '';
    visibility: boolean = true;
    emailCorrecto: boolean = true;

    emailFormControl = new FormControl('',[
        Validators.required,
        Validators.email
    ]);

    passwordFormControl = new FormControl('',[
        Validators.required,
        Validators.minLength(this.MIN_PASSWORD_LENGHT)
    ]);

    fullNameFormControl = new FormControl ('',[
        Validators.required
    ])

    public toggleVisibility(){
        this.visibility = !this.visibility;
    }

    private setErrorMessage(message: string){
        this.errorMsg = message;
    }

    showSnackBar(message: string, status: SnackBarStatus) {
        this.snackBar.open(message, 'x', {
          panelClass: [`${status.valueOf()}`],
        });
    }

    esEmailValido(email: string): boolean {
        let mailValido = false;
        ('use strict');
    
        var EMAIL_REGEX =
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
        if (email.match(EMAIL_REGEX)) {
          mailValido = true;
        }
        return mailValido;
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

    public async register(){
        if(
            this.emailFormControl.value == '' ||
            this.passwordFormControl.value == '' ||
            this.fullNameFormControl.value == '' ||
            this.emailFormControl.value == null
        ){
            this.showSnackBar('Has dejado campos vacios', SnackBarStatus.WARNING);
        } else{
            if(this.esEmailValido(this.emailFormControl.value)){
                let data: DtAdmin = {
                    name: this.fullNameFormControl.value,
                    password: this.passwordFormControl.value,
                    email: this.emailFormControl.value
                };
            this.admin.registroAdmin(data).subscribe({
                next: (response) => {
                    this.showSnackBar(
                        'Te has registrado correctamente',
                        SnackBarStatus.SUCCESS
                    );
                },
                error: (err) =>{
                    this.showSnackBar(err.error, SnackBarStatus.ERROR);
                }, 
            });
            }else{
                this.showSnackBar("El email esta mal escrito", SnackBarStatus.ERROR);
            }
        }
    }
}