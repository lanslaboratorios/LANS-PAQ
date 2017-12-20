import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { FormBusquedaComponent } from './form-busqueda/form-busqueda.component';
import { ViewFacturaComponent } from './view-factura/view-factura.component';
import { FormLogInComponent } from './form-log-in/form-log-in.component';


@NgModule({
  declarations: [
    AppComponent,
    FormBusquedaComponent,
    ViewFacturaComponent,
    FormLogInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
