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
  orden: Orden[] = [];
  esConsultores: boolean;
  esAsociados: boolean;
  ivaCalculado: number;
  total: number;
  garantia: boolean;
  pagoCECO: boolean;
  pagoUnico: boolean;
  pagoVarios: boolean;
  panelOpenState = false;
  panelOpenState1 = false;
  IdRegistroOS: string;
  emailSolicitante: any;
  cargarFirmajefe: any[];
  cargarFirmaGerente: any[];
  cargarFirmaDirector: any[];
  ordenNro: any;
  NumeroOrden: any;
  esResponsableActual: boolean = false;
  mostrarGarantia: boolean;


  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registrarControles();
    this.obtenerUsuarios();
    this.ObtenerUsuarioActual();
    this.obtenerConsecutivoInicial();
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
      razonSocial: ['', Validators.required],
      nitProveedor: ['', Validators.required],
      ciudadProveedor: ['', Validators.required],
      telProveedor: ['', Validators.required],
      direccionProveedor: ['', Validators.required],
      contactoProveedor: ['', Validators.required],
      regimen: ['', Validators.required],
      rut: [''],
      camara: [''],
      descripcionServicios: ['', Validators.required],
      cliente: [''],
      job: [''],
      precio: ['', Validators.required],
      tieneIva: [''],
      iva: [''],
      total: [''],
      valorLetras: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      totalDias: [''],
      formaPago: ['',Validators.required],
      fechaPago: [''],
      Pago1: [''],
      Pago2: [''],
      Pago3: [''],
      Pago4: [''],
      Pago5: [''],
      Pago6: [''],
      distPago: [''],
      ceco1: [''],
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
      polizaVehiculos: ['']
    })
  }

  obtenerUsuarios() {
    this.servicio.ObtenerTodosLosUsuarios().subscribe(
      (respuesta) => {
        this.usuarios = Usuario.fromJsonList(respuesta);
        this.DataSourceUsuarios();
      });
  };

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
        this. obtenerOrden();
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
      }
    )
  }; 

  obtenerEmpresa() {
    this.servicio.obtenerEmpresa().subscribe(
      (respuesta) => {
        this.empresa = Empresas.fromJsonList(respuesta);
        console.log(this.empresa);
      }
    )
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

  changeFecha() {
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

  obtenerOrden() {
    this.IdRegistroOS = sessionStorage.getItem("IdServicio");
    this.servicio.obtenerOrden(this.IdRegistroOS).subscribe(
      (respuesta) => {
        this.orden = Orden.fromJsonList(respuesta);
        this.emailSolicitante = respuesta[0].UsuarioSolicitante.EMail;
        if( this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
          this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url
        }
        else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
          this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url
          this.cargarFirmaGerente = respuesta[0].FirmaGerenteAdministrativo.Url
        }
        this.ordenNro = this.editarOrden.get('nroOrden').value;
        this.valoresPorDefecto();
      }
    )
  }

  valoresPorDefecto() {
    this.editarOrden.controls['nroOrden'].setValue(this.orden[0].nroOrden);
    this.editarOrden.controls['empresaSolicitante'].setValue(this.orden[0].empresaSolicitante);
    this.editarOrden.controls['nitSolicitante'].setValue(this.orden[0].nitSolicitante);
    this.editarOrden.controls['ciudadSolicitante'].setValue(this.orden[0].ciudadSolicitante);
    this.editarOrden.controls['telSolicitante'].setValue(this.orden[0].telSolicitante);
    this.editarOrden.controls['direccionSolicitante'].setValue(this.orden[0].direccionSolicitante);
    this.editarOrden.controls['contactoSolicitante'].setValue(this.orden[0].contactoSolicitante);
    this.editarOrden.controls['emailSolicitante'].setValue(this.orden[0].emailSolicitante);
    this.editarOrden.controls['unidadNegocios'].setValue(this.orden[0].uNegocios);
    this.editarOrden.controls['nombreCECO'].setValue(this.orden[0].nombreCECO);
    this.editarOrden.controls['numeroCECO'].setValue(this.orden[0].numeroCECO);
    this.editarOrden.controls['razonSocial'].setValue(this.orden[0].razonSocial);
    this.editarOrden.controls['nitProveedor'].setValue(this.orden[0].nitProveedor);
    this.editarOrden.controls['ciudadProveedor'].setValue(this.orden[0].ciudadProveedor);
    this.editarOrden.controls['telProveedor'].setValue(this.orden[0].telProveedor);
    this.editarOrden.controls['direccionProveedor'].setValue(this.orden[0].direccionProveedor);
    this.editarOrden.controls['contactoProveedor'].setValue(this.orden[0].contactoProveedor);
    this.editarOrden.controls['regimen'].setValue(this.orden[0].regimen);
    this.editarOrden.controls['rut'].setValue(this.orden[0].rut);
    this.editarOrden.controls['camara'].setValue(this.orden[0].camara);
    this.editarOrden.controls['descripcionServicios'].setValue(this.orden[0].descripcion);
    this.editarOrden.controls['cliente'].setValue(this.orden[0].cliente);
    this.editarOrden.controls['job'].setValue(this.orden[0].job);
    this.editarOrden.controls['precio'].setValue(this.orden[0].precio);
    this.editarOrden.controls['tieneIva'].setValue(this.orden[0].tieneIva);
    this.editarOrden.controls['iva'].setValue(this.orden[0].iva);
    this.editarOrden.controls['total'].setValue(this.orden[0].total);
    this.editarOrden.controls['valorLetras'].setValue(this.orden[0].valorLetras);
    this.editarOrden.controls['fechaInicio'].setValue(this.orden[0].fechaInicio);
    this.editarOrden.controls['fechaFinal'].setValue(this.orden[0].fechaFin);
    this.editarOrden.controls['totalDias'].setValue(this.orden[0].totalDias);
    this.editarOrden.controls['formaPago'].setValue(this.orden[0].formaPago);
    this.editarOrden.controls['fechaPago'].setValue(this.orden[0].fechaPago);
    this.editarOrden.controls['Pago1'].setValue(this.orden[0].fecha1erPago);
    this.editarOrden.controls['Pago2'].setValue(this.orden[0].fecha2doPago);
    this.editarOrden.controls['Pago3'].setValue(this.orden[0].fecha3erPago);
    this.editarOrden.controls['Pago4'].setValue(this.orden[0].fecha4toPago);
    this.editarOrden.controls['Pago5'].setValue(this.orden[0].fecha5toPago);
    this.editarOrden.controls['Pago6'].setValue(this.orden[0].fecha6toPago);
    this.editarOrden.controls['ceco1'].setValue(this.orden[0].cecoResponsable1);
    this.editarOrden.controls['ceco2'].setValue(this.orden[0].cecoResponsable2);
    this.editarOrden.controls['ceco3'].setValue(this.orden[0].cecoResponsable3);
    this.editarOrden.controls['porcentajeCeco1'].setValue(this.orden[0].porcentajeResponsable1);
    this.editarOrden.controls['porcentajeCeco2'].setValue(this.orden[0].porcentajeResponsable2);
    this.editarOrden.controls['porcentajeCeco3'].setValue(this.orden[0].porcentajeResponsable3);
    this.editarOrden.controls['garantia'].setValue(this.orden[0].garantia);
    this.editarOrden.controls['porcentajeCumplimiento'].setValue(this.orden[0].porcentajeCumplimiento);
    this.editarOrden.controls['mesesCumplimiento'].setValue(this.orden[0].mesesCumplimiento);
    this.editarOrden.controls['porcentajeAnticipos'].setValue(this.orden[0].porcentajeManejoAnticipos);
    this.editarOrden.controls['mesesAnticipos'].setValue(this.orden[0].mesesManejoAnticipos);
    this.editarOrden.controls['porcentajeSalarios'].setValue(this.orden[0].porcentajePagoSalarios);
    this.editarOrden.controls['mesesSalarios'].setValue(this.orden[0].aniosPagoSalarios);
    this.editarOrden.controls['porcentajeResponsabilidad'].setValue(this.orden[0].porcentajeResposabilidadCivil);
    this.editarOrden.controls['porcentajeCalidad'].setValue(this.orden[0].porcentajeCalidad);
    this.editarOrden.controls['mesesCalidad1'].setValue(this.orden[0].validezCalidad);
    this.editarOrden.controls['mesesCalidad2'].setValue(this.orden[0].extensionCalidad);
    this.editarOrden.controls['polizaVida'].setValue(this.orden[0].polizaColectiva);
    this.editarOrden.controls['polizaVehiculos'].setValue(this.orden[0].polizaVehiculos);
    this.editarOrden.controls['distPago'].setValue(this.orden[0].distPago);
    this.NumeroOrden = this.orden[0].nroOrden;
    if (this.orden[0].ResponsableActual === this.usuarioActual.id) {
        this.esResponsableActual = true;
    }
    this.switchValores();
  }

  switchValores() {
    console.log(this.editarOrden.controls['garantia'].value);
    if(this.editarOrden.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
      this.esConsultores = true;
    }
    else {
      this.esAsociados = true;
    }
    if (this.editarOrden.controls['formaPago'].value === 'Único') {
      this.pagoUnico = true;
      this.pagoVarios = false;
    }
    else {
      this.pagoVarios = true;
      this.pagoUnico = false;
    }
    if (this.editarOrden.controls['distPago'].value === true) {
      this.editarOrden.controls['distPago'].setValue('true');
      this.pagoCECO = true;
    }
    else {
      this.editarOrden.controls['distPago'].setValue('false');
    }
    if (this.editarOrden.controls['garantia'].value === true) {
      this.editarOrden.controls['garantia'].setValue('true');
      this.mostrarGarantia = true;
    }
    else {
      this.editarOrden.controls['garantia'].setValue('false');
    }
    if (this.editarOrden.controls['polizaVida'].value === true) {
      this.editarOrden.controls['polizaVida'].setValue('true');
    }
    else {
      this.editarOrden.controls['polizaVida'].setValue('false');
    }
    if (this.editarOrden.controls['polizaVehiculos'].value === true) {
      this.editarOrden.controls['polizaVehiculos'].setValue('true');
    }
    else {
      this.editarOrden.controls['polizaVehiculos'].setValue('false');
    }
  }
}
