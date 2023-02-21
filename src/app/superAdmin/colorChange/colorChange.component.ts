import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarStatus } from 'src/app/models/enums/snackBarStatus';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';

@Component({
  selector: 'app-colorChange',
  templateUrl: './colorChange.component.html',
  styleUrls: ['./colorChange.component.css'],
})
export class colorChangeComponent implements OnInit {
  color1 = 'red';
  color2 = 'blue';
  direction = 'to right';
  pencaId!: number;
  color!: string;

  id = 1;

  constructor(private penca: PencasService, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  colorChange() {
    this.pencaId = JSON.parse(localStorage.getItem('Penca')!);
    var splitted = this.color1.split("#", 2); 
    var num = 1;
    if(splitted.length == 1){
      num = 0;
    }
    this.penca
      .cambiarColorPenca(splitted[num], this.pencaId)
      .subscribe((data) => {
        this.showSnackBar('Cambio de color exitoso', SnackBarStatus.SUCCESS);
      });
  }

  showSnackBar(message: string, status: SnackBarStatus) {
    this.snackBar.open(message, 'x', {
      panelClass: [`${status.valueOf()}`],
    });
  }
}
