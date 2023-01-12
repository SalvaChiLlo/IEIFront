import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CargaFormComponent } from './carga-form/carga-form.component';
import { MapaComponent } from './mapa/mapa.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { InfocardComponent } from './infocard/infocard.component';

@NgModule({
  declarations: [
    AppComponent,
    CargaFormComponent,
    MapaComponent,
    BuscadorComponent,
    InfocardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
