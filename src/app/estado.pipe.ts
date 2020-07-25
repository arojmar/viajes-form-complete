import { Pipe, PipeTransform } from '@angular/core';
import { ViajeEstado } from './models/viaje';

@Pipe({
  name: 'estado'
})
export class EstadoPipe implements PipeTransform {

  transform(value: ViajeEstado): string {
    
    switch (+value) {
      case ViajeEstado.AbiertoHastaElAmanecer:
        return 'Abierto';
      case ViajeEstado.Cancelado:
        return 'Cancelado';
      case ViajeEstado.Cerrado:
        return 'Cerrado';
      case ViajeEstado.Postpuesto:
        return 'Cancelado hasta nuevo aviso';
      default:
       return 'Estado desconocido';
    }

  }

}
