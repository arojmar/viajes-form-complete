import { Component, OnInit } from '@angular/core';
import { IdValue } from './models/id-value';
import { ViajeEstado, Viaje } from './models/viaje';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  viajes: Viaje[]= [];
  estados: IdValue[] = [];
  tiposDeViajes = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  viaje: Viaje;

  constructor() {
    this.estados = this.cargarEstados();
  }

  ngOnInit(): void {
    // setTimeout(() => {
    this.viajes.push(this.cargarViaje(7));
    // }, 5000);
  }

  guardar(v: Viaje): void {
    if(v){

      if(v.id){
        // buscar el viaje y actualizarlo en la lista
        const idx = this.viajes.findIndex(x => x.id === v.id);

        if(idx >= 0 ) {
          this.viajes[idx] = v;
          this.viajes = [...this.viajes];
        }
      } else {
        v.id = new uuid();
        this.viajes.push(v);
      }
    }
  }

  editarViaje(v: Viaje): void{
    if(v){
      v.plazas++;
      this.viaje = v;
    }
  }

  private cargarEstados(): IdValue[] {

    const result: IdValue[] = [];

    result.push({ id: ViajeEstado.AbiertoHastaElAmanecer, value: 'Abierto hasta el amanacer' });
    result.push({ id: ViajeEstado.Cancelado, value: 'Cancelado por inclemencias' });
    result.push({ id: ViajeEstado.Cerrado, value: 'Completado el aforo' });
    result.push({ id: ViajeEstado.Postpuesto, value: 'Postpuesto hasta nuevo aviso' });

    return result;
  }

  private cargarViaje(id?: number): Viaje {

    // imaginad que llamamos a la bbdd y pedido el viaje con id = 7
    const viaje = new Viaje({
      id: uuid(),
      nombreDelViaje: 'Crucero por las Islas Griegas',
      destino: ' Grecia',
      duracion: 7,
      plazas: 30,
      estado: ViajeEstado.AbiertoHastaElAmanecer,
      tipoDelViaje: 'Crucero',
      visible: true
    });

    return viaje;
  }
}
