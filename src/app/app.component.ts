import { CoreService } from './services/core.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'IEIFront';

  constructor(private core: CoreService) {

  }

  ngOnInit(): void {
    this.core.getBibliotecaById(1).subscribe(response => {
      console.log('getBibliotecaById', response);
    })
    this.core.getBibliotecas('', '', 'Valencia', 'Privada').subscribe(response => {
      console.log('getBibliotecas', response);
    })
    this.core.getCodPostalesYLocalidades('Valencia').subscribe(response => {
      console.log('getCodPostalesYLocalidades', response);
    })
    this.core.getProvincias().subscribe(response => {
      console.log('getProvincias', response);
    })
    this.core.getTipos().subscribe(response => {
      console.log('getTipos', response);
    })
  }
}
