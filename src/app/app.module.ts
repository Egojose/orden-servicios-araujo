import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxCurrencyModule } from "ngx-currency";
import { OrdenServiciosComponent } from './orden-servicios/orden-servicios.component';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatCardModule, MatRadioModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE, MatTableModule, MatPaginatorModule, MatToolbarModule } from '@angular/material';
// import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { SPServicio } from './servicios/sp-servicio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    OrdenServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCurrencyModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule, 
    MatPaginatorModule, 
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [
    SPServicio,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
