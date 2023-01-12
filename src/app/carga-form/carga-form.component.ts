import { CoreService } from './../services/core.service';
import { CargaService } from './../carga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga-form',
  templateUrl: './carga-form.component.html',
  styleUrls: ['./carga-form.component.css']
})
export class CargaFormComponent implements OnInit {
  SeleccionarTodas: boolean = false
  ComunidadValenciana: File | null = null
  Catalunya: File | null = null
  Euskadi: File | null = null
  mensaje = '';
  loading = false;
  requests: any = [];

  constructor(private cargaService: CargaService, private core: CoreService) { }

  ngOnInit(): void {
  }

  cancelar() {
    this.requests.forEach((request: any) => {
      request.unsubscribe();
    });
    this.loading = false;
  }
  checkTodas() {
    if (this.ComunidadValenciana !== null && this.Catalunya !== null && this.Euskadi !== null) {
      this.SeleccionarTodas = true;
    }
  }

  onFileSelectedComunidadValenciana(event: any) {
    if (event.target.files.length > 0) {
      this.ComunidadValenciana = event.target.files.item(0);
    } else {
      this.ComunidadValenciana = null;
    }
    this.checkTodas();
  }

  onFileSelectedCatalunya(event: any) {
    if (event.target.files.length > 0) {
      this.Catalunya = event.target.files.item(0);
    } else {
      this.Catalunya = null;
    }
    this.checkTodas();
  }
  onFileSelectedEuskadi(event: any) {
    if (event.target.files.length > 0) {
      this.Euskadi = event.target.files.item(0);
    } else {
      this.Euskadi = null;
    }
    this.checkTodas();
  }

  submit() {
    this.mensaje = ''
    this.loading = true;
    if (this.SeleccionarTodas) {
      this.requests.push(this.cargaService.cargaEUS(this.Euskadi)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT(this.Catalunya)?.subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.requests.push(this.cargaService.cargaCV(this.ComunidadValenciana)?.subscribe((msg: any) => {
            this.mensaje += msg.message + '\n'
            this.mensaje += '---------------------------------------------------------------------------------------\n'
            this.loading = false;
          }));
        }));
      }));
    } else if (this.Euskadi && this.ComunidadValenciana) {
      this.requests.push(this.cargaService.cargaEUS(this.Euskadi)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCV(this.ComunidadValenciana)?.subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    } else if (this.Euskadi && this.Catalunya) {
      this.requests.push(this.cargaService.cargaEUS(this.Euskadi)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT(this.Catalunya)?.subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    } else if (this.ComunidadValenciana && this.Catalunya) {
      this.requests.push(this.cargaService.cargaCV(this.ComunidadValenciana)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.requests.push(this.cargaService.cargaCAT(this.Catalunya)?.subscribe((msg: any) => {
          this.mensaje += msg.message + '\n'
          this.mensaje += '---------------------------------------------------------------------------------------\n'
          this.loading = false;
        }));
      }));
    }
    else if (this.Euskadi) {
      this.requests.push(this.cargaService.cargaEUS(this.Euskadi)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    } else if (this.ComunidadValenciana) {
      this.requests.push(this.cargaService.cargaCV(this.ComunidadValenciana)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    } else if (this.Catalunya) {
      this.requests.push(this.cargaService.cargaCAT(this.Catalunya)?.subscribe((msg: any) => {
        this.mensaje += msg.message + '\n'
        this.mensaje += '---------------------------------------------------------------------------------------\n'
        this.loading = false;
      }));
    }
  }
  limpiarBD() {
    this.core.dropAll().subscribe(_ => {
      this.mensaje = 'La base de datos ha sido vaciada.'
    });
  }
}
