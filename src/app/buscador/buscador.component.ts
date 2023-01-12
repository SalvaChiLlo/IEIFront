import { BibliotecaModel, ProvinciumModel } from './../../../../IEIBack/src/models/biblioteca.models';
import { CoreService } from './../services/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  localidad = "Seleccionar Localidad";
  codPostal = "Seleccionar Código Postal";
  provincia = "Seleccionar Provincia";
  tipo = "Seleccionar Tipo";
  bibliotecas: BibliotecaModel[] = [];
  codPostales: string[] = [];
  localidades: string[] = [];
  tipos: any[] = [];
  provincias: ProvinciumModel[] = [];


  constructor(private core: CoreService) { }

  ngOnInit(): void {
    this.reset();
  }

  getBibliotecas(nombreLocalidad: string, codigoPostal: string, nombreProvincia: string, tipo: string) {
    this.core.getBibliotecas(nombreLocalidad, codigoPostal, nombreProvincia, tipo).subscribe((bibliotecas: BibliotecaModel[]) => {
      this.bibliotecas = [];
      this.bibliotecas = bibliotecas.sort();
    })
  }

  getCodPostalesYLocalidades(nombreProvincia: string) {
    this.core.getCodPostalesYLocalidades(nombreProvincia).subscribe((codPostalesYLocalidades: any) => {
      this.codPostales = [];
      this.localidades = [];
      codPostalesYLocalidades.forEach((item: any) => {
        if (!this.codPostales.includes(item.codigoPostal)) {
          this.codPostales.push(item.codigoPostal);
        }
        if (!this.localidades.includes(item.LocalidadNombreLocalidad)) {
          this.localidades.push(item.LocalidadNombreLocalidad);
        }
      })

      this.codPostales = this.codPostales.sort();
      this.localidades = this.localidades.sort();
    })
  }

  getProvincias() {
    this.core.getProvincias().subscribe((provincias: ProvinciumModel[]) => {
      this.provincias = [];
      this.provincias = provincias.sort((pr1, pr2) => pr1.nombreProvincia > pr2.nombreProvincia ? 1 : -1);
    })
  }

  getTipos() {
    this.core.getTipos().subscribe((tipos: ProvinciumModel[]) => {
      this.tipos = tipos.reverse();
    })
  }

  reset() {
    this.localidad = "Seleccionar Localidad";
    this.codPostal = "Seleccionar Código Postal";
    this.provincia = "Seleccionar Provincia";
    this.tipo = "Seleccionar Tipo";
    this.getBibliotecas('', '', '', '');
    this.getCodPostalesYLocalidades('');
    this.getProvincias();
    this.getTipos();
  }

  buscar() {
    this.getBibliotecas(
      this.checkInput(this.localidad),
      this.checkInput(this.codPostal),
      this.checkInput(this.provincia),
      this.checkInput(this.tipo)
    )
  }

  checkInput(input: string): string {
    return input.includes('Seleccionar') ? '' : input;
  }
}
