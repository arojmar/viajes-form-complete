import { Injectable } from '@angular/core';
import { Viaje, ViajeEstado } from '../models/viaje';
import { v4 as uuid } from 'uuid';
import { IdValue } from '../models/id-value';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ViajesService {

    private viajes: Viaje[] = [];

    constructor(private http: HttpClient) {
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

    getViajesList2(): Observable<Viaje[]> {

      const url = '/assets/mocks/viajes.json';

      return this.http.get<any[]>(url)
      .pipe(map((x: any[]) => {
           return x.map(c => new Viaje(c));
        })
      );
    }

    getTiposDeViajes(): Observable<string[]> {
      const url = '/assets/mocks/tipos-de-viajes.json';
      return this.http.get<any[]>(url);
    }

    getEstados():  Observable<IdValue[]> {
      const url = '/assets/mocks/estados.json';
      return this.http.get<any[]>(url).pipe(map(x => {
        return x.map(item => ({ id: item.id || null, value: item.value || 'Sin descripcion' }));
      }));
    }
    

    // guardar2(v: Viaje): void {
    //     if(v){
    
    //       if(v.id){
    //         // buscar el viaje y actualizarlo en la lista
    //         const idx = this.viajes.findIndex(x => x.id === v.id);
    
    //         if(idx >= 0 ) {
    //           this.viajes[idx] = v;
    //           this.viajes = [...this.viajes];
    //         }
    //       } else {
    //         v.id = new uuid();
    //         this.viajes.push(v);
    //       }
    //     }
    // }

    guardar(v: Viaje): Observable<Viaje> {
      const urlPost = 'http://localhost:8080/viajes';
      const urlPut = `http://localhost:8080/viajes/${v.id}`;
      
      if (v.id) {
        // return this.http.put<any>(`./assets/mocks/viaje-${v.id}.json`, v);  
        return this.http.put<any>(urlPut, v).pipe(
          map((x: any) => {
            return new Viaje(x);
          }),
          catchError(() => {
            alert('No se ha podido modificar el viaje');
            return of(null);
          })
        );  
      } else {
        // return this.http.post<any>(`./assets/mocks/viaje-${v.id}.json`, v);
        return this.http.post<any>(urlPost, v).pipe(
          map((x: any) => {
            return new Viaje(x);
          }),
          catchError(() => {
            alert('No se ha podido añadir el viaje');
            return of(null);
          })
        );
      }

    }

    // getViajeSincrono(id: string): Viaje {
    //     return this.viajes.find(x => x.id === id);
    // }

    getViaje(id: string): Observable<Viaje> {
        
      // const url = `http://localhost:8080/viajes/${id}`;
      const url = `./assets/mocks/viaje-${id}.json`;

      const headers: HttpHeaders = new HttpHeaders({
        Authetication: 'Bearer AsvaIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk'});
      // El metodo pipe encadena operadores que realizan transformaciones
      // configuro una peticion http y aplico transformaciones
    return this.http.get<any>(url, { headers }).pipe(
        map((x: any) => {
          return new Viaje(x);
        }),
        catchError(() => {
          alert('No se ha encontrado el viaje');
          return of(null);
        })
      );
    }

    // Vas a obtener como resultado una tuberia en la que en cualquier momento
    // te puede llegar un
    // getViaje2(id: string): Observable<Viaje> {
        
    //   const url = 'http://localhost:8080/viajes';
    //   let viaje;

    //   return this.http.get<any>(url).pipe(
    //     map((x: any) => {
    //       const v = new Viaje(x);
    //       v.nombreDelViaje = 'Cambiado';
    //       return v;
    //     }),
    //     map((x: Viaje) => {
    //       x.estado = ViajeEstado.Cancelado;
    //       viaje = x;
    //       return x;
    //     })
    //   );
    // }
    
    deleteViaje(id: string): Observable<any> {
      const url = `./assets/mocks/viaje-${id}.json`;

      return this.http.delete<any>(url).pipe(catchError(() => {
        console.error('Ha ocurrido un error al eliminar el viaje');
        return of(false);
      }));
    }

}