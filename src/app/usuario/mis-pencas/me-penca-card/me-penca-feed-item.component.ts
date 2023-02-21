import { Component, Input, OnInit } from '@angular/core';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas';
import { Tipo_Deporte } from 'src/app/models/enums/Tipo_Deporte';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { aceptarPencaComponent } from '../../componentes/aceptar-penca/aceptarPenca.component';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { PencasService } from 'src/app/Servicios/pencas_compartidas/pencas.service';
import { HelperService } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-me-penca-feed-item',
  templateUrl: './me-penca-feed-item.component.html',
  styleUrls: ['./me-penca-feed-item.component.css'],
})
export class MisPencaFeedItemComponent implements OnInit {
  @Input()
  pencas!: DtPenca;

  constructor(
    public dialog: MatDialog,
    private pencasService: PencasService,
    private helper: HelperService
  ) {}

  ngOnInit(): void {}

  Numero(tipo: Tipo_Deporte) {
    return Number(tipo);
  }

  verPenca(idPenca: number, tipo: Tipo_Deporte, color:string | undefined) {
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    localStorage.setItem('colorPenca', JSON.stringify('#' + color));
    localStorage.setItem('DeportePenca', JSON.stringify(tipo));
    if (this.Numero(tipo) != 4) {
      this.pencasService.getIdLIga(idPenca).subscribe((data) => {
        localStorage.setItem('Liga', JSON.stringify(data));
        this.helper.redirectTo('me/pencasEquipo');
        setTimeout(() => {});
      });
    }
    else{
      this.pencasService.getIdLIga(idPenca).subscribe((data) => {
        localStorage.setItem('Liga', JSON.stringify(data));
        this.helper.redirectTo('me/pencasIndividual');
        setTimeout(() => {});
      });
    }
  }

  verForo(idPenca: number){
    localStorage.setItem('Penca', JSON.stringify(idPenca));
    this.helper.redirectTo('Usuario/Penca/Foro');
  }
}
