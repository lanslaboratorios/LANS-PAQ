import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConectorGilService } from '../conector-gil.service';
import { Socio } from '../Socio/Socio';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material';

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


  ngOnInit() {   
    this.mostrar=false;

  }
  
  getDatos(): void {
    let query:String;
    if(this.codigo == null || this.codigo == undefined || this.codigo == ""){
      if(this.clasificacion==null  || this.clasificacion == undefined || this.clasificacion == ""){
        if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){alert("Inserta almenos 1 parámetro de busqueda");return}
        else{query=`Select * from ConceptosFacturacionSAT_View where Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}'`}
      }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){      
      query=`Select * from ConceptosFacturacionSAT_View where c_Lineanegocio=${this.clasificacion}`
      }else{`Select * from ConceptosFacturacionSAT_View where c_Lineanegocio=${this.clasificacion} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}'`}
    }else if(this.clasificacion==null || this.clasificacion==undefined || this.clasificacion == ""){
      if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
        query=`Select * from ConceptosFacturacionSAT_View where c_codigo=${this.codigo}`
      }
      else{query=`Select * from ConceptosFacturacionSAT_View where c_codigo=${this.codigo} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}'`}     
    }else if(this.fechaIni==null || this.fechaIni==undefined || this.fechaFin==null || this.fechaFin==undefined){
      query=`Select * from ConceptosFacturacionSAT_View where c_codigo=${this.codigo} and c_Lineanegocio=${this.clasificacion}`
    }else{
      query=`Select * from ConceptosFacturacionSAT_View where c_codigo=${this.codigo} and c_Lineanegocio=${this.clasificacion} and Fecha >= '${this.parseDate(this.fechaIni)}' and Fecha <= '${this.parseDate(this.fechaFin)}'`
    }
      console.log(query)
     this.conector.getSocios(query)
     .subscribe(socios => {this.Socios = socios; console.dir(this.Socios)})
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

}
