import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig, SupportedExtensions } from 'ngx-export-as';
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
import { PorcentajeCecos } from '../dominio/porcentajeCecos';
import { NgxSpinnerService } from "ngx-spinner";
import domtoimage from 'dom-to-image';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  aprobarOrdenServicios: FormGroup;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  pagoCECO: boolean
  pagoUnico: boolean;
  pagoVarios: boolean;
  garantia: boolean;
  unegocios: Unegocios[] = [];
  configuracion: Configuracion[] = [];
  ivaCalculado: number;
  total: number;
  precio: number;
  orden: Orden[] = [];
  ordenConsulta: Orden[]= [];
  participacionCecos: PorcentajeCecos[] = [];
  mostrarGarantia: boolean;
  nombreUsuario: any;
  emailUsuario: any;
  idUsuario: number;
  firmaUsuario: any[];
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
  modalRef: BsModalRef;
  rechazado: boolean;
  fechaAprobadoGerenteAdministrativo: any;
  fechaAprobadoDirector: any;
  aprobadores: Aprobadores[] = [];
  emailGerenteAdministrativo: string;
  emailDirectorOperativo: string;
  ordenNro: any;
  usuarioAprueba: boolean;
  usuarioRechaza: boolean;
  emailSolicitante: any;
  nombre: any;
  cargarFirmajefe: any[];
  cargarFirmaGerente: any[];
  cargarFirmaDirector: any[];
  firmaJefe: any[];
  firmaGerenteAdmin: any[];
  firmaDirector: any[];
  IdRegistroOS: string;
  NumeroOrden: string;
  esConsultores: boolean = false;
  esAsociados: boolean = false;
  recibido: boolean = false;
  radicar: boolean = false;
  pagar: boolean = false;
  aprobado: any = [];
  mostrarFirmaDirector: boolean;
  empresaSolicitante;
  nitSolicitante;
  ciudadSolicitante;
  telSolicitante;
  direccionSolicitante;
  contactoSolicitante;
  emailSolicitanteAr;
  precioAr;
  iva;
  totalAr;
  fechaInicio;
  fechaFinal;
  totalDias;
  valorLetras;

  constructor(private exportar: ExportAsService, private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.registrarControles();
    // this.consultarOrden();
    this.ObtenerUsuarioActual();
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
      regimen: [''],
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
      
      motivoRechazo: ['']
    })
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        this.obtenerOrden();
        
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
        
      }
    )
  };

  obtenerOrden() {
    this.IdRegistroOS = sessionStorage.getItem("IdServicio");
    this.servicio.obtenerOrden(this.IdRegistroOS).subscribe(
      (respuesta) => {
        this.orden = Orden.fromJsonList(respuesta);
        this.emailSolicitante = respuesta[0].UsuarioSolicitante.EMail;
        this.cargarFirmajefe = respuesta[0].FirmaResponsableUnidadNegocios.Url;
        this.cargarFirmaGerente = respuesta[0].FirmaGerenteAdministrativo.Url;

        if(this.orden[0].aprobadoDirector) {
          this.mostrarFirmaDirector = true;
          this.cargarFirmaDirector = respuesta[0].FirmaDirectorOperativo.Url;
        }
        else {
          this.mostrarFirmaDirector = false;
          this.firmaDirector = null;
        }
        if(this.orden[0].estado === 'Aprobado') {
          this.radicar = true;
        }
        if(this.orden[0].estado === 'Pendiente de radicar factura') {
          this.pagar = true;
        }
        this.ordenNro = this.aprobarOrdenServicios.get('nroOrden').value;
        this.valoresPorDefecto();
        this.cargarValoresFirma();
        this.obtenerParticipacionCecos();
      }
    )
  }

  obtenerParticipacionCecos() {
    this.servicio.obtenerParticipacion(this.IdRegistroOS).then(
      (respuesta) => {
        this.participacionCecos = PorcentajeCecos.fromJsonList(respuesta);
        this.aprobado = this.participacionCecos.filter(x => x.aprobado === true)
        console.log(this.aprobado);
        console.log(this.participacionCecos);
      }
    )
  }

  disableButtons():void {
    this.aprobarOrdenServicios.controls['regimen'].disable();
    this.aprobarOrdenServicios.controls['rut'].disable();
    this.aprobarOrdenServicios.controls['camara'].disable();
    this.aprobarOrdenServicios.controls['formaPago'].disable();
    this.aprobarOrdenServicios.controls['distPago'].disable();
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
  }

  // valoresTabla() {
  //   this.empresaSolicitante = this.orden[0].empresaSolicitante;
  //   this.nitSolicitante = this.orden[0].nitSolicitante;
  //   this.ciudadSolicitante = this.orden[0].ciudadSolicitante;
  //   this.telSolicitante = this.orden[0].telSolicitante;
  //   this.direccionSolicitante = this.orden[0].direccionSolicitante;
  // }

  formatoFecha() {
    let fecha_inicial = this.orden[0].fechaInicio.split('-');
    let fechaA = fecha_inicial[2].split('T');
    let fecha1 = fechaA[0] + '/' + fecha_inicial[1] + '/' + fecha_inicial[0]
    this.fechaInicio = fecha1;
    let fecha_final = this.orden[0].fechaFin.split('-')
    let fechaB = fecha_final[2].split('T');
    this.fechaFinal = fechaB[0] + '/' + fecha_final[1] + '/' + fecha_final[0]
  }

  valoresPorDefecto() {
    // this.aprobarOrdenServicios.controls['nroOrden'].setValue(this.orden[0].nroOrden);
    this.empresaSolicitante = this.orden[0].empresaSolicitante;
    this.nitSolicitante = this.orden[0].nitSolicitante;
    this.ciudadSolicitante = this.orden[0].ciudadSolicitante;
    this.telSolicitante = this.orden[0].telSolicitante;
    this.direccionSolicitante = this.orden[0].direccionSolicitante;
    this.contactoSolicitante = this.orden[0].contactoSolicitante;
    this.emailSolicitanteAr = this.orden[0].emailSolicitante;
    this.precioAr = this.orden[0].precio;
    this.iva = this.orden[0].iva;
    this.totalAr = this.orden[0].total;
    this.totalDias = this.orden[0].totalDias;
    this.valorLetras = this.orden[0].valorLetras;




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
    this.aprobarOrdenServicios.controls['ceco1'].setValue(this.orden[0].cecoResponsable1);
    this.aprobarOrdenServicios.controls['ceco2'].setValue(this.orden[0].cecoResponsable2);
    this.aprobarOrdenServicios.controls['ceco3'].setValue(this.orden[0].cecoResponsable3);
    this.aprobarOrdenServicios.controls['porcentajeCeco1'].setValue(this.orden[0].porcentajeResponsable1);
    this.aprobarOrdenServicios.controls['porcentajeCeco2'].setValue(this.orden[0].porcentajeResponsable2);
    this.aprobarOrdenServicios.controls['porcentajeCeco3'].setValue(this.orden[0].porcentajeResponsable3);
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
    this.aprobarOrdenServicios.controls['distPago'].setValue(this.orden[0].distPago);
    this.NumeroOrden = this.orden[0].nroOrden;
    this.switchValores();
    this.disableButtons(); 
    this.formatoFecha();
  }

  switchValores() {
    console.log(this.aprobarOrdenServicios.controls['garantia'].value);
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
    if (this.aprobarOrdenServicios.controls['distPago'].value === true) {
      this.aprobarOrdenServicios.controls['distPago'].setValue('true');
      this.pagoCECO = true;
    }
    else {
      this.aprobarOrdenServicios.controls['distPago'].setValue('false');
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
  }

  cargarValoresFirma() {
    this.firmaJefe = this.cargarFirmajefe;
    this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
    this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
    this.firmaGerenteAdmin = this.cargarFirmaGerente;
    this.gerenteAdministrativo = this.orden[0].nombreGerenteAdministrativo;
    this.fechaAprobadoGerenteAdministrativo = this.orden[0].fechaAprobadoGerenteAdministrativo;
    if (!this.orden[0].aprobadoDirector) {
      this.firmaDirector = null
      this.directorOperativo = ""
      this.fechaAprobadoDirector = ""
    }
    else {
      this.firmaDirector = this.cargarFirmaDirector;
      this.directorOperativo = this.orden[0].nombreDirectorOperativo;
      this.fechaAprobadoDirector = this.orden[0].fechaAprobadoDirector;
    }
  }

  recibir() {
    this.recibido = true;
    let id = this.orden[0].id
    console.log(id)
    let objOrden;
    let ordenServ;
    if(this.orden[0].estado === 'Aprobado') {
      objOrden = {
        Estado: 'Pendiente de radicar factura'
      }
      ordenServ = {
        ResponsableActualId: this.usuarioActual.id,
        Estado: 'Pendiente de radicar factura'
      }
    }
    else {
      objOrden = {
        Estado: 'Pagado',
        ResponsableActualId: null
      }
      ordenServ = {
        ResponsableActualId: null,
        Estado: 'Pagado'
      }
    }
    
    this.servicio.ActualizarOrden(id, objOrden).then(
      (respuesta)=> {
        this.servicio.ObtenerServicio(id).then(
          (respuesta1) => {
            console.log(respuesta1)
            this.servicio.ModificarServicio(ordenServ, respuesta1[0].ID)
            this.orden[0].estado === 'Aprobado' ? this.MensajeExitoso('Listo! La orden está pendiente de pago para finalizar el proceso.') : this.MensajeExitoso('Listo! Esta orden ha finalizado el proceso');
            setTimeout(
              () => {
                window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
              }, 2000);
          }
        )
      }
    ).catch(
      (err) => {
        this.MensajeError('Error actualizando el estado de la orden')
      }
    )
  }

  exportarPdf() {
    var node = document.getElementById('formatoExportar');
    var img;
    var filename;
    var newImage;
    this.spinner.show();
    domtoimage.toJpeg(node, { bgcolor: '#fff', quality: 1 }).then(function (dataUrl) {
      img = new Image();
      img.src = dataUrl;
      newImage = img.src;
      img.onload = function () {
        var pdfWidth = img.width;
        var pdfHeight = img.height;
        // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image
        var doc;
        if (pdfWidth > pdfHeight) {
          doc = new jsPDF('l', 'px', [pdfWidth, pdfHeight]);
        }
        else {
          doc = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
        }
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();
        doc.addImage(newImage, 'PNG', 10, 10, width, height);
        filename = 'Orden de Servicio Nro '+ this.Order +'_.pdf';
        doc.save(filename);
        this.spinner.hide()
      };
    })
      .catch(function (error) {
        this.spinner.hide();
        console.log(error)
      });
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
