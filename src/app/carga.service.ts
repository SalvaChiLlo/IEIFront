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

  cargaEUS(file: File | null) {
    if (file === null) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('fileKey', file);

    return this.http.post<any>(environment.baseBackendURL + '/api/populateEUS', formData);
  }

  cargaCV(file: File | null) {
    if (file === null) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('fileKey', file);

    return this.http.post<any>(environment.baseBackendURL + '/api/populateCV', formData);
  }

  cargaCAT(file: File | null) {
    if (file === null) {
      return;
    }
    const formData: FormData = new FormData();
    formData.append('fileKey', file);

    return this.http.post<any>(environment.baseBackendURL + '/api/populateCAT', formData);
  }
}
