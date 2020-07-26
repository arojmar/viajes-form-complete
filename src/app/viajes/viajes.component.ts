import { Component, OnInit } from '@angular/core';
import { Viaje } from '../models/viaje';
import { ViajesService } from '../services/viajes.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.scss'],
})
export class ViajesComponent implements OnInit {

  loading = false;
  viajes: Viaje[] = [];

  constructor(private viajeService: ViajesService, private router: Router) {}

  ngOnInit(): void {
    this.cargarViajes();
  }

  editarViaje(id: string): void {
    if (id) {
      this.router.navigate(['/viajes-edit', id]);
      // this.viajeService.getViaje(id).subscribe((x) => {
      //   this.viaje = x;
      // });
    }
  }

  deleteViaje(id: string): void {
    if (id) {
      this.viajeService.deleteViaje(id).subscribe((x) => {
        if (x) {
          this.cargarViajes();
          alert('El viaje se ha borrado');
        } else {
          alert('El viaje no se ha podido eliminar');
        }
      });
    }
  }

  cargarViajes(): void {
    this.loading = true;
    this.viajeService.getViajesList().subscribe((x) => {
      if (x) {
        this.viajes = x;
      }
      this.loading = false;
    });
  }
}
