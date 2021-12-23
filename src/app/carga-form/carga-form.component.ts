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
  requests: any = [];

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

  cancelar() {
    this.requests.forEach((request: any) => {
      request.unsubscribe();
    });
    this.loading = false;
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
    this.mensaje = ''
    this.loading = true;
    if (this.SeleccionarTodas) {
      this.requests.push(this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.requests.push(this.cargaService.cargaCV().subscribe((msg: any) => {
            this.mensaje += msg.message + '\n'
            this.mensaje += '---------------------------------------------------------------------------------------\n'
            this.loading = false;
          }));
        }));
      }));
    } else if (this.Euskadi && this.ComunidadValenciana) {
      this.requests.push(this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCV().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    } else if (this.Euskadi && this.Catalunya) {
      this.requests.push(this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    } else if (this.ComunidadValenciana && this.Catalunya) {
      this.requests.push(this.cargaService.cargaCV().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT().subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    }
    else if (this.Euskadi) {
      this.requests.push(this.cargaService.cargaEUS().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    } else if (this.ComunidadValenciana) {
      this.requests.push(this.cargaService.cargaCV().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    } else if (this.Catalunya) {
      this.requests.push(this.cargaService.cargaCAT().subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    }
  }
}
