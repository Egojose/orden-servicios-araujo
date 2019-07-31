import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SPServicio } from "../servicios/sp-servicio";
import { Unegocios } from '../dominio/unegocios';
import { Configuracion } from '../dominio/configuracion';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Orden } from '../dominio/orden';
import { Usuario } from '../dominio/usuario';
import { Empleado } from '../dominio/empleado';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Aprobadores } from '../dominio/aprobadores';
import { EmailProperties } from '@pnp/sp';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Sede } from '../dominio/sede';
import { CentroCosto } from '../dominio/centroCosto';
import { Empresas } from '../dominio/empresas';

@Component({
  selector: 'app-editar-orden',
  templateUrl: './editar-orden.component.html',
  styleUrls: ['./editar-orden.component.css']
})
export class EditarOrdenComponent implements OnInit {

  editarOrden: FormGroup;
  usuarioActual: Usuario;
  nombreUsuario: any;
  nombre: any;
  emailUsuario: any;
  idUsuario: number;
  usuarios: Usuario[] = [];
  sedes: Sede[] = [];
  dataUsuarios = [];
  areas: CentroCosto [] = [];
  unegocios: Unegocios [] = [];
  config : Configuracion [] = [];
  empresa: Empresas [] = [];
  esConsultores: boolean;
  esAsociados: boolean;
  ivaCalculado: number;
  total: number;
  garantia: boolean;
  pagoCECO: boolean;
  pagoUnico: boolean;
  pagoVarios: boolean;


  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registrarControles();
  }

  private registrarControles() {
    this.editarOrden = this.fb.group({
      nroOrden: [''],
      empresaSolicitante: [''],
      nitSolicitante: [''],
      ciudadSolicitante: [''],
      telSolicitante: [''],
      direccionSolicitante: [''],
      contactoSolicitante: [''],
      emailSolicitante: [''],
      unidadNegocios: [''],
      nombreCECO: [''],
      numeroCECO: [''],
      razonSocial: [''],
      nitProveedor: [''],
      ciudadProveedor: [''],
      telProveedor: [''],
      direccionProveedor: [''],
      contactoProveedor: [''],
      regimen: ['',],
      rut: [''],
      camara: [''],
      descripcionServicios: [''],
      cliente: [''],
      job: [''],
      precio: [''],
      tieneIva: [''],
      iva: [''],
      total: [''],
      valorLetras: [''],
      fechaInicio: [''],
      fechaFinal: [''],
      totalDias: [''],
      formaPago: [''],
      fechaPago: [''],
      Pago1: [''],
      Pago2: [''],
      Pago3: [''],
      Pago4: [''],
      Pago5: [''],
      Pago6: [''],
      ceco1: [''],
      distPago: [''],
      porcentajeCeco1: [''],
      ceco2: [''],
      porcentajeCeco2: [''],
      ceco3: [''],
      porcentajeCeco3: [''],
      garantia: [''],
      porcentajeCumplimiento: [''],
      mesesCumplimiento: [''],
      porcentajeAnticipos: [''],
      mesesAnticipos: [''],
      porcentajeSalarios: [''],
      mesesSalarios: [''],
      porcentajeResponsabilidad: [''],
      porcentajeCalidad: [''],
      mesesCalidad1: [''],
      mesesCalidad2: [''],
      polizaVida: [''],
      polizaVehiculos: [''],
      gerenteUnegocios: [''],
      motivoRechazo: ['']
    })
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
       
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };

  private DataSourceUsuarios() {
    this.usuarios.forEach(usuario => {
      this.dataUsuarios.push({ value: usuario.id.toString(), label: usuario.nombre, email: usuario.email });
      // console.log(this.dataUsuarios);
    });
  };

  obtenerSedes() {
    this.servicio.obtenerSedes().subscribe(
      (respuesta) => {
        this.sedes = Sede.fromJsonList(respuesta);
        // this. obtenerCeco();
      }
    )
  };

  obtenerCeco() {
    this.servicio.obtenerCecos().subscribe(
      (respuesta) => {
        this.areas = CentroCosto.fromJsonList(respuesta);
      }
    )
  };

  changeCeco($event) {
    let numeroCeco = $event.value.ceco
    console.log($event);
    this.editarOrden.controls['numeroCECO'].setValue(numeroCeco);
  };

  changeContacto($event) {
  console.log($event)
  let email = $event.value.email
  this.editarOrden.controls['emailSolicitante'].setValue(email)
  };

  obtenerUnegocios() {
    this.servicio.obtenerUnegocio().subscribe(
      (respuesta) => {
        this.unegocios = Unegocios.fromJsonList(respuesta);
      }
    )
  }; 

  obtenerConsecutivoInicial() {
    this.servicio.obtenerConsecutivoInciail().subscribe(
      (respuesta) => {
       this.config = Configuracion.fromJsonList(respuesta);
      //  this.cargarNroOrden();
      //  this.obtenerEmpresa()
       console.log(this.config)
       
      }
    )
  }; 

  async obtenerConsecutivo(): Promise<any> {
   
    let RespuestaMensaje = "";
    let RespuestaGurdado;
    let numeroOrdenString = this.config[0].consecutivo.split('-')
    let numeroOrdenStringAsociados = this.config[0].consecutivoAsociados.split('-');
    let numeroOrdenNumber;

    if(this.editarOrden.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
      numeroOrdenNumber = parseInt(numeroOrdenString[1], 10)
    }
    else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S') {
      numeroOrdenNumber = parseInt(numeroOrdenStringAsociados[1], 10)
    }
    
    await this.servicio.obtenerConsecutivo().then(
      async (respuesta) => {
        
        this.config = Configuracion.fromJsonList(respuesta);
        let ordenActual = numeroOrdenNumber 
        let ordenValue;
        if(this.editarOrden.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S' && ordenActual < 10) {
          ordenValue = `C-00${ordenActual}`
        }
        else if(this.editarOrden.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S' && (ordenActual >= 10 && ordenActual < 100)) {
          ordenValue = `C-0${ordenActual}`
        }
        else if(this.editarOrden.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S' && ordenActual > 99) {
          ordenValue = `C-${ordenActual}`
        }
        else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S' && ordenActual < 10) {
          ordenValue = `A-00${ordenActual}`
        }
        else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S' && (ordenActual >= 10 && ordenActual < 100 )) {
          ordenValue = `A-0${ordenActual}`
        }
        else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S' && ordenActual > 99) {
          ordenValue = `A-${ordenActual}`
        }
        this.editarOrden.controls['nroOrden'].setValue(ordenValue);
        
        let objConfig;
        
        let Consecutivo = ordenValue.split("-");
        let suma = parseInt(Consecutivo[1])+1;
        let sumaString;
        if(suma < 10) {
          sumaString = "00"+suma
        }
        else if(suma < 100) {
          sumaString = "0"+suma;
        }
        else {
          sumaString = suma
        } 
        Consecutivo = Consecutivo[0] + "-" + sumaString;
        if (this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
          objConfig = { Consecutivo: Consecutivo }
        }
        else {
          objConfig = { ConsecutivoAsociados: Consecutivo }          
        }
        RespuestaMensaje = "Exitoso";
        RespuestaGurdado = await this.ActualizarConsecutivo(this.config[0].id, objConfig);
        if (RespuestaGurdado === "Error") {
          RespuestaMensaje = "Error";
        }
        
      }
    ).catch(
      (error)=>{
         console.log(error);
         RespuestaMensaje = "Error";
      }
    )

    return RespuestaMensaje
  }

  async ActualizarConsecutivo(id, Obj): Promise<any>{
    let RespuestaMensaje = "";
    await this.servicio.ActualizarNroOrden(id, Obj).then(
      (res)=>{
        RespuestaMensaje = "Exitoso";
      }
    ).catch(
      (error)=>{
        console.log(error);
         RespuestaMensaje = "Error";
      }
    );

    return RespuestaMensaje;
  };

  obtenerEmpresa() {
    this.servicio.obtenerEmpresa().subscribe(
      (respuesta) => {
        this.empresa = Empresas.fromJsonList(respuesta);
        console.log(this.empresa);
      }
    )
  };

  cargarNit() {
    if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
      this.editarOrden.controls['nitSolicitante'].setValue(this.empresa[0].nit);
      this.editarOrden.controls['nroOrden'].setValue(this.config[0].consecutivo);
      this.esConsultores = true;
      this.esAsociados = false;
    }
    else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S') {
      this.editarOrden.controls['nitSolicitante'].setValue(this.empresa[1].nit);
      this.editarOrden.controls['nroOrden'].setValue(this.config[0].consecutivoAsociados);
      this.esConsultores = false;
      this.esAsociados = true;
    }
  };

  cargarNroOrden() {
    if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
      this.editarOrden.controls['nroOrden'].setValue(this.config[0].consecutivo); 
    }
    else if(this.editarOrden.get('empresaSolicitante').value === 'Araujo Ibarra Asociados S.A.S') {
      this.editarOrden.controls['nroOrden'].setValue(this.config[0].consecutivoAsociados) 
    }
  };

  changeEmpresa($event) {
    this.cargarNit();
  };

  changeCiudad($event) {
    console.log($event.value);
    let direccion = $event.value.direccion;
    let telefono = $event.value.telefono;
    this.editarOrden.controls['direccionSolicitante'].setValue(direccion);
    this.editarOrden.controls['telSolicitante'].setValue(telefono);
  };

  calcularIva() {
    let price = this.editarOrden.get('precio').value;
    let iva = this.config[0].iva;
    let ivaPorcentaje = iva / 100
    this.ivaCalculado = price * ivaPorcentaje
    let total = price + this.ivaCalculado
    this.editarOrden.controls['iva'].setValue(this.ivaCalculado);
    this.editarOrden.controls['total'].setValue(total);
  };

  calcularTotal() {
    let price = parseInt(this.editarOrden.get('precio').value, 10);
    this.total = price;
    this.editarOrden.controls['total'].setValue(this.total);
    this.editarOrden.controls['iva'].setValue(0);
    this.editarOrden.controls['tieneIva'].setValue(false);
  };

  changePrecio($event) {
    this.calcularTotal();
  };

  changeIva($event) {
    let precio = this.editarOrden.controls['precio'].value
    if($event.checked === true) {
      this. calcularIva();
    }
    else {
      this.editarOrden.controls['iva'].setValue(0);
      this.editarOrden.controls['total'].setValue(precio);
    }
  };

  pagoCECOchange($event) {
    if ($event.value === 'true') {
      this.pagoCECO = true;
    } else {
      this.pagoCECO = false;
    }
  }

  formaPago($event) {
    if ($event.value === "Único") {
      this.pagoUnico = true;
      this.pagoVarios = false;
    } 
    else if($event.value === 'Varios') {
      this.pagoVarios = true;
      this.pagoUnico = false;
    }
  }

  garantiaChange($event) {
    if ($event.value === "true") {
      this.garantia = true;
    } else {
      this.garantia = false;
    }
  };

  changeFecha($event) {
    this.calcularDias();
  }

  calcularDias() {
    let arrayInicio = this.editarOrden.get('fechaInicio').value.split(' ');
    let arrayFin = this.editarOrden.get('fechaFinal').value.split(' ');
    let fecha1 = parseInt(arrayInicio[2], 10);
    let fecha2 = parseInt(arrayFin[2], 10);
    let calculo = fecha1 + fecha2
    this.editarOrden.controls['totalDias'].setValue(calculo);
  };
}
