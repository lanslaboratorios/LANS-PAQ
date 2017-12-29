import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConectorGilService } from '../conector-gil.service';
import { Socio } from '../Socio/Socio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material';
import { log } from 'util';

//declare var $:any;

@Component({
  selector: 'form-busqueda',
  templateUrl: './form-busqueda.component.html',
  styleUrls: ['./form-busqueda.component.css']
})
export class FormBusquedaComponent implements OnInit {

  constructor( private conector : ConectorGilService ) {

    
   }
  
  Socios: Socio[];
  clasificacion: String;
  fechaIni;
  fechaFin;
  codigo: String;
  mostrar:Boolean;
  condensado:Socio[]=[];
  banderin:Boolean=false;

  ngOnInit() {   
    this.mostrar=false;

  }
  
  getDatos(): void {
    this.condensado=[];
    this.Socios=[];
    let query:String;
    if(this.codigo == null || this.codigo == undefined || this.codigo == ""){
      if(this.clasificacion==null  || this.clasificacion == undefined || this.clasificacion == ""){
        if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){alert("Inserta almenos 1 parámetro de busqueda");return}
        else{query=`Select * from DetalleFacturacion_View where Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`}
      }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined || this.fechaIni=="" || this.fechaFin==""){      
      query=`Select * from DetalleFacturacion_View where c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`
      }else{query=`Select * from DetalleFacturacion_View where c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`}
    }else if(this.clasificacion==null || this.clasificacion==undefined || this.clasificacion == ""){
      if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
        query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} order by c_codigo, CodigoEstudio`
      }
      else{query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`}     
    }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
      query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' order by c_codigo, CodigoEstudio`
    }else{
      query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio='${this.clasificacion}' and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`
    }
      console.log(query)
     this.conector.getSocios(query)
     .subscribe(socios => {
      //console.dir(this.Socios);
      socios=this.manipulaDatos(socios); //Función para formatear Datos
      this.Socios = socios;
    
      
    
    })
     this.mostrar=true; 
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
    return socios
  }

  detectarCoincidencias(s): void{
    this.condensado=[];
    let cantidad:number=1;
    let subtotal:number=0;
    let iva:number=0;
    let total:number=0;
    let desc,dto,totalsoc:number=0;
    let cambioSocio:boolean=false;
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
        dto=Math.round((desc) * 100) / 100;
        s[i-1].Cantidad=cantidad;
        s[i-1].Stotal=subtotal;
        s[i-1].IVA=iva;
        s[i-1].Total=total;
        s[i-1].Descuento=dto;
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
        dto=Math.round((desc) * 100) / 100;
        s[i-1].Cantidad=cantidad;
        s[i-1].Stotal=subtotal;
        s[i-1].IVA=iva;
        s[i-1].Total=total;
        s[i-1].Descuento=dto;
        s[i-1].TotalFactura=totalsoc;
        this.condensado.push(s[i-1]);
        cantidad=1;
        totalsoc=0;
      }
      if(this.banderin){
        if(cambioSocio){
        subtotal=s[i]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i]['Descuento']*cantidad;
        dto=Math.round((desc) * 100) / 100;
        s[i].Cantidad=cantidad;
        s[i].Stotal=subtotal;
        s[i].IVA=iva;
        s[i].Total=total;
        s[i].Descuento=dto;
        s[i].TotalFactura=totalsoc;
        this.condensado.push(s[i]);
        //cantidad=1;

        }else{
        subtotal=s[i]['Subtotal']*cantidad;
        iva=Math.round((subtotal*.16) * 100) / 100;
        total=Math.round((subtotal+iva) * 100) / 100;
        totalsoc+=total;
        desc=s[i]['Descuento']*cantidad;
        dto=Math.round((desc) * 100) / 100;
        s[i].Cantidad=cantidad;
        s[i].Stotal=subtotal;
        s[i].IVA=iva;
        s[i].Total=total;
        s[i].Descuento=dto;
        s[i].TotalFactura=totalsoc;
        this.condensado.push(s[i]);
        // cantidad=1;
        // totalsoc=0;
        }

      }
      cambioSocio=false;
     //console.log(`totalsoc  ${totalsoc}`)
    }
    //totalsoc = 0;
  }

}
