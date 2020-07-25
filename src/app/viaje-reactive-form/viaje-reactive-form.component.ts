import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Viaje, ViajeEstado } from '../models/viaje';
import { IdValue } from '../models/id-value';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
    //  this._viaje = new Viaje(value);
    // this._viaje = Object.assign({}, value);
    // this._viaje = {...value};
    // this._viaje = value;
  }

  // get viaje(): Viaje {
  //   return this._viaje;
  // }

  @Input() estados: IdValue[] = [];

  _tiposDeViaje: string[];
  _tiposDeViajeBackup: string[];

  @Input() set tiposDeViajes(value:  string[]) {
    if(value) {
      this._tiposDeViajeBackup = value;
      this._tiposDeViaje = value;
    }
  }

  get tiposDeViajes(): string[] {
    return this._tiposDeViaje;
  }

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
    this.elFormulario.controls.nombreDelViaje.valueChanges.subscribe(x => {
      this.validarNombreDelViaje(x);
    });


    this.elFormulario.controls.destino.valueChanges.subscribe(x => {
      if(x?.toLowerCase().indexOf('madrid') >= 0) {
        this._tiposDeViaje = this._tiposDeViajeBackup.filter(v => v !== 'Tipo 2');
      } else {
        this._tiposDeViaje = this._tiposDeViajeBackup;
      }
    });
    // this.elFormulario.controls.nombreDelViaje.setValue(this.viaje.nombreDelViaje);
    // if (this.viaje) {
    //   this.elFormulario.patchValue(this.viaje);
    // }
    // this.elFormulario.controls.nombreDelViaje2.setValue(this.viaje.nombreDelViaje);
  }

  private validarNombreDelViaje(x: any): void {
    if (x?.toLowerCase().indexOf('madrid') >= 0) {
      this.elFormulario.controls.destino.patchValue('España');
      this.elFormulario.controls.tipoDelViaje.disable();
    }
    else {
      this.elFormulario.controls.tipoDelViaje.enable();
    }
  }

  guardar(formValue: any): void {
    // console.table(formValue);
    // if (!formValue.id){
    //   formValue.id = uuid();
    // }
    this.viajeChanged.emit(formValue);
    this.elFormulario.reset();
  }

  nuevoViaje(): void {
    // this._viaje = new Viaje();
    this.elFormulario.reset();
    console.table(this.elFormulario.value);
  }

  private buildFormulario(fb: FormBuilder): void {
    this.elFormulario = fb.group({
      id: [''],
      nombreDelViaje: ['', Validators.required],
      tipoDelViaje: [''],
      duracion: [0],
      destino: ['', Validators.compose([this.destinoNoValido, Validators.required])],
      plazas: [0],
      visible: [true],
      estado: ['']
    });
  }

  destinoNoValido(control: FormControl): {[s: string]: boolean}{
    if(control.value?.toLowerCase().indexOf('roma')>= 0) {
      return { destinoNoValido: true };
    }
  }
}
