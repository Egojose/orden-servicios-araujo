import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdenServiciosComponent } from './orden-servicios/orden-servicios.component';
import { AprobarOrdenServicioComponent } from './aprobar-orden-servicio/aprobar-orden-servicio.component';
import { ConsultarOrdenComponent } from './consultar-orden/consultar-orden.component'; 
import { BandejaServiciosComponent } from './bandeja-servicios/bandeja-servicios.component';
import { EditarOrdenComponent } from './editar-orden/editar-orden.component';

const routes: Routes = [
  {path:'', redirectTo: 'orden-servicios', pathMatch: 'full'},
  {path:'orden-servicios', component:OrdenServiciosComponent},
  {path:'aprobar-orden-servicio', component:AprobarOrdenServicioComponent},
  {path:'consultar-orden', component:ConsultarOrdenComponent},
  {path:'bandeja-servicios', component:BandejaServiciosComponent},
  {path:'editar-orden', component:EditarOrdenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
