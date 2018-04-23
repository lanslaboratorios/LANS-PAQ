import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConectorGilService } from '../conector-gil.service';
import { Socio } from '../Socio/Socio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { log } from 'util';



@Component({
  selector: 'form-busqueda',
  templateUrl: './form-busqueda.component.html',
  styleUrls: ['./form-busqueda.component.css']
})
export class FormBusquedaComponent implements OnInit {

  constructor( private conector: ConectorGilService ) {


   }

  Socios: Socio[];
  clasificacion: String;
  fechaIni;
  fechaFin;
  codigo: String;
  mostrar:Boolean;
  disponible:Boolean;
  condensado:Socio[]=[];
  banderin:Boolean=false;
  facturado;

  ngOnInit() {
    this.mostrar = false;
    this.disponible = true;

  }

  refVentana():void {
    location.reload();
  }

  getDatos(): void {
    
    this.condensado = [];
    this.Socios = [];
    this.disponible = false;
    let query:String;
    if( !this.facturado) {
      if(this.codigo == null || this.codigo === undefined || this.codigo === ''){
        if(this.clasificacion === null  || this.clasificacion === undefined || this.clasificacion === '') {
          if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
            alert('Inserta almenos 1 parámetro de busqueda'); this.disponible = true; return;
          }else {
            // tslint:disable-next-line:max-line-length
            query = `Select * from DetalleFacturacion_View where Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`;
          }
      }else
        if (this.fechaIni == null || this.fechaIni === undefined ||
          this.fechaFin == null || this.fechaFin === undefined || this.fechaIni === '' || this.fechaFin === '') {
        query = `Select * from DetalleFacturacion_View where c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`;
        }else {
          // tslint:disable-next-line:max-line-length
          query = `Select * from DetalleFacturacion_View where c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`; }
      }else if(this.clasificacion == null || this.clasificacion === undefined || this.clasificacion === '') {
        if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
          query = `Select * from DetalleFacturacion_View where c_codigo=${this.codigo} order by c_codigo, CodigoEstudio`;
        }else {
          // tslint:disable-next-line:max-line-length
          query = `Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`; }
      }else
        if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
        // tslint:disable-next-line:max-line-length
        query = `Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`;
      }else {
        // tslint:disable-next-line:max-line-length
        query = `Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`;
      }
      this.conector.getSocios(query)
      .subscribe(socios => {
        socios = this.manipulaDatos(socios); // Función para formatear Datos
        this.Socios = socios;
      });
    }else {
      if(this.codigo == null || this.codigo === undefined || this.codigo === ''){
        if(this.clasificacion === null  || this.clasificacion === undefined || this.clasificacion === '') {
          if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
            alert('Inserta almenos 1 parámetro de busqueda'); this.disponible = true; return;
          }else {
            // tslint:disable-next-line:max-line-length
            query = `Select * from DetalleFacturacionFull_View where Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`;
          }
      }else
        if (this.fechaIni == null || this.fechaIni === undefined ||
          this.fechaFin == null || this.fechaFin === undefined || this.fechaIni === '' || this.fechaFin === '') {
        query = `Select * from DetalleFacturacionFull_View where c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`;
        }else {
          // tslint:disable-next-line:max-line-length
          query = `Select * from DetalleFacturacionFull_View where c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`; }
      }else if(this.clasificacion == null || this.clasificacion === undefined || this.clasificacion === '') {
        if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
          query = `Select * from DetalleFacturacionFull_View where c_codigo=${this.codigo} order by c_codigo, CodigoEstudio`;
        }else {
          // tslint:disable-next-line:max-line-length
          query = `Select * from DetalleFacturacionFull_View where c_codigo=${this.codigo} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`; }
      }else
        if(this.fechaIni === null || this.fechaIni === undefined || this.fechaFin === null || this.fechaFin === undefined) {
        // tslint:disable-next-line:max-line-length
        query = `Select * from DetalleFacturacionFull_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`;
      }else {
        // tslint:disable-next-line:max-line-length
        query = `Select * from DetalleFacturacionFull_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`;
      }
      this.conector.getSocios(query)
      .subscribe(socios => {
        socios = this.manipulaDatos(socios); // Función para formatear Datos
        this.Socios = socios;
      });
    }
    document.getElementById('loader').style.display = 'block';
    this.mostrar = true;
  }

  parseDate(fecha:Date):String{
    if(fecha.getDate().toString().length == 1){var dia = '0'+fecha.getDate();}
    else{var dia = fecha.getDate().toString()}
    if(fecha.getMonth().toString().length == 1){var mes = '0'+(fecha.getMonth()+1);}
    else{var mes = (fecha.getMonth()+1).toString()}
    let fechaSQL=`${fecha.getFullYear()}-${mes}-${dia}`
    return fechaSQL;
  }

  manipulaDatos(socios:Socio[]):Socio[]{

    this.detectarCoincidencias(socios);
    socios=this.condensado;
    document.getElementById('loader').style.display = 'none';
    return socios
  }

  exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(`"${cols[j].innerHTML}"`);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
}

  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    var link = window.document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  
}

  detectarCoincidencias(s): void{
    this.condensado=[];
    let cantidad:number=1;
    let subtotal:number=0;
    let iva:number=0;
    let total:number=0;
    let desc= 0;
    let totalsoc:number=0;
    let cambioSocio:boolean=false;
    let acumDescPer:number=0;

    for (let i = 1;i<s.length;i++ ) {
      if(i==s.length-1){
        this.banderin=true;
      }
      if(s[i]['CodigoEstudio']==s[i-1]['CodigoEstudio'] && s[i-1]['c_codigo']==s[i]['c_codigo']){
        cantidad++;
      //console.log(`Igual: ${s[i]['CodigoEstudio']}`);
      }else if(s[i-1]['c_codigo']==s[i]['c_codigo']){
        subtotal=s[i-1]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i-1]['Descuento']*cantidad;
        acumDescPer += desc;

        s[i-1].Cantidad=cantidad;
        s[i-1].Stotal=subtotal;
        s[i-1].IVA=iva;
        s[i-1].Total=total;
        s[i-1].Descuento=desc;
        s[i-1].DescuentoPeriodo = 0;
        s[i-1].TotalFactura=0;
        this.condensado.push(s[i-1]);
        cantidad=1;
      }
      else{
        cambioSocio=true;

      }
      if (cambioSocio){
        subtotal=s[i-1]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i-1]['Descuento']*cantidad;
        acumDescPer += desc;

        s[i-1].Cantidad=cantidad;
        s[i-1].Stotal=subtotal;
        s[i-1].IVA=iva;
        s[i-1].Total=total;
        s[i-1].Descuento=desc;
        s[i-1].DescuentoPeriodo=acumDescPer;
        s[i-1].TotalFactura=totalsoc;
        this.condensado.push(s[i-1]);
        cantidad=1;
        totalsoc=0;
        acumDescPer=0;
      }
      if(this.banderin){
        if(cambioSocio){
        subtotal=s[i]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i]['Descuento']*cantidad;
        acumDescPer += desc;

        s[i].Cantidad=cantidad;
        s[i].Stotal=subtotal;
        s[i].IVA=iva;
        s[i].Total=total;
        s[i].Descuento=desc;
        s[i].DescuentoPeriodo=acumDescPer;
        s[i].TotalFactura=totalsoc;
        this.condensado.push(s[i]);
        //cantidad=1;

        }else{
        subtotal=s[i]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i]['Descuento']*cantidad;
        acumDescPer += desc;

        s[i].Cantidad=cantidad;
        s[i].Stotal=subtotal;
        s[i].IVA=iva;
        s[i].Total=total;
        s[i].Descuento=desc;
        s[i].DescuentoPeriodo=acumDescPer;
        s[i].TotalFactura=totalsoc;
        this.condensado.push(s[i]);

        }

      }
      cambioSocio=false;
     //console.log(`totalsoc  ${totalsoc}`)
    }
    //totalsoc = 0;
  }

}
