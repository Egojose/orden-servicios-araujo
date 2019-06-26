import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCurrencyModule } from "ngx-currency";
import { OrdenServiciosComponent } from './orden-servicios/orden-servicios.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
