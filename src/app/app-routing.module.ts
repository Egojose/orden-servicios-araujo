import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenServiciosComponent } from './orden-servicios/orden-servicios.component';
import { AprobarOrdenServicioComponent } from './aprobar-orden-servicio/aprobar-orden-servicio.component';


const routes: Routes = [
  {path:'', redirectTo: 'app-root', pathMatch: 'full'},
  {path:'orden-servicios', component:OrdenServiciosComponent},
  {path:'aprobar-orden-servicio', component:AprobarOrdenServicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
