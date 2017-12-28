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
  fechaIni: Date;
  fechaFin: Date;
  codigo: String;
  mostrar:Boolean;
  condensado:Socio[]=[];

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
      }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){      
      query=`Select * from DetalleFacturacion_View where c_Lineanegocio=${this.clasificacion} order by c_codigo, CodigoEstudio`
      }else{`Select * from DetalleFacturacion_View where c_Lineanegocio=${this.clasificacion} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`}
    }else if(this.clasificacion==null || this.clasificacion==undefined || this.clasificacion == ""){
      if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
        query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} order by c_codigo, CodigoEstudio`
      }
      else{query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`}     
    }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
      query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio=${this.clasificacion} order by c_codigo, CodigoEstudio`
    }else{
      query=`Select * from DetalleFacturacion_View where c_codigo=${this.codigo} and c_Lineanegocio=${this.clasificacion} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}' order by c_codigo, CodigoEstudio`
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
    let cantidad:number=1;
    let subtotal:number=0;
    let iva:number=0;
    let total:number=0;
    let desc,dto,totalsoc:number=0;
    let cambioSocio:boolean=false;
    for (let i = 1;i<s.length;i++ ) {
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
        s[i-1].TotalFactura="";
        this.condensado.push(s[i-1]);
        cantidad=1;}
      else{
        cambioSocio=true;
        for(let x = 0; x<this.condensado.length;x++){
          if(this.condensado[x]['c_codigo']==s[i-1]['c_codigo']){
            this.condensado[x].TotalFactura=totalsoc;
          }
        }
      }
      if(!cambioSocio){
        for(let x = 0; x<this.condensado.length;x++){
          if(this.condensado[x]['c_codigo']==s[i-1]['c_codigo']){
            this.condensado[x].TotalFactura=totalsoc;
          }
        }
      }
    
    };
  }

}
