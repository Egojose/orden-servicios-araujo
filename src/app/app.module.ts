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
import { ToastrModule } from 'ng6-toastr-notifications';
import { AprobarOrdenServicioComponent } from './aprobar-orden-servicio/aprobar-orden-servicio.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ConsultarOrdenComponent } from './consultar-orden/consultar-orden.component';
import { ExportAsModule } from 'ngx-export-as';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    OrdenServiciosComponent,
    AprobarOrdenServicioComponent,
    ConsultarOrdenComponent
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
    MatCheckboxModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    ExportAsModule,
    NgxSpinnerModule
  ],
  providers: [
    SPServicio,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
