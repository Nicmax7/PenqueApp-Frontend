import { Component, Input, OnInit } from '@angular/core';
import { DtPenca } from 'src/app/models/Datatypes/DtPenca';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas'; 
@Component({
  selector: 'app-me-penca-feed',
  templateUrl: './me-penca-feed.component.html',
  styleUrls: ['./me-penca-feed.component.css']
})
export class MisPencaFeedComponent {

  @Input()
  pencas!: DtPenca[];

}
