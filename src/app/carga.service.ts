import { BibliotecaEUS } from './../../../ExtractorEUS/src/eusmodel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) { }

  cargaEUS(): Observable<BibliotecaEUS[]> {
    return this.http.get<BibliotecaEUS[]>(environment.baseBackendURL + '/api/populateEUS');
  }

  cargaCV() {
    return this.http.get<BibliotecaEUS[]>(environment.baseBackendURL + '/api/populateCV');
  }

  cargaCAT() {
    return this.http.get<BibliotecaEUS[]>(environment.baseBackendURL + '/api/populateCAT');
  }
}
