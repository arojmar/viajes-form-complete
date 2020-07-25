import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViajeNgformComponent } from './viaje-ngform/viaje-ngform.component';
import { ViajeReactiveFormComponent } from './viaje-reactive-form/viaje-reactive-form.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ViajeNgformComponent,
    ViajeReactiveFormComponent,
    ViajesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
