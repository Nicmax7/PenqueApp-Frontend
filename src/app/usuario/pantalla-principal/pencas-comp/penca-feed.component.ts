import { Component, Input, OnInit } from '@angular/core';
import { DtPencasCompartida } from 'src/app/models/Datatypes/DtPencasCompartidas'; 
@Component({
  selector: 'app-penca-feed',
  templateUrl: './penca-feed.component.html',
  styleUrls: ['./penca-feed.component.css']
})
export class PencaFeedComponent {

  @Input()
  pencasCompartida!: DtPencasCompartida[];

}
