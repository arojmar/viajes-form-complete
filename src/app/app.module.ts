import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViajeNgformComponent } from './viaje-ngform/viaje-ngform.component';
import { ViajeReactiveFormComponent } from './viaje-reactive-form/viaje-reactive-form.component';
import { ViajesListComponent } from './viajes-list/viajes-list.component';
import { ViajesService } from './services/viajes.services';
import { EstadoPipe } from './estado.pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ViajeNgformComponent,
    ViajeReactiveFormComponent,
    ViajesListComponent,
    EstadoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [ViajesService,
   {provide: LOCALE_ID, useValue: 'es'}],

  bootstrap: [AppComponent]
})
export class AppModule { }
