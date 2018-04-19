import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatTableModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppComponent } from './app.component';
import { FormBusquedaComponent } from './form-busqueda/form-busqueda.component';
import { ViewFacturaComponent } from './view-factura/view-factura.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';
import { ConectorGilService } from './conector-gil.service';


@NgModule({
  declarations: [
    AppComponent,
    FormBusquedaComponent,
    ViewFacturaComponent,
    FormLogInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatCheckboxModule
  ],
  providers: [ConectorGilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
