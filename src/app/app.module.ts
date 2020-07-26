import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ViajeNgformComponent } from './viajes-edit/viaje-ngform/viaje-ngform.component';
import { ViajeReactiveFormComponent } from './viajes-edit/viaje-reactive-form/viaje-reactive-form.component';
import { ViajesListComponent } from './viajes/viajes-list/viajes-list.component';
import { ViajesService } from './services/viajes.services';
import { EstadoPipe } from './estado.pipe';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ViajesComponent } from './viajes/viajes.component';
import { ViajesEditComponent } from './viajes-edit/viajes-edit.component';
import { AppRoutingModule } from './app-routing.modules';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ViajeNgformComponent,
    ViajeReactiveFormComponent,
    ViajesListComponent,
    EstadoPipe,
    ViajesComponent,
    ViajesEditComponent,
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ViajesService,
   {provide: LOCALE_ID, useValue: 'es'}],

  bootstrap: [AppComponent]
})
export class AppModule { }
