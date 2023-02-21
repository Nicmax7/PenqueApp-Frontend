import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { HelperService } from "src/app/helpers/helpers";
import { DtUser } from "src/app/models/Datatypes/DtUser";
import { UserService } from "src/app/Servicios/usuario/usuario.service";
import { EmpresaService} from 'src/app/Servicios/empresa/empresa.service';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';

@Component({
    selector: 'app-aceptarRechazarUsuario',
    templateUrl: './aceptarRechazarUsuario.component.html',
    styleUrls: ['./aceptarRechazarUsuario.component.css']
})

export class AceptarRechazarUsuarioComponent implements OnInit{

    displayedColumns: string [] = ['Nombre', 'Email', 'Aceptar', 'Rechazar'];
    pageNumber: number = 0;
    PAGE_RECORDS: number = 20;
    totalRows = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    usuarioData!: DtUser[];
    usuario!: DtUser;
    empresa!: number;
    penca!: number;

    constructor(
        private router: Router, 
        private snackBar: MatSnackBar, 
        private helpers: HelperService,
        private empresaService: EmpresaService
        ){}

    ngOnInit() {
        if(this.helpers.isAuthenticated()){
            this.usuario = JSON.parse(localStorage.getItem('authUser')!);
            this.penca = JSON.parse(localStorage.getItem('Penca')!);
            if(this.usuario.id != undefined && this.penca != undefined){
                this.empresaService.getUsuariosAConfirmar(this.usuario.id, this.penca).subscribe((data) => {
                    this.usuarioData = data;
                })
            }
        }
    }

    showSnackBar(message: string, status: SnackBarStatus) {
        this.snackBar.open(message, 'x', {
          panelClass: [`${status.valueOf()}`],
        });
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

    aceptarRechazarUsuario(id: number, isAccepted: boolean){
        this.usuario = JSON.parse(localStorage.getItem('authUser')!);
        this.penca = JSON.parse(localStorage.getItem('Penca')!);
            if(this.usuario.id != undefined && this.penca != undefined){
                this.empresaService.aceptarORechazar(id, this.usuario.id, this.penca, isAccepted).subscribe({
                    next: async (response) => {
                        if(isAccepted){
                            this.showSnackBar(
                                'Has aceptado al usuario satisfactoriamente',
                                SnackBarStatus.SUCCESS
                              );
                        }else{
                            this.showSnackBar(
                                'Has rechazado al usuario',
                                SnackBarStatus.SUCCESS
                              );
                        }
                        this.helpers.redirectTo('/aceptarRechazarUsuario');   
                      },
                      error: (err) => {
                        this.showSnackBar(err.error, SnackBarStatus.ERROR);
                      },
                })
            }

    }

    

}