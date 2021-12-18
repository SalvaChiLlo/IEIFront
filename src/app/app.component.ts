import { BibliotecaModel, ProvinciumModel } from './../../../IEIBack/src/models/biblioteca.models';
import { CoreService } from './services/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bibliotecas: BibliotecaModel[] = [];
  codigosPostales: any = [];
  localidades: any = [];
  provincias: ProvinciumModel[] = [];
  tipos: any = [];


  constructor(private core: CoreService) {

  }

  ngOnInit(): void {
    this.core.getBibliotecaById(1).subscribe(response => {
      console.log('getBibliotecaById', response);
    })
    this.core.getBibliotecas('', '', 'Valencia', 'Privada').subscribe(response => {
      console.log('getBibliotecas', response);
      this.bibliotecas = response;
    })
    this.core.getCodPostalesYLocalidades('Valencia').subscribe(response => {
      console.log('getCodPostalesYLocalidades', response);
      this.codigosPostales = [];
      this.localidades = [];
      response.forEach((item: any) => {
        this.codigosPostales.push(item.codigoPostal)
        this.localidades.push(item.LocalidadNombreLocalidad)
      });
    })
    this.core.getProvincias().subscribe(response => {
      console.log('getProvincias', response);
      this.provincias = response;
    })
    this.core.getTipos().subscribe(response => {
      console.log('getTipos', response);
      this.tipos = response;
    })
  }
}
