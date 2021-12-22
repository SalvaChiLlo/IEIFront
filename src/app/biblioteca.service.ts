import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { BibliotecaModel } from './../../../IEIBack/src/models/biblioteca.models';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  constructor(private http: HttpClient) {}

  public getBibliotecas() {
    return this.http.get<BibliotecaModel[]>(environment.baseBackendURL + '/api/bibliotecas')
  }
}
