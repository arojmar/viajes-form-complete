import { Component, OnInit } from '@angular/core';
import { ViajesService } from '../services/viajes.services';
import { Viaje } from '../models/viaje';
import { IdValue } from '../models/id-value';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viajes-edit',
  templateUrl: './viajes-edit.component.html',
  styleUrls: ['./viajes-edit.component.scss']
})
export class ViajesEditComponent implements OnInit {

  viaje: Viaje;
  estados: IdValue[] = [];
  tiposDeViajes: string[];

  viajeId: any;
  
  constructor(private viajeService: ViajesService, router: ActivatedRoute) {
    router.params.subscribe(params => {
      this.viajeId = params?.id || null;
    });
   }

  ngOnInit(): void {
    this.viajeService.getEstados().subscribe(x => {
      if (x) {
        this.estados = x;
      }
    });
    this.viajeService.getTiposDeViajes().subscribe(x => {
      if (x) {
        this.tiposDeViajes = x;       
      }
    });

    if(this.viajeId !== null){
      this.viajeService.getViaje(this.viajeId).subscribe(x => {
        if (x) {
          this.viaje = x;
        }
      });
    } else {
      this.viaje = new Viaje();
    }
  }

  guardar(v: Viaje): void {
    this.viajeService.guardar(v).subscribe(x => {
      if (x) {
        this.viaje = x;
      }
    });
  }

}
