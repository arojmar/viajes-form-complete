import { Injectable } from '@angular/core';
import { Viaje, ViajeEstado } from '../models/viaje';
import { v4 as uuid } from 'uuid';
import { IdValue } from '../models/id-value';

@Injectable({providedIn: 'root'})
export class ViajesService {

    private viajes: Viaje[] = [];

    constructor() {
        this.viajes.push( new Viaje({
            id: uuid(),
            nombreDelViaje: 'Crucero por las Islas Griegas',
            destino: ' Grecia',
            duracion: 7,
            plazas: 30,
            estado: ViajeEstado.AbiertoHastaElAmanecer,
            tipoDelViaje: 'Crucero',
            visible: true,
            fechaDeSalida: new Date(2020, 9, 20)
        }));
     }

    getViajesList(): Viaje[] {
        return this.viajes;
    }

    getTiposDeViajes(): string[] {
        return ['Tipo 1', 'Tipo 2', 'Tipo 3'];
    }

    getEstados(): IdValue[] {
        
    const result: IdValue[] = [];

    result.push({ id: ViajeEstado.AbiertoHastaElAmanecer, value: 'Abierto hasta el amanacer' });
    result.push({ id: ViajeEstado.Cancelado, value: 'Cancelado por inclemencias' });
    result.push({ id: ViajeEstado.Cerrado, value: 'Completado el aforo' });
    result.push({ id: ViajeEstado.Postpuesto, value: 'Postpuesto hasta nuevo aviso' });

    return result;
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

    getViaje(id: string): Viaje {
        return this.viajes.find(x => x.id === id);
    }
    

}