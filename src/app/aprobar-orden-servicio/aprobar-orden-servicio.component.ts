import { Component, OnInit, TemplateRef  } from '@angular/core';
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
import { PorcentajeCecos } from '../dominio/porcentajeCecos'
import { Documento } from '../dominio/documento';

@Component({
  selector: 'app-aprobar-orden-servicio',
  templateUrl: './aprobar-orden-servicio.component.html',
  styleUrls: ['./aprobar-orden-servicio.component.css']
})
export class AprobarOrdenServicioComponent implements OnInit {

  aprobarOrdenServicios: FormGroup;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  pagoCECO: boolean
  pagoUnico: boolean;
  pagoVarios: boolean;
  garantia: boolean;
  unegocios: Unegocios[] = [];
  config: Configuracion[] = [];
  ivaCalculado: number;
  total: number;
  precio: number;
  orden: Orden[] = [];
  ordenConsulta: Orden[]= [];
  mostrarGarantia: boolean;
  nombreUsuario: any;
  nombre: any;
  emailUsuario: any;
  emailSolicitante: any;
  idUsuario: number;
  firmaJefe: any[];
  cargarFirmajefe: any[];
  cargarFirmaGerente: any[];
  cargarFirmaDirector: any[];
  firmaDirectorCeco: any[];
  cargarFirmaDirectorCeco: any[];
  firmaUsuario: any[];
  firmaGerenteAdmin: any[];
  firmaDirector: any[];
  usuarioActual: Usuario;
  empleadoEditar: Empleado[] = [];
  jefe;
  empleado: Empleado[] = []
  gerenteUnegocios: string;
  fechaAprobadoGerenteUnegocios: any;
  gerenteAdministrativo: string;
  directorOperativo: string;
  responsableGerenteAdminisitrativo: string;
  responsableDirectorOperativo: string;
  responsableAuxContabilidad: string;
  modalRef: BsModalRef;
  rechazado: boolean;
  fechaAprobadoGerenteAdministrativo: any;
  fechaAprobadoDirector: any;
  aprobadores: Aprobadores[] = [];
  emailGerenteAdministrativo: string;
  emailDirectorOperativo: string;
  emailAuxiliarContabilidad: string;
  ordenNro: any;
  usuarioAprueba: boolean;
  usuarioRechaza: boolean;
  esResponsableActual: boolean = false;
  esSolicitante: boolean;
  IdRegistroOS: string;
  ObjServicio: any;
  NumeroOrden: any;
  esConsultores: boolean = false;
  esAsociados: boolean = false;
  solicitante: any;
  participacionCecos: PorcentajeCecos[] = [];
  porAprobar: any = [];
  aprobado: any = [];
  emailDirectorCeco: string;
  directorResponsable: any;
  nombreDirector: string;
  fechaAprobado: string;
  idParticipacion: number;
  FirmasCECOS: any;
  aprobadorActual: any = [];
  personaNatural: boolean;
  afiliar: boolean;
  mostrarBotonesAprobarRechazar: boolean;
  documentoPropuesta: Documento[] = [];
  mostrarBtn: boolean = true;
  otroSi: string = '';


  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.ObtenerUsuarioActual();
    this.mostrarGarantia = false;
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.rechazado = false;
    this.usuarioAprueba = false;
    this.usuarioRechaza = false;
    this.mostrarBotonesAprobarRechazar = true;
    this.registrarControles();        
    this.obtenerDatosAprobadores();
    this.aprobarOrdenServicios.controls['porcentajeCotizacion'].setValue('40%');
  }

  private registrarControles() {
    this.aprobarOrdenServicios = this.fb.group({
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
      emailProveedor: [''],
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
      porcentajeCeco1: [''],
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
      motivoRechazo: [''],
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
      conceptoPago6: [''],
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
        this.obtenerInfoEmpleado();
        this.obtenerOrden();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };

  obtenerInfoEmpleado() {
    let idUser = this.usuarioActual.id;
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUser).subscribe(
      (respuesta) => {
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        this.jefe = respuesta[0].JefeId
      }
    )
  }

  obtenerOrden() {
    this.IdRegistroOS = sessionStorage.getItem("IdServicio");
    this.servicio.obtenerOrden(this.IdRegistroOS).subscribe(
      (respuesta) => {
        this.orden = Orden.fromJsonList(respuesta);
        this.emailSolicitante = respuesta[0].UsuarioSolicitante.EMail;
        this.solicitante = this.orden[0].usuarioSolicitante;
        if(this.orden[0].esOtroSi === true) {
          this.otroSi = '(Otro sí)'
        }
        if( this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
          this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url
        }
        else if(this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
          this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url
        }
        else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
          this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url
          this.cargarFirmaGerente = respuesta[0].FirmaGerenteAdministrativo.Url
        }
        this.ordenNro = this.aprobarOrdenServicios.get('nroOrden').value;
        this.valoresPorDefecto();
        this.cargarValoresFirma();
        this.obtenerfirmaUsuario();
        this.obtenerParametroAprobacion();
        this.obtenerParticipacionCecos();
        this.obtenerDocumentos();
      }
    )
  }

  obtenerDocumentos() {
    let id = this.orden[0].id
    this.servicio.obtenerDocumentos(id).then(
      (respuesta) => {
        this.documentoPropuesta = Documento.fromJsonList(respuesta);
        console.log(this.documentoPropuesta);
        this.documentoPropuesta.length === 0 ? this.mostrarBtn = false: this.mostrarBtn = true;
      }
    ).catch(
      error => {
        console.log('Error obteniendo los documentos: ' + error);
      }
    )
  }

  abrirDocumento() {
    window.open(this.documentoPropuesta[0].rutaArchivo, '_blank');
  }

  obtenerParametroAprobacion() {
    this.servicio.obtenerConsecutivoInciail().then(
      (respuesta) => {
       this.config = Configuracion.fromJsonList(respuesta);
      }
    )
  }

  obtenerParticipacionCecos() {
    this.servicio.obtenerParticipacion(this.IdRegistroOS).then(
      (respuesta) => {
        this.participacionCecos = PorcentajeCecos.fromJsonList(respuesta);
        this.porAprobar =  this.participacionCecos.filter(x => x.aprobado === false && x.director.ID !== this.usuarioActual.id);
        this.aprobado = this.participacionCecos.filter(x => x.aprobado === true)
        if (this.porAprobar.length > 0) {
          this.emailDirectorCeco = this.porAprobar[0].director.EMail;
          this.directorResponsable = this.porAprobar[0].director;
        }
        let arr;
        arr = this.participacionCecos.filter(x => x.director.ID === this.usuarioActual.id);
        if (arr.length > 0) {
          this.idParticipacion = arr[0].id;
        }
      }
    )
  }

  disableButtons():void {
    this.aprobarOrdenServicios.controls['regimen'].disable();
    this.aprobarOrdenServicios.controls['rut'].disable();
    this.aprobarOrdenServicios.controls['camara'].disable();
    this.aprobarOrdenServicios.controls['formaPago'].disable();
    this.aprobarOrdenServicios.controls['garantia'].disable();
    this.aprobarOrdenServicios.controls['polizaVida'].disable();
    this.aprobarOrdenServicios.controls['polizaVehiculos'].disable();
    this.aprobarOrdenServicios.controls['tieneIva'].disable();
    this.aprobarOrdenServicios.controls['fechaInicio'].disable();
    this.aprobarOrdenServicios.controls['fechaFinal'].disable();
    this.aprobarOrdenServicios.controls['fechaPago'].disable();
    this.aprobarOrdenServicios.controls['Pago1'].disable();
    this.aprobarOrdenServicios.controls['Pago2'].disable();
    this.aprobarOrdenServicios.controls['Pago3'].disable();
    this.aprobarOrdenServicios.controls['Pago4'].disable();
    this.aprobarOrdenServicios.controls['Pago5'].disable();
    this.aprobarOrdenServicios.controls['Pago6'].disable();
    this.aprobarOrdenServicios.controls['Pago1'].disable();
    this.aprobarOrdenServicios.controls['persona'].disable();
    this.aprobarOrdenServicios.controls['afiliacion'].disable();
    this.aprobarOrdenServicios.controls['pagoAfiliacion'].disable();
  }

  obtenerDatosAprobadores() {
    this.servicio.obtenerAprobadores().then(
      (respuesta) => {
       this.emailGerenteAdministrativo = respuesta[0].GerenteAdministrativo.EMail;
       this.emailDirectorOperativo = respuesta[0].DirectorOperativo.EMail;
       this.emailAuxiliarContabilidad = respuesta[0].AuxiliarContabilidad.EMail;
       this.responsableGerenteAdminisitrativo = respuesta[0].GerenteAdministrativo.ID;
       this.responsableDirectorOperativo = respuesta[0].DirectorOperativo.ID;
       this.responsableAuxContabilidad = respuesta[0].AuxiliarContabilidad.ID;
      }
    )
  }

  valoresPorDefecto() {
    // this.aprobarOrdenServicios.controls['nroOrden'].setValue(this.orden[0].nroOrden);
    this.aprobarOrdenServicios.controls['empresaSolicitante'].setValue(this.orden[0].empresaSolicitante);
    this.aprobarOrdenServicios.controls['nitSolicitante'].setValue(this.orden[0].nitSolicitante);
    this.aprobarOrdenServicios.controls['ciudadSolicitante'].setValue(this.orden[0].ciudadSolicitante);
    this.aprobarOrdenServicios.controls['telSolicitante'].setValue(this.orden[0].telSolicitante);
    this.aprobarOrdenServicios.controls['direccionSolicitante'].setValue(this.orden[0].direccionSolicitante);
    this.aprobarOrdenServicios.controls['contactoSolicitante'].setValue(this.orden[0].contactoSolicitante);
    this.aprobarOrdenServicios.controls['emailSolicitante'].setValue(this.orden[0].emailSolicitante);
    this.aprobarOrdenServicios.controls['unidadNegocios'].setValue(this.orden[0].uNegocios);
    this.aprobarOrdenServicios.controls['nombreCECO'].setValue(this.orden[0].nombreCECO);
    this.aprobarOrdenServicios.controls['numeroCECO'].setValue(this.orden[0].numeroCECO);
    this.aprobarOrdenServicios.controls['razonSocial'].setValue(this.orden[0].razonSocial);
    this.aprobarOrdenServicios.controls['nitProveedor'].setValue(this.orden[0].nitProveedor);
    this.aprobarOrdenServicios.controls['ciudadProveedor'].setValue(this.orden[0].ciudadProveedor);
    this.aprobarOrdenServicios.controls['telProveedor'].setValue(this.orden[0].telProveedor);
    this.aprobarOrdenServicios.controls['direccionProveedor'].setValue(this.orden[0].direccionProveedor);
    this.aprobarOrdenServicios.controls['contactoProveedor'].setValue(this.orden[0].contactoProveedor);
    this.aprobarOrdenServicios.controls['emailProveedor'].setValue(this.orden[0].emailProveedor);
    this.aprobarOrdenServicios.controls['regimen'].setValue(this.orden[0].regimen);
    this.aprobarOrdenServicios.controls['rut'].setValue(this.orden[0].rut);
    this.aprobarOrdenServicios.controls['camara'].setValue(this.orden[0].camara);
    this.aprobarOrdenServicios.controls['descripcionServicios'].setValue(this.orden[0].descripcion);
    this.aprobarOrdenServicios.controls['cliente'].setValue(this.orden[0].cliente);
    this.aprobarOrdenServicios.controls['job'].setValue(this.orden[0].job);
    this.aprobarOrdenServicios.controls['precio'].setValue(this.orden[0].precio);
    this.aprobarOrdenServicios.controls['tieneIva'].setValue(this.orden[0].tieneIva);
    this.aprobarOrdenServicios.controls['iva'].setValue(this.orden[0].iva);
    this.aprobarOrdenServicios.controls['total'].setValue(this.orden[0].total);
    this.aprobarOrdenServicios.controls['valorLetras'].setValue(this.orden[0].valorLetras);
    this.aprobarOrdenServicios.controls['fechaInicio'].setValue(this.orden[0].fechaInicio);
    this.aprobarOrdenServicios.controls['fechaFinal'].setValue(this.orden[0].fechaFin);
    this.aprobarOrdenServicios.controls['totalDias'].setValue(this.orden[0].totalDias);
    this.aprobarOrdenServicios.controls['formaPago'].setValue(this.orden[0].formaPago);
    this.aprobarOrdenServicios.controls['fechaPago'].setValue(this.orden[0].fechaPago);
    this.aprobarOrdenServicios.controls['Pago1'].setValue(this.orden[0].fecha1erPago);
    this.aprobarOrdenServicios.controls['Pago2'].setValue(this.orden[0].fecha2doPago);
    this.aprobarOrdenServicios.controls['Pago3'].setValue(this.orden[0].fecha3erPago);
    this.aprobarOrdenServicios.controls['Pago4'].setValue(this.orden[0].fecha4toPago);
    this.aprobarOrdenServicios.controls['Pago5'].setValue(this.orden[0].fecha5toPago);
    this.aprobarOrdenServicios.controls['Pago6'].setValue(this.orden[0].fecha6toPago);
    this.aprobarOrdenServicios.controls['porcentajePago1'].setValue(this.orden[0].porcentajePago1);
    this.aprobarOrdenServicios.controls['porcentajePago2'].setValue(this.orden[0].porcentajePago2);
    this.aprobarOrdenServicios.controls['porcentajePago3'].setValue(this.orden[0].porcentajePago3);
    this.aprobarOrdenServicios.controls['porcentajePago4'].setValue(this.orden[0].porcentajePago4);
    this.aprobarOrdenServicios.controls['porcentajePago5'].setValue(this.orden[0].porcentajePago5);
    this.aprobarOrdenServicios.controls['porcentajePago6'].setValue(this.orden[0].porcentajePago6);
    this.aprobarOrdenServicios.controls['conceptoUnico'].setValue(this.orden[0].conceptoPagoUnico);
    this.aprobarOrdenServicios.controls['conceptoPago1'].setValue(this.orden[0].conceptoPago1);
    this.aprobarOrdenServicios.controls['conceptoPago2'].setValue(this.orden[0].conceptoPago2);
    this.aprobarOrdenServicios.controls['conceptoPago3'].setValue(this.orden[0].conceptoPago3);
    this.aprobarOrdenServicios.controls['conceptoPago4'].setValue(this.orden[0].conceptoPago4);
    this.aprobarOrdenServicios.controls['conceptoPago5'].setValue(this.orden[0].conceptoPago5);
    this.aprobarOrdenServicios.controls['conceptoPago6'].setValue(this.orden[0].conceptoPago6);
    this.aprobarOrdenServicios.controls['persona'].setValue(this.orden[0].personaNatural);
    this.aprobarOrdenServicios.controls['valorTotalServicio'].setValue(this.orden[0].total);
    this.aprobarOrdenServicios.controls['nroDias'].setValue(this.orden[0].totalDias);
    this.aprobarOrdenServicios.controls['valorPorDia'].setValue(this.orden[0].valorxdia);
    this.aprobarOrdenServicios.controls['diasPorMes'].setValue(this.orden[0].diasxmes);
    this.aprobarOrdenServicios.controls['valorServicioPorMes'].setValue(this.orden[0].valorxmes);
    this.aprobarOrdenServicios.controls['baseCotizacion'].setValue(this.orden[0].valorBase);
    this.aprobarOrdenServicios.controls['afiliacion'].setValue(this.orden[0].afiliacion);
    this.aprobarOrdenServicios.controls['nivelRiesgo'].setValue(this.orden[0].NivelRiesgo);
    this.aprobarOrdenServicios.controls['porcentajeRiesgo'].setValue(this.orden[0].porcentajeRiesgo);
    this.aprobarOrdenServicios.controls['pagoAfiliacion'].setValue(this.orden[0].pagoAfiliacion);
    this.aprobarOrdenServicios.controls['comentariosArl'].setValue(this.orden[0].comentarios);
    this.aprobarOrdenServicios.controls['ceco1'].setValue(this.orden[0].cecoResponsable1);
    this.aprobarOrdenServicios.controls['porcentajeCeco1'].setValue(this.orden[0].porcentajeResponsable1);
    this.aprobarOrdenServicios.controls['garantia'].setValue(this.orden[0].garantia);
    this.aprobarOrdenServicios.controls['porcentajeCumplimiento'].setValue(this.orden[0].porcentajeCumplimiento);
    this.aprobarOrdenServicios.controls['mesesCumplimiento'].setValue(this.orden[0].mesesCumplimiento);
    this.aprobarOrdenServicios.controls['porcentajeAnticipos'].setValue(this.orden[0].porcentajeManejoAnticipos);
    this.aprobarOrdenServicios.controls['mesesAnticipos'].setValue(this.orden[0].mesesManejoAnticipos);
    this.aprobarOrdenServicios.controls['porcentajeSalarios'].setValue(this.orden[0].porcentajePagoSalarios);
    this.aprobarOrdenServicios.controls['mesesSalarios'].setValue(this.orden[0].aniosPagoSalarios);
    this.aprobarOrdenServicios.controls['porcentajeResponsabilidad'].setValue(this.orden[0].porcentajeResposabilidadCivil);
    this.aprobarOrdenServicios.controls['porcentajeCalidad'].setValue(this.orden[0].porcentajeCalidad);
    this.aprobarOrdenServicios.controls['mesesCalidad1'].setValue(this.orden[0].validezCalidad);
    this.aprobarOrdenServicios.controls['mesesCalidad2'].setValue(this.orden[0].extensionCalidad);
    this.aprobarOrdenServicios.controls['polizaVida'].setValue(this.orden[0].polizaColectiva);
    this.aprobarOrdenServicios.controls['polizaVehiculos'].setValue(this.orden[0].polizaVehiculos);
    this.aprobarOrdenServicios.controls['porcentajeAsumido'].setValue(this.orden[0].porcentajeAsumido);
    this.NumeroOrden = this.orden[0].nroOrden;
    if (this.orden[0].ResponsableActual === this.usuarioActual.id) {
        this.esResponsableActual = true;
    }
    this.switchValores();
    this.disableButtons();
  }

  obtenerfirmaUsuario(): any {
    this.servicio.obtenerFirmas(this.usuarioActual.id).then(
      (respuesta)=>{
        console.log(respuesta);
        this.nombre = respuesta[0].Title;
        this.emailUsuario = respuesta[0].usuario.EMail;
        this.idUsuario = respuesta[0].usuarioId;
        if (respuesta[0].UrlFirma !== null) {
          this.firmaUsuario = respuesta[0].UrlFirma.Url;
          console.log(this.firmaUsuario);
        }       
      }
    ).catch(
      (error)=>{
        this.MensajeError("Error al cargar las firmas");
        console.log(error);
      }
    )
  }

  switchValores() {
    if(this.aprobarOrdenServicios.controls['empresaSolicitante'].value === 'Araujo Ibarra Consultores Internacionales S.A.S') {
      this.esConsultores = true;
    }
    else {
      this.esAsociados = true;
    }
    if (this.aprobarOrdenServicios.controls['formaPago'].value === 'Único') {
      this.pagoUnico = true;
      this.pagoVarios = false;
    }
    else {
      this.pagoVarios = true;
      this.pagoUnico = false;
    }
    
    if (this.aprobarOrdenServicios.controls['garantia'].value === true) {
      this.aprobarOrdenServicios.controls['garantia'].setValue('true');
      this.mostrarGarantia = true;
    }
    else {
      this.aprobarOrdenServicios.controls['garantia'].setValue('false');
    }
    if (this.aprobarOrdenServicios.controls['polizaVida'].value === true) {
      this.aprobarOrdenServicios.controls['polizaVida'].setValue('true');
    }
    else {
      this.aprobarOrdenServicios.controls['polizaVida'].setValue('false');
    }
    if (this.aprobarOrdenServicios.controls['polizaVehiculos'].value === true) {
      this.aprobarOrdenServicios.controls['polizaVehiculos'].setValue('true');
    }
    else {
      this.aprobarOrdenServicios.controls['polizaVehiculos'].setValue('false');
    }
    if(this.aprobarOrdenServicios.controls['persona'].value === true) {
      this.aprobarOrdenServicios.controls['persona'].setValue('true');
      this.personaNatural = true;
    }
    else {
      this.aprobarOrdenServicios.controls['persona'].setValue('false');
    }
    if(this.aprobarOrdenServicios.controls['afiliacion'].value === true) {
      this.aprobarOrdenServicios.controls['afiliacion'].setValue('true');
      this.afiliar = true;
    }
    else {
      this.aprobarOrdenServicios.controls['afiliacion'].setValue('false');
    }
  }

  cambiarValoresAprobado() {
    if (this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
      this.aprobado.push({ nombre: this.usuarioActual.nombre, firma: this.firmaUsuario, fechaAprobado: this.fechaAprobado });
    }
  }

  cargarValoresFirma() {
    if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
      this.firmaJefe = this.cargarFirmajefe;
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
    }

    else if(this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
      this.firmaJefe = this.cargarFirmajefe;
      console.log(this.firmaJefe);
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
    }

    else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
      this.firmaJefe = this.cargarFirmajefe;
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
      this.firmaGerenteAdmin = this.cargarFirmaGerente;
      this.gerenteAdministrativo = this.orden[0].nombreGerenteAdministrativo;
      this.fechaAprobadoGerenteAdministrativo = this.orden[0].fechaAprobadoGerenteAdministrativo;
    }
  }

  valoresFirma() {
    let fecha = new Date().toString();
    let fechaArray = fecha.split(' ');
    let fechaEdit = fechaArray[0] + ' ' + fechaArray[1] + ' ' + fechaArray[2] + ' ' + fechaArray[3];
    this.fechaAprobado = fechaEdit
    
    if(this.orden[0].estado === 'Pendiente de aprobación gerente unidad de negocios') {
      this.firmaJefe = this.firmaUsuario;
      this.gerenteUnegocios = this.nombreUsuario;
      this.fechaAprobadoGerenteUnegocios = fechaEdit;
    }
    else if(this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
      this.firmaDirectorCeco = this.firmaUsuario;
      this.nombreDirector = this.nombreUsuario;
      this.fechaAprobado = fechaEdit;
      
    }
    else if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
      this.firmaGerenteAdmin = this.firmaUsuario;
      this.gerenteAdministrativo = this.nombreUsuario;
      this.fechaAprobadoGerenteAdministrativo = fechaEdit;
    }
    else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
      this.firmaDirector = this.firmaUsuario;
      this.directorOperativo = this.nombreUsuario;
      this.fechaAprobadoDirector = fechaEdit;
    }
  }

  aprobar() {
    this.usuarioAprueba = true;
    this.aprobarOrdenServicios.controls['motivoRechazo'].setValue(""); 
    this.valoresFirma();
    this.cambiarValoresAprobado();
    this.MensajeInfo('La orden ha sido aprobada! Haga click en "Enviar" para terminar');
    this.mostrarBotonesAprobarRechazar = false;
  }

  rechazar() {
    if(this.aprobarOrdenServicios.get('motivoRechazo').value === ""){
      this.MensajeAdvertencia('Debe especificar el motivo de rechazo');
      return false;
    }
    else {
      this.gerenteUnegocios = ""
      this.fechaAprobadoGerenteUnegocios = ""
      this.firmaJefe = null;
      this.rechazado = true;
      this.usuarioRechaza = true;
      this.mostrarBotonesAprobarRechazar = false;
      this.MensajeInfo('La orden ha sido rechazada! Haga click en "Enviar" para terminar')
      this.modalRef.hide();
    }
  }

  cancelarRechazo() {
    this.aprobarOrdenServicios.controls['motivoRechazo'].setValue("");
    this.modalRef.hide();
  }

  cancelar() {
    setTimeout(
      () => {
        window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
      }, 500);
  }

  onSubmit() {
    this.spinner.show()
    let objOrden
    let id = this.orden[0].id
    let AprobadoResponsableUnidadNegocios = "true";
    let AprobadoGerenteAdministrativo = "true";
    let ordenServ;
    let ObjPorcentaje;
    let emailProps: EmailProperties;

    let cuerpo = '<p>Cordial saludo</p>' +
      '<br>' +
      '<p>La orden de servicio número <strong>' + this.NumeroOrden + '</strong> requiere de su aprobación</p>' +
      '<br>' +
      '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios" target="_blank">aquí</a>.</p>' +
      '<br>'
      '<p>En caso de que el acceso no lo dirija a página por favor copie esta url en el navegador:</p>' + 
      '<br>' +
      'https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios';  

    let cuerpoAprobado = '<p>Cordial saludo</p>' +
      '<br>' +
      '<p>La orden de servicio número <strong>' + this.NumeroOrden + '</strong> ha sido aprobada y está lista para continuar el proceso.</p>' +
      '<br>' +
      '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios" target="_blank">aquí</a>.</p>' +
      '<br>' +
      '<p>En caso de que el acceso no lo dirija a página por favor copie esta url en el navegador:</p>' + 
      '<br>' +
      'https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios'

    let cuerpoRechazado = '<p>Cordial saludo</p>' +
        '<br>' +
        '<p>La orden de servicio número <strong>' + this.NumeroOrden + '</strong> ha sido rechazada por el usuario <strong>' + this.usuarioActual.nombre + '</strong> por el motivo <strong>"' + this.aprobarOrdenServicios.get('motivoRechazo').value + '"</strong></p>' +
        '<br>' +
        '<p>Si necesita más información por favor comuníquese con el responsable del rechazo.</p>'; 

    if(this.rechazado === true) {
      // let id = this.participacionCecos[0].id
      let iDborrar = parseInt(this.IdRegistroOS);
      objOrden = {
        Estado: 'Rechazado',
        MotivoRechazo: this.aprobarOrdenServicios.get('motivoRechazo').value,
        ResponsableActualId: this.solicitante
      }
      emailProps = {
        To: [this.emailSolicitante],
        Subject: "Notificación de orden de servicio",
        Body: cuerpoRechazado,
      };
      ordenServ = {
        ResponsableActualId: this.solicitante,
        Estado: "Rechazado"
      }
      ObjPorcentaje = {
    
      }
      if (this.participacionCecos.length > 0) {
        this.servicio.obtenerParticipacion(iDborrar).then(
          (respuesta) => {
            console.log(respuesta)
            respuesta.forEach(element => {
              this.servicio.borrarCecos(element.ID);
            });
            this.MensajeInfo('Se eliminaron los cecos')
          }
        ).catch(
            (error) => {
              console.log(error);
            }
          );
      }
    }

    else if (this.orden[0].estado === 'Pendiente de aprobación gerente unidad de negocios') {
      let url = this.firmaUsuario
      if(this.porAprobar.length > 0){
        objOrden = {
          Estado: 'Pendiente de aprobación Director CECO',
          ResponsableActualId: this.directorResponsable.ID,
          AprobadoResponsableUnidadNegocio: AprobadoResponsableUnidadNegocios,
          FechaAprobadoGerenteUnegocios: this.fechaAprobadoGerenteUnegocios,
          NombreGerenteUnegocios: this.usuarioActual.nombre,
          FirmaResponsableUnidadNegocios: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": "Firma gerente unidad de negocios",
            "Url": url
          }
        }
        emailProps = {
          To: [this.directorResponsable.EMail],
          Subject: 'Notificación orden de servicio',
          Body: cuerpo
        }
        ordenServ = {
          ResponsableActualId: this.directorResponsable.ID,
          Estado: 'Pendiente de aprobación Director CECO'
        }
        ObjPorcentaje = {
          Aprobado: true,
          FirmaCeco: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": "Firma director CECO",
            "Url": url
          }
        }
      }
      else {
        objOrden = {
          Estado: 'Pendiente aprobación gerente administrativo y financiero',
          ResponsableActualId: this.responsableGerenteAdminisitrativo,
          AprobadoResponsableUnidadNegocio: AprobadoResponsableUnidadNegocios,
          FechaAprobadoGerenteUnegocios: this.fechaAprobadoGerenteUnegocios,
          NombreGerenteUnegocios: this.usuarioActual.nombre,
          FirmaResponsableUnidadNegocios: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": "Firma gerente unidad de negocios",
            "Url": url
          }
        }
        emailProps = {
          To: [this.emailGerenteAdministrativo],
          Subject: "Notificación de orden de servicio",
          Body: cuerpo
        };
        ordenServ = {
          ResponsableActualId: this.responsableGerenteAdminisitrativo,
          Estado: "Pendiente aprobación gerente administrativo y financiero",
        }
      }
    }

    else if(this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
      let url = this.firmaUsuario
      if(this.porAprobar.length > 0){
        objOrden = {
          Estado: 'Pendiente de aprobación Director CECO',
          ResponsableActualId: this.directorResponsable.ID
        }
        emailProps = {
          To: [this.directorResponsable.EMail],
          Subject: 'Notificación orden de servicio',
          Body: cuerpo
        }
        ordenServ = {
          ResponsableActualId: this.directorResponsable.ID,
          Estado: 'Pendiente de aprobación Director CECO'
        }
        ObjPorcentaje = {
          Aprobado: 'true',
          FirmaCeco: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": "Firma director CECO",
            "Url": url
          },
          FechaAprobacion: this.fechaAprobado
        }
      }
      else {
        objOrden = {
          Estado: 'Pendiente aprobación gerente administrativo y financiero',
          ResponsableActualId: this.responsableGerenteAdminisitrativo,
        }
        emailProps = {
          To: [this.emailGerenteAdministrativo],
          Subject: 'Notificación orden de servicio',
          Body: cuerpo
        }
        ordenServ = {
          ResponsableActualId: this.responsableGerenteAdminisitrativo,
          Estado: 'Pendiente de aprobación Director CECO'
        }
        ObjPorcentaje = {
          Aprobado: true,
          FirmaCeco: {
            "__metadata": { "type": "SP.FieldUrlValue" },
            "Description": "Firma director CECO",
            "Url": url
          },
          FechaAprobacion: this.fechaAprobado
        }
      }
    }

    else if (this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero' && this.aprobarOrdenServicios.get('total').value >= this.config[0].parametroAprobacion) {
      let url = this.firmaGerenteAdmin;
      objOrden = {
        Estado: 'Pendiente aprobación director operativo',
        ResponsableActualId: this.responsableDirectorOperativo,
        AprobadoGerenteAdministrativo: AprobadoGerenteAdministrativo,
        FechaAprobadoGerenteAdministrati: this.fechaAprobadoGerenteAdministrativo,
        NombreGerenteAdministrativo: this.gerenteAdministrativo,
        FirmaGerenteAdministrativo: {
          "__metadata": { "type": "SP.FieldUrlValue" },
          "Description": "Firma gerente administrativo",
          "Url": url
         }
      }
      emailProps = {
        To: [this.emailDirectorOperativo],
        Subject: "Notificación de orden de servicio",
        Body: cuerpo,
      };
      ordenServ = {
        ResponsableActualId: this.responsableDirectorOperativo,
        Estado: "Pendiente aprobación director operativo",
      }
    }

   else if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero' && this.aprobarOrdenServicios.get('total').value < this.config[0].parametroAprobacion) {
      let url = this.firmaGerenteAdmin;
      objOrden = {
        Estado: 'Aprobado',
        ResponsableActualId: this.responsableAuxContabilidad,
        AprobadoGerenteAdministrativo: AprobadoGerenteAdministrativo,
        FechaAprobadoGerenteAdministrati: this.fechaAprobadoGerenteAdministrativo,
        NombreGerenteAdministrativo: this.usuarioActual.nombre,
        FirmaGerenteAdministrativo: {
          "__metadata": { "type": "SP.FieldUrlValue" },
          "Description": "Firma gerente administrativo",
          "Url": url
         }
      }
      emailProps = {
        To: [this.emailAuxiliarContabilidad],
        Subject: "Notificación de orden de servicio",
        Body: cuerpoAprobado,
      };
      ordenServ = {
        ResponsableActualId: this.responsableAuxContabilidad,
        Estado: "Aprobado",
      }
    }

  else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
      let url = this.firmaDirector
      objOrden = {
        Estado: 'Aprobado',
        ResponsableActualId: this.responsableAuxContabilidad,
        AprobadoDirectorOperativo: true,
        FechaAprobadoDirectorOperativo: this.fechaAprobadoDirector,
        NombreDirectorOperativo: this.directorOperativo,
        FirmaDirectorOperativo: {
          "__metadata": { "type": "SP.FieldUrlValue" },
          "Description": "Firma director operativo",
          "Url": url
         }
      }
      emailProps = {
        To: [this.emailAuxiliarContabilidad],
        Subject: "Notificación de orden de servicio",
        Body: cuerpoAprobado,
      };
      ordenServ = {
        ResponsableActualId: this.responsableAuxContabilidad,
        Estado: "Aprobado",
      }
    }

    if(this.usuarioAprueba === false && this.usuarioRechaza === false) {
      this.MensajeAdvertencia('Debe aprobar o rechazar esta orden antes de poder guardar la información');
      this.spinner.hide();
      return false;
    }
    
    this.servicio.ActualizarOrden(id, objOrden).then(
      (respuesta) => {
        this.servicio.ObtenerServicio(id).then(
          (respuesta1) => {
            console.log(respuesta1);
            this.servicio.ModificarServicio(ordenServ, respuesta1[0].ID ).then(
              (respuesta2) => {
                if(this.orden[0].estado === 'Pendiente de aprobación Director CECO') {
                  this.servicio.aprobarParticipacionPorCeco(this.idParticipacion, ObjPorcentaje)
                }
                if (this.orden[0].estado !== 'Aprobado') {
                  this.servicio.EnviarNotificacion(emailProps).then(
                    (res) => {
                      if (this.rechazado === true) {
                        this.MensajeInfo('Se ha enviado una notificación al usuario que ordenó el servicio');
                        this.spinner.hide()
                      }
                      else {
                        this.MensajeInfo("Se ha enviado una notificación al siguiente responsable");
                        this.spinner.hide();
                      }

                      setTimeout(
                        () => {
                          window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                          // this.spinnerService.hide();
                        }, 2000);
                    }

                  ).catch(
                    (error) => {
                      console.error(error);
                      this.MensajeInfo("Error al enviar la notificacion, pero la orden se ha enviado con éxito");
                      this.spinner.hide();
                      setTimeout(
                        () => {
                          window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                          // this.spinnerService.hide();
                        }, 2000);
                    }
                  );
                }
              }
            )
          }
        )
        
        this.MensajeExitoso('El proceso finalizó con éxito');
        this.spinner.hide();
      }
    ).catch(
      err => {
        console.log(err)
        this.MensajeError('Error aprobando la orden');
        this.spinner.hide();
      }
    )
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
