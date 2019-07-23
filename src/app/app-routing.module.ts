import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenServiciosComponent } from './orden-servicios/orden-servicios.component';
import { AprobarOrdenServicioComponent } from './aprobar-orden-servicio/aprobar-orden-servicio.component';
import { ConsultarOrdenComponent } from './consultar-orden/consultar-orden.component'; 

const routes: Routes = [
  {path:'', redirectTo: 'orden-servicios', pathMatch: 'full'},
  {path:'orden-servicios', component:OrdenServiciosComponent},
  {path:'aprobar-orden-servicio', component:AprobarOrdenServicioComponent},
  {path:'consultar-orden', component:ConsultarOrdenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
