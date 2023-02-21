import { Component, Input } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DtJuego } from 'src/app/models/Datatypes/DtJuego';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';


@Component({
  selector: 'app-aceptarPenca',
  templateUrl: './aceptarPenca.component.html',
  styleUrls: ['./aceptarPenca.component.css']
})
export class aceptarPencaComponent {
  constructor(public dialogRef: MatDialogRef<aceptarPencaComponent>,private router: Router,private snackBar: MatSnackBar, private pencaService:PencasService) {}

  user!: DtUser
  idUsuario!: number
  idPenca!:number

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }


  unirmeALaPenca(){
    this.user = JSON.parse(localStorage.getItem('authUser')!);
    this.idPenca = JSON.parse(localStorage.getItem('Penca')!);
    if(this.user == undefined || this.idPenca == undefined){
      this.showSnackBar("Algun dato es nulo", SnackBarStatus.ERROR);
    }
    else{
      if(this.user.id != undefined){
        let data: DtJuego = {
          idPenca: this.idPenca,
          idUsuario: this.user.id
        };
        this.pencaService.unirmeaPenca(data).subscribe({
          next: () => {
            this.redirectTo('/userIndex');
            this.showSnackBar(
              'Te has unido a la penca correctamente',
              SnackBarStatus.SUCCESS  
            );
            
          },
          error: (err) => {
            this.showSnackBar(err.error, SnackBarStatus.ERROR);
          },
        });
      }
      else{
        this.showSnackBar("Problemas con el usuario.", SnackBarStatus.ERROR);
      }

      
    }
  }}
