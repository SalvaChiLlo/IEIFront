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

  cargaEUS(): Observable<any> {
    return this.http.get<any>(environment.baseBackendURL + '/api/populateEUS');
  }

  cargaCV() {
    return this.http.get<any>(environment.baseBackendURL + '/api/populateCV');
  }

  cargaCAT() {
    return this.http.get<any>(environment.baseBackendURL + '/api/populateCAT');
  }
}
