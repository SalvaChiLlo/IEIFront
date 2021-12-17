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
  mensaje = '';
  loading = false;

  constructor(private cargaService: CargaService) { }

  ngOnInit(): void {
  }

  check() {
    if (!this.Catalunya || !this.ComunidadValenciana || !this.Euskadi) {
      this.SeleccionarTodas = false;
    }

    if (this.Catalunya && this.ComunidadValenciana && this.Euskadi) {
      this.SeleccionarTodas = true;
    }
  }

  checkTodas() {
    if (this.SeleccionarTodas) {
      this.Catalunya = true;
      this.ComunidadValenciana = true;
      this.Euskadi = true;
    } else {
      this.Catalunya = false;
      this.ComunidadValenciana = false;
      this.Euskadi = false;
    }
  }

  submit() {
    this.mensaje = '---------------------------------------------------------------------------------------\n'
    this.loading = true;
    if (this.SeleccionarTodas) {
      this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.cargaService.cargaCV().subscribe((msg: any) => {
            this.mensaje += msg.message + '\n'
            this.mensaje += '---------------------------------------------------------------------------------------\n'
            this.loading = false;
          });
        });
      });
    } else if (this.Euskadi && this.ComunidadValenciana) {
      this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.cargaService.cargaCV().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        });
      });
    } else if (this.Euskadi && this.Catalunya) {
      this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        });
      });
    } else if (this.ComunidadValenciana && this.Catalunya) {
      this.cargaService.cargaCV().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        });
      });
    }
    else if (this.Euskadi) {
      this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      });
    } else if (this.ComunidadValenciana) {
      this.cargaService.cargaCV().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      });
    } else if (this.Catalunya) {
      this.cargaService.cargaCAT().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      });
    }
  }
}
