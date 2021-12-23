import { CoreService } from './../services/core.service';
import { BibliotecaModel, LocalidadModel } from './../../../../IEIBack/src/models/biblioteca.models';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-infocard',
  templateUrl: './infocard.component.html',
  styleUrls: ['./infocard.component.css']
})
export class InfocardComponent implements OnChanges {
  @Input() biblioteca: BibliotecaModel = {
    nombre: '',
    tipo: '',
    direccion: '',
    codigoPostal: '',
    longitud: 0,
    latitud: 0,
    telefono: '',
    email: '',
    descripcion: '',
    LocalidadNombreLocalidad: '',
  };
  descripcion: string = '';
  provincia: string = '';

  constructor(private core: CoreService) { }


  ngOnChanges(): void {
    this.convertDescription()
    this.getLocalidad();
  }

  getLocalidad() {
    this.core.getLocalidad(this.biblioteca.LocalidadNombreLocalidad).subscribe((localidades: LocalidadModel[]) => {
      this.provincia = localidades[0].ProvinciumNombreProvincia;
    })
  }

  convertDescription() {
    if (this.biblioteca.descripcion !== '') {
      try {
        let res = '';
        const desc = JSON.parse(this.biblioteca.descripcion);

        desc.forEach((item: any) => {
          const key = Object.keys(item)[0];
          if (typeof item[key] === 'object') {
            res += `<label><strong>${key}:</strong></label>`
            res += `<ul>`
            item[key].forEach((elem: any) => {
              res += `<li>${elem}</li>`
            })
            res += `</ul>`
          } else {
            res += `<p><strong>${key}:</strong> ${item[key]}</p>`
          }
        })

        this.biblioteca.descripcion = res;
      } catch (e: any) { }
    }
  }
}

