import { CargaService } from './../carga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-form',
  templateUrl: './carga-form.component.html',
  styleUrls: ['./carga-form.component.css']
})
export class CargaFormComponent implements OnInit {
  SeleccionarTodas: boolean = false
  ComunidadValenciana: boolean = false
  Catalunya: boolean = false
  Euskadi: boolean = false

  constructor(private cargaService: CargaService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.Euskadi) {
      this.cargaService.cargaEUS().subscribe(_ => {
        console.log('DONE')
      });
    }

    if (this.ComunidadValenciana) {
      this.cargaService.cargaCV().subscribe(_ => {
        console.log('DONE')
      });
    }

    if (this.Catalunya) {
      this.cargaService.cargaCAT().subscribe(_ => {
        console.log('DONE')
      });
    }
  }
}
