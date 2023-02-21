import { Component, Input, OnInit } from '@angular/core';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas'; 
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { aceptarPencaComponent } from '../../componentes/aceptar-penca/aceptarPenca.component';

@Component({
  selector: 'app-penca-feed-item',
  templateUrl: './penca-feed-item.component.html',
  styleUrls: ['./penca-feed-item.component.css']
})
export class PencaFeedItemComponent implements OnInit {
  

  @Input()
  pencasCompartida!: DtPencasCompartida;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  Numero(tipo:Tipo_Deporte){
    return Number(tipo);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, idPenca:number): void {
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    this.dialog.open(aceptarPencaComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
