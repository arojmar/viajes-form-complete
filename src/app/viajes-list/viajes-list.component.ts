import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Viaje } from '../models/viaje';


@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  @Input() viajes: Viaje[] = [];
  @Output() viajeClicked = new EventEmitter<string>(false);
  constructor() { }

  ngOnInit(): void {
  }
  
  editarClick(item: Viaje): void {
    this.viajeClicked.emit(item.id);
  }


}
