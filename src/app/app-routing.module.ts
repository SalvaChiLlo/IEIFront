import { BuscadorComponent } from './buscador/buscador.component';
import { CargaFormComponent } from './carga-form/carga-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'carga', component: CargaFormComponent },
  { path: 'home', component: BuscadorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
