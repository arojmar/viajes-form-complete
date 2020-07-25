import { Component, OnInit } from '@angular/core';
import { IdValue } from './models/id-value';
import { ViajeEstado, Viaje } from './models/viaje';
import { v4 as uuid } from 'uuid';
import { ViajesService } from './services/viajes.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  viajes: Viaje[]= [];
  estados: IdValue[] = [];
  tiposDeViajes = [];
  viaje: Viaje;

  constructor(private viajeService: ViajesService) {
  }

  ngOnInit(): void {
    this.tiposDeViajes = this.viajeService.getTiposDeViajes();
    // this.viajeService.guardar(this.cargarViaje(7));
    this.viajes = this.viajeService.getViajesList();
    this.estados = this.viajeService.getEstados();
    // setTimeout(() => {
    // this.viajes.push(this.cargarViaje(7));
    // }, 5000);
  }

  guardar(v: Viaje): void {
    this.viajeService.guardar(v);
    this.viajes = this.viajeService.getViajesList();
  }

  editarViaje(id: string): void{
    if(id){
      this.viaje = this.viajeService.getViaje(id);
    }
  }

}
