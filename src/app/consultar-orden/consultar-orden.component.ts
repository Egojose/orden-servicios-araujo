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
@Component({
  selector: 'app-consultar-orden',
  templateUrl: './consultar-orden.component.html',
  styleUrls: ['./consultar-orden.component.css']
})
export class ConsultarOrdenComponent implements OnInit {

  config: ExportAsConfig = {
    type: 'pdf',
    elementId: 'ordenServicio',
    options: {
      jsPDF: {
        orientation: 'landscape'
      }
    }
  };

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

  constructor(private exportar: ExportAsService, private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService) { }

  ngOnInit() {
    this.registrarControles();
    this.consultarOrden();
    this.ObtenerUsuarioActual();
  }

  private registrarControles() {
    this.aprobarOrdenServicios = this.fb.group({
      nroOrden: [''],
      empresaSolicitante: ['', Validators.required],
      nitSolicitante: ['', Validators.required],
      ciudadSolicitante: ['', Validators.required],
      telSolicitante: ['', Validators.required],
      direccionSolicitante: ['', Validators.required],
      contactoSolicitante: ['', Validators.required],
      emailSolicitante: ['', Validators.required],
      unidadNegocios: ['', Validators.required],
      nombreCECO: ['', Validators.required],
      numeroCECO: ['', Validators.required],
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
      cliente: ['', Validators.required],
      job: ['', Validators.required],
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

  exportAs(type: SupportedExtensions, opt?: string) {
    this.config.type = type;
    if (opt) {
      this.config.options.jsPDF.orientation = opt;
    }
    this.exportar.save(this.config, 'myFile').subscribe(() => {
      // save started
    });
    // this.exportAsService.get(this.config).subscribe(content => {
    //   console.log(content);
    // });
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
        // this.obtenerInfoEmpleado();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };

  consultarOrden() {
    this.servicio.consultarOrden().subscribe(
      (respuesta) => {
        this.ordenConsulta = Orden.fromJsonList(respuesta);
      }
    )
  }

  obtenerOrden(event) {
    let ordenSeleccionada = event.value;
    this.servicio.obtenerOrden(ordenSeleccionada).subscribe(
      (respuesta) => {
        this.orden = Orden.fromJsonList(respuesta);
        this.ordenNro = this.aprobarOrdenServicios.get('nroOrden').value;
        this.valoresPorDefecto();
        this.cargarValoresFirma();
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
  }

  switchValores() {
    console.log(this.aprobarOrdenServicios.controls['garantia'].value);
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
    if (this.aprobarOrdenServicios.controls['garantia'].value === true) {
      this.aprobarOrdenServicios.controls['garantia'].setValue('true');
      this.mostrarGarantia = true;
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
    if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios
    }
    if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
      this.gerenteAdministrativo = this.orden[0].nombreGerenteAdministrativo;
      this.fechaAprobadoGerenteAdministrativo = this.orden[0].fechaAprobadoGerenteAdministrativo;
    }
  }


}
