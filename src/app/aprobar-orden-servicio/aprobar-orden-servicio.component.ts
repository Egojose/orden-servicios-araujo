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



  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.ObtenerUsuarioActual();
    this.mostrarGarantia = false;
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.rechazado = false;
    this.usuarioAprueba = false;
    this.usuarioRechaza = false;
    this.registrarControles();
    this.obtenerDatosAprobadores();
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
      motivoRechazo: ['', Validators.required]
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
        this.consultarOrden();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };

  obtenerInfoEmpleado() {
    let idUser = this.usuarioActual.id;
    console.log(idUser)
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUser).subscribe(
      (respuesta) => {
        console.log(respuesta)
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        this.jefe = respuesta[0].JefeId
        console.log(this.jefe);
      }
    )
  }

  consultarOrden() {
    this.servicio.consultarOrden(this.usuarioActual.id).subscribe(
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
        this.emailSolicitante = respuesta[0].UsuarioSolicitante.EMail;
        if( this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
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
      }
    )
  }

  obtenerDatosAprobadores() {
    this.servicio.obtenerAprobadores().then(
      (respuesta) => {
        console.log(respuesta);
       this.emailGerenteAdministrativo = respuesta[0].GerenteAdministrativo.EMail;
       this.emailDirectorOperativo = respuesta[0].DirectorOperativo.EMail;
       this.emailAuxiliarContabilidad = respuesta[0].AuxiliarContabilidad.EMail;
       this.responsableGerenteAdminisitrativo = respuesta[0].GerenteAdministrativo.ID;
       console.log(this.responsableGerenteAdminisitrativo);
       this.responsableDirectorOperativo = respuesta[0].DirectorOperativo.ID;
       console.log(this.responsableDirectorOperativo)
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
    this.switchValores();
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
      this.firmaJefe = this.cargarFirmajefe;
      console.log(this.firmaJefe);
      this.gerenteUnegocios = this.orden[0].nombreGerenteUnegocios;
      this.fechaAprobadoGerenteUnegocios = this.orden[0].fechaAprobadoGerenteUnegocios;
    }
    else if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
      this.firmaJefe = this.cargarFirmajefe;
      console.log(this.firmaJefe);
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
    
    if(this.orden[0].estado === 'Pendiente de aprobación gerente unidad de negocios') {
      this.firmaJefe = this.firmaUsuario;
      this.gerenteUnegocios = this.nombreUsuario;
      this.fechaAprobadoGerenteUnegocios = fechaEdit;
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
    this.MensajeInfo('La orden ha sido aprobada! Haga click en "Enviar" para terminar')
  }

  rechazar() {
    if(this.aprobarOrdenServicios.get('motivoRechazo').value === ""){
      this.MensajeAdvertencia('Debe especificar el motivo de rechazo');
      return false;
    }
    else {
      this.gerenteUnegocios = ""
      this.fechaAprobadoGerenteUnegocios = ""
      this.firmaUsuario = null;
      this.rechazado = true;
      this.usuarioRechaza = true;
      this.MensajeInfo('La orden ha sido rechazada! Haga click en "Enviar" para terminar')
      this.modalRef.hide();
    }
  }

  cancelarRechazo() {
    this.aprobarOrdenServicios.controls['motivoRechazo'].setValue("");
    this.modalRef.hide();
  }

  cancelar() {
    this.router.navigate(['/orden-servicios'])
  }

  onSubmit() {
    let objOrden
    let id = this.orden[0].id
    let AprobadoResponsableUnidadNegocios = "true";
    let AprobadoGerenteAdministrativo = "true";

    let emailProps: EmailProperties;

    let cuerpo = '<p>Cordial saludo</p>' +
      '<br>' +
      '<p>La orden de servicio número <strong>' + this.ordenNro + '</strong> requiere de su aprobación</p>' +
      '<br>' +
      '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/aprobar-orden-servicio" target="_blank">aquí</a>.</p>';

    let cuerpoAprobado = '<p>Cordial saludo</p>' +
      '<br>' +
      '<p>La orden de servicio número <strong>' + this.ordenNro + '</strong> ha sido aprobada y está lista para continuar el proceso.</p>' +
      '<br>' +
      '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/consultar-orden" target="_blank">aquí</a>.</p>';

    let cuerpoRechazado = '<p>Cordial saludo</p>' +
        '<br>' +
        '<p>La orden de servicio número <strong>' + this.ordenNro + '</strong> ha sido rechazada por el usuario <strong>' + this.usuarioActual.nombre + '</strong> por el motivo <strong>"' + this.aprobarOrdenServicios.get('motivoRechazo').value + '"</strong></p>' +
        '<br>' +
        '<p>Si necesita más información por favor comuníquese con el responsable del rechazo.</p>'; 

    if(this.rechazado === true) {
      objOrden = {
        Estado: 'Rechazado',
        MotivoRechazo: this.aprobarOrdenServicios.get('motivoRechazo').value,
        ResponsableActualId: null
      }
      emailProps = {
        To: [this.emailSolicitante],
        Subject: "Notificación de orden de servicio",
        Body: cuerpoRechazado,
      };
    }

    if (this.orden[0].estado === 'Pendiente de aprobación gerente unidad de negocios') {
      let url = this.firmaUsuario
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
    }

    if (this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero' && this.aprobarOrdenServicios.get('total').value >= 8000000) {
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
    }

    if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero' && this.aprobarOrdenServicios.get('total').value < 8000000) {
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
    }

    if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
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
    }


    // if (this.orden[0].estado === 'Pendiente de aprobación gerente unidad de negocios') {
    //   emailProps = {
    //     To: [this.emailGerenteAdministrativo],
    //     Subject: "Notificación de orden de servicio",
    //     Body: cuerpo
    //   };
    // }

    // if(this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero') {
    //   emailProps = {
    //     To: [this.emailDirectorOperativo],
    //     Subject: "Notificación de orden de servicio",
    //     Body: cuerpo,
    //   };
    // }

    // if((this.orden[0].estado === 'Pendiente aprobación gerente administrativo y financiero' && this.aprobarOrdenServicios.get('total').value < 8000000)) {
    //   emailProps = {
    //     To: [this.emailAuxiliarContabilidad],
    //     Subject: "Notificación de orden de servicio",
    //     Body: cuerpoAprobado,
    //   };
    // }

    // if(this.orden[0].estado === 'Pendiente aprobación director operativo') {
    //   emailProps = {
    //     To: [this.emailAuxiliarContabilidad],
    //     Subject: "Notificación de orden de servicio",
    //     Body: cuerpoAprobado,
    //   };
    // }

    // if(this.rechazado) {
    //   emailProps = {
    //     To: [this.emailSolicitante],
    //     Subject: "Notificación de orden de servicio",
    //     Body: cuerpoRechazado,
    //   };
    // }

    if(this.usuarioAprueba === false && this.usuarioRechaza === false) {
      this.MensajeAdvertencia('Debe aprobar o rechazar esta orden antes de poder guardar la información');
      return false;
    }
    
    this.servicio.ActualizarOrden(id, objOrden).then(
      (respuesta) => {
        if(this.orden[0].estado !== 'Aprobado') {
          this.servicio.EnviarNotificacion(emailProps).then(
            (res) => {
              this.MensajeInfo("Se ha enviado una notificación para aprobación");
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
              setTimeout(
                () => {
                  window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
                  // this.spinnerService.hide();
                }, 2000);
            }
          );
        }

        this.MensajeExitoso('La orden se aprobó con éxito');
      }
    ).catch(
      err => {
        console.log(err)
        this.MensajeError('Error aprobando la solicitud');
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
