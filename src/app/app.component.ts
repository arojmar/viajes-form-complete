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
    this.viajeService.getTiposDeViajes().subscribe(x => {
      if (x) {
        this.tiposDeViajes = x;
      }
    });
    // this.viajeService.guardar(this.cargarViaje(7));
    this.viajeService.getEstados().subscribe(x => {
      if (x) {
        this.estados = x;
      }
    });
    this.cargarViajes();
    // setTimeout(() => {
    // this.viajes.push(this.cargarViaje(7));
    // }, 5000);
  }

  guardar(v: Viaje): void {
    this.viajeService.guardar(v).subscribe(x => {
      if (x) {
        this.viaje = x;
        this.cargarViajes();
      }
    });
  }

  editarViaje(id: string): void{
    if(id){
      this.viajeService.getViaje(id).subscribe(x => {
        this.viaje = x;
      });
    }
  }

  deleteViaje(id: string): void{
    if (id) {
      this.viajeService.deleteViaje(id).subscribe(x => {
        if(x){
          alert('El viaje se ha borrado');
        } else {
          alert('El viaje no se ha podido eliminar');
        }
      });
    }
  }

  private cargarViajes(): void {
    this.viajeService.getViajesList2().subscribe(x => {
      if (x) {
        this.viajes = x;
      }
    });
  }
}
