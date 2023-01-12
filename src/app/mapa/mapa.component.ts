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
    const info = document.getElementById('item_')

    if (this.markerGroup) {
      this.markerGroup.clearLayers();
      this.bibliotecas.forEach((biblio: BibliotecaModel, index) => {
        if (this.map && this.markerGroup) {
          var marker = L.marker([biblio.latitud, biblio.longitud]).addTo(this.markerGroup);
          marker.bindPopup(`
          <p style="margin: 0; margin-left: 5px;">${biblio.nombre}</p>
          <hr style="margin: 2px;"/>
          <p style="margin: 0; margin-left: 5px;">Correo: ${biblio.email}</p>
          <hr style="margin: 2px;"/>
          <p style="margin: 0; margin-left: 5px;">Telf: ${biblio.telefono}</p>
          <hr style="margin: 2px;"/>
          <a id="info_${index}" class="link-primary" style="cursor: pointer; margin-left: 5px;">Más información...</a>
          `);
          marker.on('popupopen', () => {
            const infoEl = document.getElementById('info_'+index);
            infoEl?.addEventListener('click', () => {
              const itemEl = document.getElementById('item_'+index);
              itemEl?.click();
              (itemEl?.parentElement?.parentElement?.childNodes[1] as HTMLElement).scrollIntoView({ block: 'end',  behavior: 'smooth' });
            })
          })
        }
      });
    }
  }
}
