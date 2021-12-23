import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import { BibliotecaModel } from '../../../../IEIBack/src/models/biblioteca.models';
import { BibliotecaService } from '../biblioteca.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})

export class MapaComponent implements OnInit, OnChanges {
  @Input() bibliotecas: BibliotecaModel[] = [];

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.bibliotecaService.getBibliotecas().subscribe((bibliotecas: any) => {
      this.bibliotecas = bibliotecas
      console.log(this.bibliotecas)
      this.loadMap()
    })
  }

  ngOnChanges(): void {
    this.bibliotecaService.getBibliotecas().subscribe((bibliotecas: any) => {
      this.bibliotecas = bibliotecas
      console.log(this.bibliotecas)
      this.loadMap()
    })
  }

  loadMap(): void {
    var map = L.map('map').setView([40.41831, -3.70275], 6);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 5,
      }
    ).addTo(map);

    this.bibliotecas.forEach((biblio : BibliotecaModel) => {
      var marker = L.marker([biblio.latitud, biblio.longitud]).addTo(map);
      marker.bindPopup('<p>' + biblio.nombre + '</p><p>' + biblio.email + '</p><p>' + biblio.telefono + '</p>');
    });

  }
}
