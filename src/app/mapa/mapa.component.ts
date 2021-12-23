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

  map: L.Map | null = null;
  markerGroup: L.LayerGroup | null = null;

  constructor(private bibliotecaService: BibliotecaService) { }

  ngOnInit(): void {
    this.loadMap()
  }

  ngOnChanges(changes: any): void {
    this.drawPoints();
  }

  loadMap(): void {
    this.map = L.map('map').setView([40.41831, -3.70275], 6);
    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        minZoom: 1,
      }
    ).addTo(this.map);

    this.markerGroup = L.layerGroup().addTo(this.map)
    this.drawPoints();
  }

  drawPoints() {
    if (this.markerGroup) {
      this.markerGroup.clearLayers();
      this.bibliotecas.forEach((biblio: BibliotecaModel) => {
        if (this.map && this.markerGroup) {
          var marker = L.marker([biblio.latitud, biblio.longitud]).addTo(this.markerGroup);
          marker.bindPopup('<p>' + biblio.nombre + '</p><p>' + biblio.email + '</p><p>' + biblio.telefono + '</p>');
        }
      });
    }
  }
}
