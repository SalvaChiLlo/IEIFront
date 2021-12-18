import { BibliotecaModel, ProvinciumModel } from './../../../../IEIBack/src/models/biblioteca.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getBibliotecas(nombreLocalidad: string, codigoPostal: string, nombreProvincia: string, tipo: string): Observable<BibliotecaModel[]> {
    return this.http.get<BibliotecaModel[]>(environment.baseBackendURL + `/api/bibliotecas?nombreLocalidad=${nombreLocalidad}&codigoPostal=${codigoPostal}&nombreProvincia=${nombreProvincia}&tipo=${tipo}`);
  }

  getBibliotecaById(id: number): Observable<BibliotecaModel> {
    return this.http.get<BibliotecaModel>(environment.baseBackendURL + `/api/bibliotecas/${id}`);
  }

  getCodPostalesYLocalidades(nombreProvincia: string): Observable<any> {
    return this.http.get(environment.baseBackendURL + `/api/bibliotecas/cp?nombreProvincia=${nombreProvincia}`);
  }

  getProvincias(): Observable<ProvinciumModel[]> {
    return this.http.get<ProvinciumModel[]>(environment.baseBackendURL + '/api/provincias');
  }

  getTipos(): Observable<any> {
    return this.http.get(environment.baseBackendURL + '/api/bibliotecas/tipos');
  }
}
