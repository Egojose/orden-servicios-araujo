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
  panelOpenState2 = false;
  IdRegistroOS: string;
  emailSolicitante: any;
  cargarFirmajefe: any[];
  cargarFirmaGerente: any[];
  cargarFirmaDirector: any[];
  ordenNro: any;
  NumeroOrden: any;
  esResponsableActual: boolean = false;
  mostrarGarantia: boolean;
  arrayCecos: any = [];
  idOrden: number;
  idServicios: number;
  porcentajeAsumidoNum: number;
  sumaPorcentaje: number;
  personaNatural: boolean;
  afiliar: boolean;



  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registrarControles();
    this.obtenerUsuarios();
    this.ObtenerUsuarioActual();
    this.obtenerConsecutivoInicial();
    this.editarOrden.controls['persona'].setValue('false');
    this.editarOrden.controls['diasPorMes'].setValue(30);
    this.editarOrden.controls['porcentajeCotizacion'].setValue('40%');
    this.editarOrden.controls['afiliacion'].setValue('false');
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
      polizaVehiculos: [''],
      numeroCecoPorcentaje: [''],
      porcentajeAsumido: [''],
      valorTotalServicio: [''],
      persona: [''],
      nroDias: [''],
      valorPorDia: [''],
      diasPorMes: [''],
      valorServicioPorMes: [''],
      porcentajeCotizacion: [''],
      baseCotizacion: [''],
      afiliacion: [''],
      porcentajeRiesgo: [''],
      nivelRiesgo: [''],
      comentariosArl: [''],
      pagoAfiliacion: [''],
      conceptoUnico: [''],
      porcentajePago1: [''],
      porcentajePago2: [''],
      porcentajePago3: [''],
      porcentajePago4: [''],
      porcentajePago5: [''],
      porcentajePago6: [''],
      conceptoPago1: [''],
      conceptoPago2: [''],
      conceptoPago3: [''],
      conceptoPago4: [''],
      conceptoPago5: [''],
      conceptoPago6: ['']
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
        this.obtenerSedes();
        this.obtenerOrden();
        this.servicio.obtenerJefe(this.usuarioActual.id).then(
          (respuesta) => {
            if (respuesta[0].JefeId !== null) {
              console.log(respuesta[0]);
              this.usuarioActual.IdJefeDirecto = respuesta[0].JefeId;
              this.usuarioActual.NombreJefeDirecto = respuesta[0].Jefe.Title;
              this.usuarioActual.EmailJefeDirecto = respuesta[0].Jefe.EMail;
              console.log(this.usuarioActual.EmailJefeDirecto);
            }
          }
        ).catch(
          (error) => {
            console.log(error)
          }
        );
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
        this. obtenerCeco();
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

  validarPorcentaje() {
    this.porcentajeAsumidoNum = parseInt(this.editarOrden.get('porcentajeAsumido').value, 10)
    if (this.arrayCecos.length > 0) {
      let array: any = [];
      this.arrayCecos.map((x) => {
        x.porcentaje
        array.push(x.porcentaje)
      })
      this.sumaPorcentaje = array.reduce((a, suma) => a + suma);
      if(array.length === 0 || array === undefined) {
        this.sumaPorcentaje = 0
      }
    }
    else this.sumaPorcentaje = 0
  }

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
      console.log($event.checked)
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

  personaChange($event) {
    if($event.value === 'true'){
      this.personaNatural = true;
      this.agregarValorTotalServicio();
      this.nroDiasContrato();
      this.valorPorDia();
      this.ValorPorMes();
      this.calcularBaseCotizacion();
    }
    else {
      this.personaNatural = false;
    }
  }

  afiliacionChange($event) {
    if($event.value === 'true') {
      this.afiliar = true;
    }
    else {
      this.afiliar = false;
    }
  }

  porcentajeNivelRiesgo($event) {
    let porcentajeRiesgo
    if($event.value === 'I') {
      porcentajeRiesgo = '0.522 %'
    }
    else if($event.value === 'II') {
      porcentajeRiesgo = '1.044 %'
    }
    else if($event.value === 'III') {
      porcentajeRiesgo = '2.436 %'
    }
    else if($event.value === 'IV') {
      porcentajeRiesgo = '4.350 %'
    }
    else if($event.value === 'V') {
      porcentajeRiesgo = '6.960 %'
    }
    this.editarOrden.controls['porcentajeRiesgo'].setValue(porcentajeRiesgo);
  }
  
  agregarValorTotalServicio () {
    this.editarOrden.controls['valorTotalServicio'].setValue(this.editarOrden.get('total').value)
  }

  nroDiasContrato() {
    this.editarOrden.controls['nroDias'].setValue(this.editarOrden.get('totalDias').value)
  }

  valorPorDia() {
    let valor = parseInt(this.editarOrden.get('total').value, 10)
    let dias = parseInt(this.editarOrden.get('totalDias').value, 10)
    let calculo = valor / dias
    this.editarOrden.controls['valorPorDia'].setValue(calculo)
  }

  ValorPorMes() {
    let meses = parseInt(this.editarOrden.get('totalDias').value) / 30
    let valorxmes;
    if(meses <= 1) {
      meses = 1
    }
    valorxmes = this.editarOrden.get('total').value / meses;
    this.editarOrden.controls['valorServicioPorMes'].setValue(valorxmes);
  }

  calcularBaseCotizacion() {
    let base = parseInt(this.editarOrden.get('valorServicioPorMes').value, 10) * 0.40
    this.editarOrden.controls['baseCotizacion'].setValue(base);
  }

  changeFecha() {
    this.calcularDias();
  }

  cancelar() {
    setTimeout(
      () => {
        window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
      }, 500);
  }

  calcularDias() {
    let fecha1 = this.editarOrden.get('fechaInicio').value;
    let fecha2 = this.editarOrden.get('fechaFinal').value;
    let time = new Date(fecha1).getTime(); 
    let time2 = new Date(fecha2).getTime();
    let diff = Math.abs(time2 - time);
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    this.editarOrden.controls['totalDias'].setValue(diffDays);
  }
  obtenerOrden() {
    this.IdRegistroOS = sessionStorage.getItem("IdServicio");
    this.servicio.obtenerOrden(this.IdRegistroOS).subscribe(
      (respuesta) => {
        this.orden = Orden.fromJsonList(respuesta);
        this.idOrden = respuesta[0].ID;
        this.idServicios = respuesta[0].idServicio;
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
    this.editarOrden.controls['porcentajePago1'].setValue(this.orden[0].porcentajePago1);
    this.editarOrden.controls['porcentajePago2'].setValue(this.orden[0].porcentajePago2);
    this.editarOrden.controls['porcentajePago3'].setValue(this.orden[0].porcentajePago3);
    this.editarOrden.controls['porcentajePago4'].setValue(this.orden[0].porcentajePago4);
    this.editarOrden.controls['porcentajePago5'].setValue(this.orden[0].porcentajePago5);
    this.editarOrden.controls['porcentajePago6'].setValue(this.orden[0].porcentajePago6);
    this.editarOrden.controls['conceptoPago1'].setValue(this.orden[0].conceptoPago1);
    this.editarOrden.controls['conceptoPago2'].setValue(this.orden[0].conceptoPago2);
    this.editarOrden.controls['conceptoPago3'].setValue(this.orden[0].conceptoPago3);
    this.editarOrden.controls['conceptoPago4'].setValue(this.orden[0].conceptoPago4);
    this.editarOrden.controls['conceptoPago5'].setValue(this.orden[0].conceptoPago5);
    this.editarOrden.controls['conceptoPago6'].setValue(this.orden[0].conceptoPago6);
    this.editarOrden.controls['afiliacion'].setValue(this.orden[0].afiliacion);
    this.editarOrden.controls['nivelRiesgo'].setValue(this.orden[0].NivelRiesgo);
    this.editarOrden.controls['porcentajeRiesgo'].setValue(this.orden[0].porcentajeRiesgo);
    this.editarOrden.controls['pagoAfiliacion'].setValue(this.orden[0].pagoAfiliacion);
    this.editarOrden.controls['comentariosArl'].setValue(this.orden[0].comentarios);
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
    this.editarOrden.controls['porcentajeAsumido'].setValue(this.orden[0].porcentajeAsumido);
    this.NumeroOrden = this.orden[0].nroOrden;
    if (this.orden[0].ResponsableActual === this.usuarioActual.id) {
        this.esResponsableActual = true;
    }
    this.switchValores();
  }

  switchValores() {
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
    if(this.editarOrden.controls['afiliacion'].value === true) {
      this.editarOrden.controls['afiliacion'].setValue('true');
      this.afiliar = true;
    }
    else {
      this.editarOrden.controls['afiliacion'].setValue('false');
    }
  }

  changeCecoPorcentaje($event) {
    let numeroCeco = $event.value.ceco
    this.editarOrden.controls['numeroCecoPorcentaje'].setValue(numeroCeco);
  }

  agregarCecos() {
    if (this.editarOrden.get('ceco1').value === "") {
      this.MensajeAdvertencia('Por favor seleccione un CECO')
      return false;
    }
    else {
      if (this.editarOrden.get('porcentajeCeco1').value === "") {
        this.MensajeAdvertencia('Debe agregar un porcentaje');
        return false;
      }
      if (this.editarOrden.get('porcentajeCeco1').value > 100) {
        this.MensajeAdvertencia('El porcentaje no debe superar el 100%');
        return false;
      }
      this.arrayCecos.push({ ceco: this.editarOrden.get('ceco1').value.nombre, nroCeco: this.editarOrden.get('numeroCecoPorcentaje').value, porcentaje: this.editarOrden.get('porcentajeCeco1').value, director: this.editarOrden.get('ceco1').value.directorId });
      this.editarOrden.controls['ceco1'].setValue("");
      this.editarOrden.controls['numeroCecoPorcentaje'].setValue("");
      this.editarOrden.controls['porcentajeCeco1'].setValue("");
    }
  }

  borrarCecos(index) {
    this.arrayCecos.splice(index, 1);
  }

  onSubmit() {
    this.spinner.show()
    this.validarPorcentaje();
    if (this.sumaPorcentaje + this.porcentajeAsumidoNum !== 100) {
      this.spinner.hide();
      this.MensajeAdvertencia('El total de porcentajes debe ser equivalente al 100%');
      this.spinner.hide();
      return false;
    }
    let id = parseInt(this.IdRegistroOS);
    let id1 = this.orden[0].id
    let nroOrden = this.editarOrden.get('nroOrden').value;
    let empresaSolicitante = this.editarOrden.get('empresaSolicitante').value.nombre;
    let nitSolicitante = this.editarOrden.get('nitSolicitante').value;
    let ciudadSolicitante = this.editarOrden.get('ciudadSolicitante').value.nombre;
    let telSolicitante = this.editarOrden.get('telSolicitante').value;
    let direccionSolicitante = this.editarOrden.get('direccionSolicitante').value;
    let contactoSolicitante = this.editarOrden.get('contactoSolicitante').value.label;
    let emailSolicitante = this.editarOrden.get('emailSolicitante').value;
    let unidadNegocios = this.editarOrden.get('unidadNegocios').value;
    let nombreCECO = this.editarOrden.get('nombreCECO').value.nombre;
    let numeroCECO = this.editarOrden.get('numeroCECO').value;
    let razonSocial = this.editarOrden.get('razonSocial').value;
    let nitProveedor = this.editarOrden.get('nitProveedor').value;
    let ciudadProveedor = this.editarOrden.get('ciudadProveedor').value;
    let telProveedor = this.editarOrden.get('telProveedor').value;
    let direccionProveedor = this.editarOrden.get('direccionProveedor').value;
    let contactoProveedor = this.editarOrden.get('contactoProveedor').value;
    let regimen = this.editarOrden.get('regimen').value;
    let rut = this.editarOrden.get('rut').value;
    let camara = this.editarOrden.get('camara').value;
    let descripcionServicios = this.editarOrden.get('descripcionServicios').value;
    let cliente = this.editarOrden.get('cliente').value;
    let job = this.editarOrden.get('job').value;
    let precio = this.editarOrden.get('precio').value;
    let iva = this.editarOrden.get('iva').value;
    let total = this.editarOrden.get('total').value;
    let valorLetras = this.editarOrden.get('valorLetras').value;
    let fechaInicio = this.editarOrden.get('fechaInicio').value;
    let fechaFinal = this.editarOrden.get('fechaFinal').value;
    let totalDias = this.editarOrden.get('totalDias').value;
    let formaPago = this.editarOrden.get('formaPago').value;
    let fechaPago = this.editarOrden.get('fechaPago').value;
    let Pago1 = this.editarOrden.get('Pago1').value;
    let Pago2 = this.editarOrden.get('Pago2').value;
    let Pago3 = this.editarOrden.get('Pago3').value;
    let Pago4 = this.editarOrden.get('Pago4').value;
    let Pago5 = this.editarOrden.get('Pago5').value;
    let Pago6 = this.editarOrden.get('Pago6').value;
    let garantia = this.editarOrden.get('garantia').value;
    let porcentajeCumplimiento = this.editarOrden.get('porcentajeCumplimiento').value;
    let mesesCumplimiento = this.editarOrden.get('mesesCumplimiento').value;
    let porcentajeAnticipos = this.editarOrden.get('porcentajeAnticipos').value;
    let mesesAnticipos = this.editarOrden.get('mesesAnticipos').value;
    let porcentajeSalarios = this.editarOrden.get('porcentajeSalarios').value;
    let mesesSalarios = this.editarOrden.get('mesesSalarios').value;
    let porcentajeResponsabilidad = this.editarOrden.get('porcentajeResponsabilidad').value;
    let porcentajeCalidad = this.editarOrden.get('porcentajeCalidad').value;
    let mesesCalidad1 = this.editarOrden.get('mesesCalidad1').value;
    let mesesCalidad2 = this.editarOrden.get('mesesCalidad2').value;
    let polizaVida = this.editarOrden.get('polizaVida').value;
    let polizaVehiculos = this.editarOrden.get('polizaVehiculos').value;
    let tieneIva = this.editarOrden.get('tieneIva').value;
    let responsableActual = this.usuarioActual.IdJefeDirecto;
    let usuarioSolicitante = this.usuarioActual.id;
    let objOrden;
    let objServicio;
    let porcentajeAsumido = this.editarOrden.get('porcentajeAsumido').value;
    let personaNatural = this.editarOrden.get('persona').value;
    let valorxdia = this.editarOrden.get('valorPorDia').value;
    let diasxmes = this.editarOrden.get('diasPorMes').value;
    let valorxmes = this.editarOrden.get('valorServicioPorMes').value;
    let valorBase = this.editarOrden.get('baseCotizacion').value;
    let afiliacion = this.editarOrden.get('afiliacion').value;
    let conceptoPagoUnico = this.editarOrden.get('conceptoUnico').value;
    let NivelRiesgo = this.editarOrden.get('nivelRiesgo').value;
    let porcentajeRiesgo = this.editarOrden.get('porcentajeRiesgo').value;
    let pagoAfiliacion = this.editarOrden.get('pagoAfiliacion').value;
    let comentarios = this.editarOrden.get('comentariosArl').value;
    let porcentajePago1 = this.editarOrden.get('porcentajePago1').value;
    let porcentajePago2 = this.editarOrden.get('porcentajePago2').value;
    let porcentajePago3 = this.editarOrden.get('porcentajePago3').value;
    let porcentajePago4 = this.editarOrden.get('porcentajePago4').value;
    let porcentajePago5 = this.editarOrden.get('porcentajePago5').value;
    let porcentajePago6 = this.editarOrden.get('porcentajePago6').value;
    let conceptoPago1 = this.editarOrden.get('conceptoPago1').value;
    let conceptoPago2 = this.editarOrden.get('conceptoPago2').value;
    let conceptoPago3 = this.editarOrden.get('conceptoPago3').value;
    let conceptoPago4 = this.editarOrden.get('conceptoPago4').value;
    let conceptoPago5 = this.editarOrden.get('conceptoPago5').value;
    let conceptoPago6 = this.editarOrden.get('conceptoPago6').value;

    porcentajePago1 === null ? porcentajePago1 = "" : porcentajePago1 = porcentajePago1;
    porcentajePago2 === null ? porcentajePago2 = "" : porcentajePago2 = porcentajePago2;
    porcentajePago3 === null ? porcentajePago3 = "" : porcentajePago3 = porcentajePago3;
    porcentajePago4 === null ? porcentajePago4 = "" : porcentajePago4 = porcentajePago4;
    porcentajePago5 === null ? porcentajePago5 = "" : porcentajePago5 = porcentajePago5;
    porcentajePago6 === null ? porcentajePago6 = "" : porcentajePago6 = porcentajePago6;
    conceptoPago1 === null ? conceptoPago1 = "" : conceptoPago1 = conceptoPago1;
    conceptoPago2 === null ? conceptoPago2 = "" : conceptoPago2 = conceptoPago2;
    conceptoPago3 === null ? conceptoPago3 = "" : conceptoPago3 = conceptoPago3;
    conceptoPago4 === null ? conceptoPago4 = "" : conceptoPago4 = conceptoPago4;
    conceptoPago5 === null ? conceptoPago5 = "" : conceptoPago5 = conceptoPago5;
    conceptoPago6 === null ? conceptoPago6 = "" : conceptoPago6 = conceptoPago6;

    if (regimen === "") {
      this.MensajeAdvertencia('debe seleccionar el regimen');
      this.spinner.hide();
      return false;
    }

    if (garantia === "") {
      this.MensajeAdvertencia('Debe seleccionar si tiene garantías');
      this.spinner.hide()
      return false;
    }

    if (rut === "" && camara === "") {
      this.MensajeAdvertencia('Debe seleccionar el RUT o la Cámara de comercio')
      this.spinner.hide();
      return false;
    }

    tieneIva === "" ? tieneIva = false : tieneIva = true;
    rut === "" ? rut = false : rut = rut;
    camara === "" ? camara = false : camara = camara;
    fechaPago === "" ? fechaPago = null : fechaPago = fechaPago;
    Pago1 === "" ? Pago1 = null : Pago1 = Pago1;
    Pago2 === "" ? Pago2 = null : Pago2 = Pago2;
    Pago3 === "" ? Pago3 = null : Pago3 = Pago3;
    Pago4 === "" ? Pago4 = null : Pago4 = Pago4;
    Pago5 === "" ? Pago5 = null : Pago5 = Pago5;
    Pago6 === "" ? Pago6 = null : Pago6 = Pago6;
    valorxdia === '' ? valorxdia = 0 : valorxdia = parseInt(valorxdia);
    valorxmes === '' ? valorxmes = 0 : valorxmes = parseInt(valorxmes);
    valorBase === '' ? valorBase = 0 : valorBase = parseInt(valorBase);
    afiliacion === 'false' ? afiliacion = false : afiliacion = true;
    personaNatural === 'true' ? personaNatural = true : personaNatural = false; 

    if (formaPago === 'Único' && fechaPago === null) {
      this.MensajeAdvertencia('Seleccione la fecha de pago');
      this.spinner.hide();
      return false;
    }

    if (formaPago === 'Varios' && (Pago1 === null || Pago2 === null)) {
      this.MensajeAdvertencia('Se deben especificar al menos 2 fechas de pago cuando no es pago único');
      this.spinner.hide();
      return false;
    }

    garantia === 'true' ? garantia = true : garantia = false;
    polizaVida === 'true' ? polizaVida = true : polizaVida = false;
    polizaVehiculos === "true" ? polizaVehiculos = true : polizaVehiculos = false;

    objOrden = {
      Title: empresaSolicitante,
      NroOrden: nroOrden,
      NitSolicitante: nitSolicitante,
      CiudadSolicitante: ciudadSolicitante,
      TelSolicitante: telSolicitante,
      DireccionSolicitante: direccionSolicitante,
      ContactoSolicitante: contactoSolicitante,
      EmailContactoSolicitante: emailSolicitante,
      UnidadNegocios: unidadNegocios,
      NombreCECO: nombreCECO,
      NumeroCECO: numeroCECO,
      RazonSocial: razonSocial,
      NitProveedor: nitProveedor,
      CiudadProveedor: ciudadProveedor,
      TelProveedor: telProveedor,
      DireccionProveedor: direccionProveedor,
      ContactoProveedor: contactoProveedor,
      Regimen: regimen,
      Rut: rut,
      CamaraComercio: camara,
      DescripcionServicio: descripcionServicios,
      Cliente: cliente,
      NroJob: job,
      Precio: precio,
      TieneIva: tieneIva,
      Iva: iva,
      Total: total,
      FechaInicio: fechaInicio,
      FechaFin: fechaFinal,
      TotalDias: totalDias,
      ValorLetras: valorLetras,
      FormaPago: formaPago,
      FechaPago: fechaPago,
      Fecha1erPago: Pago1,
      Fecha2doPago: Pago2,
      Fecha3erPago: Pago3,
      Fecha4toPago: Pago4,
      Fecha5toPago: Pago5,
      Fecha6toPago: Pago6,
      PorcentajeCumplimiento: porcentajeCumplimiento,
      MesesCumplimiento: mesesCumplimiento,
      PorcentajePagoSalarios: porcentajeSalarios,
      AniosPagoSalarios: mesesSalarios,
      PorcentajeResponsabilidadCivil: porcentajeResponsabilidad,
      PorcentajeManejoAnticipos: porcentajeAnticipos,
      MesesManejoAnticipos: mesesAnticipos,
      PorcentajeCalidadServicio: porcentajeCalidad,
      ValidezCalidadServicio: mesesCalidad1,
      ExtensionCalidadServicio: mesesCalidad2,
      PolizaColectiva: polizaVida,
      PolizaVehiculos: polizaVehiculos,
      Garantia: garantia,
      Estado: 'Pendiente de aprobación gerente unidad de negocios',
      ResponsableActualId: responsableActual,
      UsuarioSolicitanteId: usuarioSolicitante,
      PorcentajeAsumido: parseInt(porcentajeAsumido),
      MotivoRechazo: "",
      PersonaNatural: personaNatural,
      ValorPorDia: valorxdia,
      DiasPorMes: `${diasxmes}`,
      ValorPorMes: valorxmes,
      BaseCotizacion: valorBase,
      RequiereAfiliacion: afiliacion,
      PorcentajeRiesgo: porcentajeRiesgo,
      NivelRiesgo: NivelRiesgo,
      ComentariosArl: comentarios,
      PagoAfiliacion: pagoAfiliacion,
      ConceptoPagoUnico: conceptoPagoUnico,
      PorcentajePago1: porcentajePago1,
      PorcentajePago2: porcentajePago2,
      PorcentajePago3: porcentajePago3,
      PorcentajePago4: porcentajePago4,
      PorcentajePago5: porcentajePago5,
      PorcentajePago6: porcentajePago6,
      ConceptoPago1: conceptoPago1,
      ConceptoPago2: conceptoPago2,
      ConceptoPago3: conceptoPago3,
      ConceptoPago4: conceptoPago4,
      ConceptoPago5: conceptoPago5,
      ConceptoPago6: conceptoPago6
    }

    objServicio = {
      TipoServicio: 'Orden de servicio',
      CodigoServicioId: 4,
      AutorId: usuarioSolicitante,
      ResponsableActualId: responsableActual,
      Estado: "Pendiente de aprobación gerente unidad de negocios",
      idServicio: id
    }

    if (this.editarOrden.invalid) {
      this.MensajeAdvertencia('Hay campos requeridos sin diligenciar. Por favor verifique');
      this.spinner.hide();
    }
        let cuerpo = '<p>Cordial saludo</p>' +
        '<br>' +
        '<p>El usuario <strong>' + this.usuarioActual.nombre + '</strong> ha generado una nueva orden de servicio con el número <strong>' + this.editarOrden.get('nroOrden').value + '</strong> para su aprobación</p>' +
        '<br>' +
        '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios" target="_blank">aquí</a>.</p>' +
        '<p>En caso de que el acceso no lo dirija a página por favor copie la siguiente url en el navegador:</p>' +
        'https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios';

      const emailProps: EmailProperties = {
        To: [this.usuarioActual.EmailJefeDirecto],
        Subject: "Notificación de orden de servicio",
        Body: cuerpo,
      };
      this.servicio.ActualizarOrden(id, objOrden).then(
        (respuesta) => {
          this.servicio.ObtenerServicio(id).then(
            (respuesta1) => {
              this.servicio.ModificarServicio(objServicio, respuesta1[0].ID).then(
                async (respuesta) => {
                  let ans = await this.guardarCecos();
                  this.MensajeExitoso('La orden se guardó con éxito');
                  this.servicio.EnviarNotificacion(emailProps).then(
                    (res) => {
                      this.MensajeInfo("Se ha enviado una notificación para aprobación");
                      this.spinner.hide();
                      setTimeout(
                        () => {
                          window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                          // this.spinnerService.hide();
                        }, 2000);
                    }
                  )
                }
              )
            }
          )
        }
      )  
  }

  async guardarCecos(): Promise<any> {
    for (let index = 0; index < this.arrayCecos.length; index++) {
      const element = this.arrayCecos[index];
      let objCecos = {
        Ceco: element.nroCeco,
        Nombre: element.ceco,
        PorcentajeAsumido: element.porcentaje,
        OrdenServicioId: parseInt(this.IdRegistroOS),
        DirectorCecoId: element.director
      }
      let resultado = await this.enviarCecos(objCecos);
    }
    return "ok";
  }

  async enviarCecos(objCecos): Promise<any> {
    let resultado = "";
    await this.servicio.AgregarCecos(objCecos).then(
      (respuesta) => {
        resultado = 'OK';
      }).catch(
        (error) => {
          console.log(error);
          resultado = 'error';
        }
      );
    return Promise.resolve(resultado);
  }

  MensajeExitoso(mensaje: string) {
    this.toastr.successToastr(mensaje, 'Confirmado!');
  }

  MensajeError(mensaje: string) {
    this.toastr.errorToastr(mensaje, 'Oops!');
  }

  MensajeAdvertencia(mensaje: string) {
    this.toastr.warningToastr(mensaje, 'Alert!');
  }

  MensajeInfo(mensaje: string) {
    this.toastr.infoToastr(mensaje, 'Info');
  }

}
