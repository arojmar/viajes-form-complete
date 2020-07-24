import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Viaje, ViajeEstado } from '../models/viaje';
import { IdValue } from '../models/id-value';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viaje-reactive-form',
  templateUrl: './viaje-reactive-form.component.html',
  styleUrls: ['./viaje-reactive-form.component.scss']
})
export class ViajeReactiveFormComponent implements OnInit, OnChanges {

  //@Input() viaje: Viaje;

  _viaje: Viaje;
  @Input() set viaje(value: Viaje) {
    if (value) {
      this.elFormulario.patchValue(value);
    }
    this._viaje = value;
  }

  // get viaje(): Viaje {
  //   return this._viaje;
  // }

  @Input() estados: IdValue[] = [];
  @Input() tiposDeViajes: string[] = [];
  @Input() disabled = false;

  @Output() viajeChanged = new EventEmitter<Viaje>(false);


  elFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildFormulario(fb);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.viaje?.currentValue) {
    //   this.elFormulario.patchValue(changes.viaje.currentValue);
    //   console.log('changes: SimpleChanges');
    // }
  }

  ngOnInit(): void {
    // this.elFormulario.controls.nombreDelViaje.setValue(this.viaje.nombreDelViaje);

    // if (this.viaje) {
    //   this.elFormulario.patchValue(this.viaje);
    // }
    // this.elFormulario.controls.nombreDelViaje2.setValue(this.viaje.nombreDelViaje);
  }

  guardar(formValue: any): void {
    this.viajeChanged.emit(formValue);
  }

  private buildFormulario(fb: FormBuilder): void {
    this.elFormulario = fb.group({
      nombreDelViaje: ['', Validators.required],
      tipoDelViaje: [''],
      duracion: [0],
      destino: [''],
      plazas: [0],
      visible: [true],
      estado: ['']
    });
  }
}
