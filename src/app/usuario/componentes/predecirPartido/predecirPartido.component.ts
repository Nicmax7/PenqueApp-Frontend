import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DtJuego } from 'src/app/models/Datatypes/DtJuego';
import { DtPredicciones } from 'src/app/models/Datatypes/DtPredicciones';
import { DtUser } from 'src/app/models/Datatypes/DtUser';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { UserService } from 'src/app/Servicios/usuario/usuario.service';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';


@Component({
  selector: 'app-aceptarPenca',
  templateUrl: './predecirPartido.component.html',
  styleUrls: ['./predecirPartido.component.css']
})
export class predecirPartidoComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<predecirPartidoComponent>,private router: Router,private snackBar: MatSnackBar, private userS:UserService) {}

  ngOnInit() { 
    this.deporte = JSON.parse(localStorage.getItem('DeportePenca')!);
    console.log(this.deporte)
  }

  user!: DtUser
  idPenca!:number
  idPartido!: number
  selected = "option0";
  prediccion!: number
  deporte!: number

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 predecirUnPartido(){

  if(this.selected == "option0"){
    this.showSnackBar('Tu predicción no es valida', SnackBarStatus.WARNING);
  }
  else{
    this.user = JSON.parse(localStorage.getItem('authUser')!);
    this.idPartido = JSON.parse(localStorage.getItem('Partido')!);
    this.idPenca = JSON.parse(localStorage.getItem('Penca')!);

    if(this.selected == "option1"){
      this.prediccion = 0;
    }
    if(this.selected == "option2"){
      this.prediccion = 1;
    }
    if(this.selected == "option3"){
      this.prediccion = 2;
    }

    if(this.user.id != undefined){
      let data: DtPredicciones = {
        idPartido: this.idPartido,
        idUsuario: this.user.id,
        idPenca: this.idPenca,
        tipo: this.prediccion
      }

      this.userS.predecirUnPartido(data).subscribe({
        next: async (response) => {
          this.showSnackBar('Predicción guardada con exito', SnackBarStatus.SUCCESS);
          this.redirectTo('partido');
        },
        error: (err) => {
          this.showSnackBar(err.error, SnackBarStatus.ERROR);
        },
      });
    }
    

    
  }
 }

}
