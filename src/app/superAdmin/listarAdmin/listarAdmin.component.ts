import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HelperService } from "src/app/helpers/helpers";
import { SuperAdminService } from "src/app/Servicios/superadmin/superadmin.service";
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { DtAdmin } from "src/app/models/Datatypes/DtAdmin";
import { DtUser } from "src/app/models/Datatypes/DtUser";
import { PencasService } from "src/app/Servicios/pencas_compartidas/pencas.service";
import { DtPenca } from "src/app/models/Datatypes/DtPenca";
import { AdministracionService } from "src/app/Servicios/administracion/administracion.service";
import { async } from "@firebase/util";


@Component({
    selector: 'app-listarAdmin',
    templateUrl: './listarAdmin.component.html',
    styleUrls: ['./listarAdmin.component.css']
})

export class listarAdminComponent implements OnInit{

    displayedColumns: string [] = ['Nombre', 'Email', 'Asignar Penca'];
    pageNumber: number = 0;
    PAGE_RECORDS: number = 20;
    totalRows = 0;
    pageSize = 5;
    pageSizeOptions: number[] = [5, 10, 25, 100];
    dtAdmin!: DtAdmin[];
    usuario!: DtUser;
    penca!: number;
    dtPenca!: DtPenca;

    constructor(
        private snackBar: MatSnackBar, 
        private superAdminService: SuperAdminService,
        private helpers: HelperService,
        private pencaService: PencasService,
        private adminService: AdministracionService
        ){}

    ngOnInit(){
        this.superAdminService.getAdmin().subscribe((data) => {
            this.dtAdmin = data;
        }) 
        if(this.helpers.isAuthenticated()){
            this.penca = JSON.parse(localStorage.getItem('Penca')!);
            if(this.penca != undefined){
                this.pencaService.getInfoPenca(this.penca).subscribe(data => {
                    this.dtPenca = data;
                })
            }
        } 
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

    asignarPencaAdmin(id: number){
        this.penca = JSON.parse(localStorage.getItem('Penca')!);
        if(this.penca != undefined){
            this.adminService.agregarPencaAdmin(id, this.penca).subscribe({
                next: async (response) => {
                    this.showSnackBar('Se ha asignado el administrador correctamente a la penca', SnackBarStatus.SUCCESS);
                    this.helpers.redirectTo('SuperAdmin/pencaEquipoSuperAdmin');
                },
                error: (err) => {
                    this.showSnackBar(err.error, SnackBarStatus.ERROR);
                }
            })
        }
        
    }

    showSnackBar(message: string, status: SnackBarStatus) {
        this.snackBar.open(message, 'x', {
          panelClass: [`${status.valueOf()}`],
        });
    }
}