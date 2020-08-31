import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { SPServicio } from "../servicios/sp-servicio";
import { Unegocios } from '../dominio/unegocios';
import { Configuracion } from '../dominio/configuracion';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { EmailProperties, ItemAddResult } from '@pnp/sp';
import { Empleado } from '../dominio/empleado';
import { Usuario } from '../dominio/usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { Empresas } from '../dominio/empresas'
import { async } from 'q';
import { promise } from 'protractor';
import { CentroCosto } from '../dominio/centroCosto';
import { Sede } from '../dominio/sede';
import { Proveedores } from '../dominio/proveedores';
import { ClienteJobs } from '../dominio/clienteJobs';


@Component({
  selector: 'app-orden-servicios',
  templateUrl: './orden-servicios.component.html',
  styleUrls: ['./orden-servicios.component.css']
})
export class OrdenServiciosComponent implements OnInit {

  generarOrdenServicios: FormGroup;
  panelOpenState = false;
  panelOpenState1 = false;
  panelOpenState2 = false;
  pagoCECO: boolean
  pagoUnico: boolean;
  pagoVarios: boolean;
  garantia: boolean;
  unegocios = [];
  // unegocios: Unegocios[] = [];
  config: Configuracion[] = [];
  empresa: Empresas[] = [];
  proveedor: Proveedores[] = [];
  sedes: Sede[] = [];
  ivaCalculado: number;
  total: number;
  precio: number;
  empleadoEditar: Empleado[] = [];
  usuarioActual: Usuario;
  usuarios: Usuario[] = [];
  areas: CentroCosto[] = [];
  cliente: ClienteJobs[] = [];
  nombreUsuario;
  idUsuario: number;
  jefe;
  emailInvalido: boolean = false;
  dataUsuarios = [];
  esConsultores: boolean = false;
  esAsociados: boolean = false;
  arrayCecos: any = [];
  sumaPorcentaje: number = 0;
  idOrden: number;
  mostrarCecos: boolean;
  porcentajeAsumidoNum: number;
  personaNatural: boolean;
  afiliar: boolean;
  mostrarTablaCecos: boolean;
  nroOrden: string;
  adjuntoPropuesta: any;
  idDocumentoAdjunto: any;
  documentoClausula: any[];
  disabled: boolean;
  nombreUnidad: any;
  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager, private router: Router, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.ObtenerUsuarioActual();
    this.registrarControles();
    this.obtenerUsuarios();
    this.obtenerConsecutivoInicial();
    this.ObtenerProyectos();
    // await this.obtenerUnegocios();
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.pagoCECO = false;
    this.mostrarCecos = true;
    this.generarOrdenServicios.controls['persona'].setValue('false');
    this.generarOrdenServicios.controls['diasPorMes'].setValue(30);
    this.generarOrdenServicios.controls['porcentajeCotizacion'].setValue('40%');
    this.generarOrdenServicios.controls['afiliacion'].setValue('false');
  }

  private registrarControles() {
    this.generarOrdenServicios = this.fb.group({
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
      emailRepresentante: ['', Validators.required],
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
      formaPago: ['', Validators.required],
      fechaPago: [''],
      Pago1: [''],
      Pago2: [''],
      Pago3: [''],
      Pago4: [''],
      Pago5: [''],
      Pago6: [''],
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

  async ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      async (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.Email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuarioActual));
        this.obtenerInfoEmpleado();
        this.obtenerSedes();
        await this.servicio.obtenerJefe(this.usuarioActual.id).then(
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

  obtenerInfoEmpleado() {
    let idUser = this.usuarioActual.id;
    console.log(idUser)
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUser).subscribe(
      (respuesta) => {
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        this.jefe = this.empleadoEditar[0].jefeEmail;
        console.log(this.empleadoEditar);
        this.obtenerUnegocios();
      }
    )
  }

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
        this.obtenerCeco();
      }
    )
  }

  obtenerProveedores() {
    this.servicio.obtenerProveedor().subscribe(
      (respuesta) => {
        this.proveedor = Proveedores.fromJsonList(respuesta.sort((a, b)=> (a.Title > b.Title) ? 1 : -1));
      }
    )
  }

  obtenerCliente() {
    this.servicio.obtenerClientesJobs().subscribe(
      (respuesta) => {
        // this.cliente = ClienteJobs.fromJsonList(respuesta.sort((a, b)=> (a.NombreCliente > b.NombreCliente) ? 1 : -1));
      }
    )
  }

  ObtenerProyectos() {
    this.servicio.obtenerProyectosJobs().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.cliente = respuesta;
      }
    )
  }

  datosProveedor($event) {
    console.log($event);
    let nit = $event.value.nit;
    let ciudad = $event.value.ciudad;
    let telefono = $event.value.telefono;
    let direccion = $event.value.direccion;
    let representante = $event.value.representante;
    let email = $event.value.emailRepresentante;
    this.generarOrdenServicios.controls['nitProveedor'].setValue(nit);
    this.generarOrdenServicios.controls['ciudadProveedor'].setValue(ciudad);
    this.generarOrdenServicios.controls['telProveedor'].setValue(telefono);
    this.generarOrdenServicios.controls['direccionProveedor'].setValue(direccion);
    this.generarOrdenServicios.controls['contactoProveedor'].setValue(representante);
    this.generarOrdenServicios.controls['emailRepresentante'].setValue(email);
  }

  obtenerCeco() {
    this.servicio.obtenerCecos().subscribe(
      (respuesta) => {
        this.areas = CentroCosto.fromJsonList(respuesta);
        console.log(this.areas)
      }
    )
  }

  // clientes($event) {
  //   let nit = $event.value.nit;
  //   this.generarOrdenServicios.controls['job'].setValue(nit);
  // }

  clientes($event) {
    let id = $event.value.ClienteId;
    let cliente
    this.servicio.obtenerClientesJobsXid(id).subscribe(
      (respuesta) => {
        cliente = ClienteJobs.fromJsonList(respuesta);
        console.log(cliente);
        this.generarOrdenServicios.controls['cliente'].setValue(cliente[0].cliente)
      }
    )
  }

  changeCeco($event) {
    let numeroCeco = $event.value.ceco
    this.generarOrdenServicios.controls['numeroCECO'].setValue(numeroCeco);
  }

  changeCecoPorcentaje($event) {
    console.log($event);
    let numeroCeco = $event
    this.generarOrdenServicios.controls['numeroCecoPorcentaje'].setValue(numeroCeco.Ceco);
  }

  changeContacto($event) {
    console.log($event)
    let email = $event.value.email
    this.generarOrdenServicios.controls['emailSolicitante'].setValue(email)
  }

  obtenerUnegocios() {
    this.servicio.obtenerUnegocio().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.unegocios = respuesta.sort((a, b)=> (a.Title > b.Title) ? 1 : -1) //Unegocios.fromJsonList(respuesta.sort((a, b)=> (a.Title > b.Title) ? 1 : -1));
        console.log(this.unegocios);
        this.valoresXdefecto(parseInt(this.empleadoEditar[0].unidadNegocio))
      }
    )
  }

  changeUnidadNegocio($event) {
    console.log($event);
    this.generarOrdenServicios.controls['nombreCECO'].setValue($event.Director);
    this.generarOrdenServicios.controls['numeroCECO'].setValue($event.Ceco);
  }

  valoresXdefecto(idUnidad) {
    this.disabled = true;
    let unidad: Object;
    unidad = this.unegocios.filter((x) => x.Id === idUnidad)
    console.log(unidad[0]);
    this.generarOrdenServicios.controls['unidadNegocios'].setValue(unidad[0]);
    this.generarOrdenServicios.controls['nombreCECO'].setValue(unidad[0].Director);
    this.generarOrdenServicios.controls['numeroCECO'].setValue(unidad[0].Ceco);
  }

  obtenerConsecutivoInicial() {
    this.servicio.obtenerConsecutivoInciail().then(
      (respuesta) => {
        this.config = Configuracion.fromJsonList(respuesta);
        this.cargarNroOrden();
        this.obtenerEmpresa();
        this.obtenerProveedores();
        this.obtenerCliente();
        console.log(this.config);
      }
    )
  }

  adjuntarPropuesta($event) {
    let adjunto = $event.target.files[0];
    if (adjunto != null) {
      this.adjuntoPropuesta = adjunto;
      this.agregarPropuesta();
    } else {
      this.adjuntoPropuesta = null;
    };
  };

  async agregarPropuesta() {
    let obj = {
      Title: this.adjuntoPropuesta.name,
      // idOrdenServicioId: this.empleado[0].id
    }
    await this.servicio.AgregarPropuesta(this.adjuntoPropuesta.name, this.adjuntoPropuesta).then(
      f => {
        console.log(f);
        f.file.getItem().then(item => {
          console.log(item);
          this.idDocumentoAdjunto = item.Id;
          // this.actualizarMetadatosHV(obj, idDocumento);
          // item.update(obj);               
        })
      }
    ).catch(
      (error) => {
        console.log(error)
        this.MensajeError('No se pudo cargar el archivo. Intente de nuevo')
      }
    );
  };

  actualizarMetadatosAdjuntoPropuestas(obj,idDocumento) {
    this.servicio.ActualizarMetaDatosAdjuntoPropuestas(obj, idDocumento).then(
      (res) => {
        this.MensajeInfo('Se agregó la propuesta a la orden de servicio')
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    )
  }

  validarPorcentaje() {
    this.porcentajeAsumidoNum = parseInt(this.generarOrdenServicios.get('porcentajeAsumido').value, 10)
    if (this.arrayCecos.length > 0) {
      let array: any = [];
      this.arrayCecos.map((x) => {
        x.porcentaje
        array.push(x.porcentaje)
      })
      this.sumaPorcentaje = array.reduce((a, suma) => a + suma);
      if(array.length === 0) {
        this.sumaPorcentaje = 0
      }
    }
  }

  agregarCecos() {
    if (this.generarOrdenServicios.get('ceco1').value === "") {
      this.MensajeAdvertencia('Por favor seleccione un CECO')
      return false;
    }
    else {
      if (this.generarOrdenServicios.get('porcentajeCeco1').value === "") {
        this.MensajeAdvertencia('Debe agregar un porcentaje');
        return false;
      }
      if (this.generarOrdenServicios.get('porcentajeCeco1').value > 100) {
        this.MensajeAdvertencia('El porcentaje no debe superar el 100%');
        return false;
      }
      this.arrayCecos.push({ ceco: this.generarOrdenServicios.get('ceco1').value.Director.Title, nroCeco: this.generarOrdenServicios.get('numeroCecoPorcentaje').value, porcentaje: this.generarOrdenServicios.get('porcentajeCeco1').value, director: this.generarOrdenServicios.get('ceco1').value.Director.ID });
      this.generarOrdenServicios.controls['ceco1'].setValue("");
      this.generarOrdenServicios.controls['numeroCecoPorcentaje'].setValue("");
      this.generarOrdenServicios.controls['porcentajeCeco1'].setValue("");

    }
  }

  borrarCecos(index) {
    this.arrayCecos.splice(index, 1);
  }

  mostrarTabla() {
    let porcentaje = parseInt(this.generarOrdenServicios.get('porcentajeAsumido').value)
    if(porcentaje < 100) {
      this.mostrarTablaCecos = true;
    }
    else {
      this.mostrarTablaCecos = false;
    }
  }

  async ActualizarConsecutivo(id, Obj): Promise<any> {
    let RespuestaMensaje = "";
    await this.servicio.ActualizarNroOrden(id, Obj).then(
      (res) => {
        RespuestaMensaje = "Exitoso";
      }
    ).catch(
      (error) => {
        console.log(error);
        RespuestaMensaje = "Error";
      }
    );

    return RespuestaMensaje;
  }

  obtenerEmpresa() {
    this.servicio.obtenerEmpresa().subscribe(
      (respuesta) => {
        this.empresa = Empresas.fromJsonList(respuesta);
      }
    )
  }

  cargarNroOrden() {
    if (this.generarOrdenServicios.get('empresaSolicitante').value.tipo === 'Consultores') {
      this.generarOrdenServicios.controls['nroOrden'].setValue(this.config[0].consecutivo);
    }
    else if (this.generarOrdenServicios.get('empresaSolicitante').value.nombre === 'Asociados') {
      this.generarOrdenServicios.controls['nroOrden'].setValue(this.config[0].consecutivoAsociados)
    }
  }

  changeEmpresa($event) {
    console.log($event.value.nombre)
    if ($event.value.tipo === "Consultores") {
      this.generarOrdenServicios.controls['nitSolicitante'].setValue(this.empresa[0].nit);
      this.generarOrdenServicios.controls['nroOrden'].setValue(this.config[0].consecutivo);
      this.esConsultores = true;
      this.esAsociados = false;
    }
    else if ($event.value.tipo === "Asociados") {
      this.generarOrdenServicios.controls['nitSolicitante'].setValue(this.empresa[1].nit);
      this.generarOrdenServicios.controls['nroOrden'].setValue(this.config[0].consecutivoAsociados);
      this.esConsultores = false;
      this.esAsociados = true;
    }
  };

  changeCiudad($event) {
    console.log($event.value);
    let direccion = $event.value.direccion;
    let telefono = $event.value.telefono;
    this.generarOrdenServicios.controls['direccionSolicitante'].setValue(direccion);
    this.generarOrdenServicios.controls['telSolicitante'].setValue(telefono);
  }

  calcularIva() {
    let price = (this.generarOrdenServicios.get('precio').value).toFixed(2);
    let iva = this.config[0].iva;
    let ivaPorcentaje = iva / 100
    this.ivaCalculado = price * ivaPorcentaje
    let total = parseFloat(price) + parseFloat(this.ivaCalculado.toString())
    console.log(total);
    this.generarOrdenServicios.controls['iva'].setValue(this.ivaCalculado);
    this.generarOrdenServicios.controls['total'].setValue(total);
  }

  calcularTotal() {
    let price = parseFloat(this.generarOrdenServicios.get('precio').value);
    this.total = price;
    this.generarOrdenServicios.controls['total'].setValue(this.total);
    this.generarOrdenServicios.controls['iva'].setValue(0);
    this.generarOrdenServicios.controls['tieneIva'].setValue(false);
  }

  changePrecio($event) {
    this.calcularTotal();
  }

  changeIva($event) {
    let precio = this.generarOrdenServicios.controls['precio'].value
    if ($event.checked === true) {
      this.calcularIva();
    }
    else {
      this.generarOrdenServicios.controls['iva'].setValue(0);
      this.generarOrdenServicios.controls['total'].setValue(precio);
    }
  }

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
    else if ($event.value === 'Varios') {
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
  }

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
    this.generarOrdenServicios.controls['porcentajeRiesgo'].setValue(porcentajeRiesgo);
  }
  
  agregarValorTotalServicio () {
    this.generarOrdenServicios.controls['valorTotalServicio'].setValue(this.generarOrdenServicios.get('total').value)
  }

  nroDiasContrato() {
    this.generarOrdenServicios.controls['nroDias'].setValue(this.generarOrdenServicios.get('totalDias').value)
  }

  valorPorDia() {
    let valor = parseFloat(this.generarOrdenServicios.get('total').value)
    let dias = parseInt(this.generarOrdenServicios.get('totalDias').value, 10)
    let calculo = valor / dias
    this.generarOrdenServicios.controls['valorPorDia'].setValue(calculo)
  }

  ValorPorMes() {
    let meses = parseInt(this.generarOrdenServicios.get('totalDias').value) / 30
    let valorxmes;
    if(meses <= 1) {
      meses = 1
    }
    valorxmes = this.generarOrdenServicios.get('total').value / meses;
    this.generarOrdenServicios.controls['valorServicioPorMes'].setValue(valorxmes);
  }

  calcularBaseCotizacion() {
    let base = parseFloat(this.generarOrdenServicios.get('valorServicioPorMes').value) * 0.40
    this.generarOrdenServicios.controls['baseCotizacion'].setValue(base);
  }

  changeFecha() {
    this.calcularDias();
  }

  calcularDias() {
    let fecha1 = this.generarOrdenServicios.get('fechaInicio').value;
    let fecha2 = this.generarOrdenServicios.get('fechaFinal').value;
    let time = new Date(fecha1).getTime(); 
    let time2 = new Date(fecha2).getTime();
    let diff = Math.abs(time2 - time);
    let diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
    this.generarOrdenServicios.controls['totalDias'].setValue(diffDays);
  }

  validarCalculosPersonaNatural() {
    if(this.generarOrdenServicios.get('persona').value === 'true') {
      if(this.generarOrdenServicios.get('valorTotalServicio').value === '' || this.generarOrdenServicios.get('valorPorDia').value === '' || this.generarOrdenServicios.get('valorServicioPorMes').value === '') {
        this.MensajeAdvertencia('Debe diligenciar los campos de calculo de pago para la seguridad social')
        return false;
      }
    }
  }

  cancelar() {
    setTimeout(
      () => {
        window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
      }, 500);
  }

  async validarConsecutivo() {
    await this.servicio.obtenerConsecutivoInciail().then(
      (respuesta) => {
       this.nroOrden = this.generarOrdenServicios.get('nroOrden').value;
        let objConfig;
        let consecutivo;
        let consultores = this.generarOrdenServicios.controls['empresaSolicitante'].value.tipo === 'Consultores'
        if(consultores) {
          consecutivo = respuesta[0].Consecutivo
          consecutivo === this.nroOrden ? this.nroOrden = this.nroOrden : this.nroOrden = consecutivo;
        }
        else {
          consecutivo = respuesta[0].ConsecutivoAsociados;
          consecutivo === this.nroOrden ? this.nroOrden = this.nroOrden : this.nroOrden = consecutivo;
        }
        let consecutivoNumber = consecutivo.split('-');
        let suma = parseInt(consecutivoNumber[1]) + 1;
        let sumaString;
        if (suma < 10) {
          sumaString = "00" + suma
        }
        else if (suma < 100) {
          sumaString = "0" + suma;
        }
        else {
          sumaString = suma
        }
        consultores ? objConfig = {Consecutivo: `C-${sumaString}`} : objConfig = {ConsecutivoAsociados: `A-${sumaString}`}
        this.servicio.ActualizarNroOrden(respuesta[0].Id, objConfig);
      }
    );
  }

  async onSubmit() {
    this.spinner.show();
    this.validarPorcentaje();
    this.validarCalculosPersonaNatural();
    if (this.sumaPorcentaje + this.porcentajeAsumidoNum !== 100) {
      this.MensajeAdvertencia('El total de porcentajes debe ser equivalente al 100%');
      this.spinner.hide();
      return false;
    }
    
    // let nroOrden = this.generarOrdenServicios.get('nroOrden').value;
    let objAdjuntoPropuesta;
    let empresaSolicitante = this.generarOrdenServicios.get('empresaSolicitante').value.nombre;
    let nitSolicitante = this.generarOrdenServicios.get('nitSolicitante').value;
    let ciudadSolicitante = this.generarOrdenServicios.get('ciudadSolicitante').value.nombre;
    let telSolicitante = this.generarOrdenServicios.get('telSolicitante').value;
    let direccionSolicitante = this.generarOrdenServicios.get('direccionSolicitante').value;
    let contactoSolicitante = this.generarOrdenServicios.get('contactoSolicitante').value.label;
    let emailSolicitante = this.generarOrdenServicios.get('emailSolicitante').value;
    let unidadNegocios = this.generarOrdenServicios.get('unidadNegocios').value.Title;
    let nombreCECO = this.generarOrdenServicios.get('nombreCECO').value.Title;
    let numeroCECO = this.generarOrdenServicios.get('numeroCECO').value;
    let razonSocial = this.generarOrdenServicios.get('razonSocial').value.nombre;
    let nitProveedor = this.generarOrdenServicios.get('nitProveedor').value;
    let ciudadProveedor = this.generarOrdenServicios.get('ciudadProveedor').value;
    let telProveedor = this.generarOrdenServicios.get('telProveedor').value;
    let direccionProveedor = this.generarOrdenServicios.get('direccionProveedor').value;
    let contactoProveedor = this.generarOrdenServicios.get('contactoProveedor').value;
    let emailProveedor = this.generarOrdenServicios.get('emailRepresentante').value;
    let regimen = this.generarOrdenServicios.get('regimen').value;
    let rut = this.generarOrdenServicios.get('rut').value;
    let camara = this.generarOrdenServicios.get('camara').value;
    let descripcionServicios = this.generarOrdenServicios.get('descripcionServicios').value;
    let cliente = this.generarOrdenServicios.get('cliente').value;
    let job;
    (this.generarOrdenServicios.controls.job.value !== null && this.generarOrdenServicios.controls.job.value !== '' && this.generarOrdenServicios.controls.job.value !== undefined) ? job = this.generarOrdenServicios.get('job').value.NumeroJob : job = '';
    let precio = this.generarOrdenServicios.get('precio').value;
    let iva = this.generarOrdenServicios.get('iva').value;
    let total = this.generarOrdenServicios.get('total').value;
    let valorLetras = this.generarOrdenServicios.get('valorLetras').value;
    let fechaInicio = this.generarOrdenServicios.get('fechaInicio').value;
    let fechaFinal = this.generarOrdenServicios.get('fechaFinal').value;
    let totalDias = this.generarOrdenServicios.get('totalDias').value;
    let formaPago = this.generarOrdenServicios.get('formaPago').value;
    let fechaPago = this.generarOrdenServicios.get('fechaPago').value;
    let Pago1 = this.generarOrdenServicios.get('Pago1').value;
    let Pago2 = this.generarOrdenServicios.get('Pago2').value;
    let Pago3 = this.generarOrdenServicios.get('Pago3').value;
    let Pago4 = this.generarOrdenServicios.get('Pago4').value;
    let Pago5 = this.generarOrdenServicios.get('Pago5').value;
    let Pago6 = this.generarOrdenServicios.get('Pago6').value;
    let garantia = this.generarOrdenServicios.get('garantia').value;
    let porcentajeCumplimiento = this.generarOrdenServicios.get('porcentajeCumplimiento').value;
    let mesesCumplimiento = this.generarOrdenServicios.get('mesesCumplimiento').value;
    let porcentajeAnticipos = this.generarOrdenServicios.get('porcentajeAnticipos').value;
    let mesesAnticipos = this.generarOrdenServicios.get('mesesAnticipos').value;
    let porcentajeSalarios = this.generarOrdenServicios.get('porcentajeSalarios').value;
    let mesesSalarios = this.generarOrdenServicios.get('mesesSalarios').value;
    let porcentajeResponsabilidad = this.generarOrdenServicios.get('porcentajeResponsabilidad').value;
    let porcentajeCalidad = this.generarOrdenServicios.get('porcentajeCalidad').value;
    let mesesCalidad1 = this.generarOrdenServicios.get('mesesCalidad1').value;
    let mesesCalidad2 = this.generarOrdenServicios.get('mesesCalidad2').value;
    let polizaVida = this.generarOrdenServicios.get('polizaVida').value;
    let polizaVehiculos = this.generarOrdenServicios.get('polizaVehiculos').value;
    let tieneIva = this.generarOrdenServicios.get('tieneIva').value;
    let responsableActual = this.generarOrdenServicios.controls['nombreCECO'].value.ID
    // let responsableActual = this.usuarioActual.IdJefeDirecto;
    // let responsableActual = this.empleadoEditar[0].jefe;
    let usuarioSolicitante = this.usuarioActual.id;
    let objOrden;
    let objServicio;
    let porcentajeAsumido = this.generarOrdenServicios.get('porcentajeAsumido').value;
    let personaNatural = this.generarOrdenServicios.get('persona').value;
    console.log(personaNatural);
    let valorxdia = this.generarOrdenServicios.get('valorPorDia').value;
    let diasxmes = this.generarOrdenServicios.get('diasPorMes').value;
    let valorxmes = this.generarOrdenServicios.get('valorServicioPorMes').value;
    let valorBase = this.generarOrdenServicios.get('baseCotizacion').value;
    let afiliacion = this.generarOrdenServicios.get('afiliacion').value;
    let conceptoPagoUnico = this.generarOrdenServicios.get('conceptoUnico').value;
    let NivelRiesgo = this.generarOrdenServicios.get('nivelRiesgo').value;
    let porcentajeRiesgo = this.generarOrdenServicios.get('porcentajeRiesgo').value;
    let pagoAfiliacion = this.generarOrdenServicios.get('pagoAfiliacion').value;
    let comentarios = this.generarOrdenServicios.get('comentariosArl').value;
    let porcentajePago1 = this.generarOrdenServicios.get('porcentajePago1').value;
    let porcentajePago2 = this.generarOrdenServicios.get('porcentajePago2').value;
    let porcentajePago3 = this.generarOrdenServicios.get('porcentajePago3').value;
    let porcentajePago4 = this.generarOrdenServicios.get('porcentajePago4').value;
    let porcentajePago5 = this.generarOrdenServicios.get('porcentajePago5').value;
    let porcentajePago6 = this.generarOrdenServicios.get('porcentajePago6').value;
    let conceptoPago1 = this.generarOrdenServicios.get('conceptoPago1').value;
    let conceptoPago2 = this.generarOrdenServicios.get('conceptoPago2').value;
    let conceptoPago3 = this.generarOrdenServicios.get('conceptoPago3').value;
    let conceptoPago4 = this.generarOrdenServicios.get('conceptoPago4').value;
    let conceptoPago5 = this.generarOrdenServicios.get('conceptoPago5').value;
    let conceptoPago6 = this.generarOrdenServicios.get('conceptoPago6').value;
   
    

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

    if(personaNatural === 'true' && (diasxmes === '' || valorxmes === '' || valorxdia === '' || valorxmes === '' || valorBase === '')) {
      this.MensajeAdvertencia('Por favor diligencie todos los campos del cálculo de pago para cumplimiento de pagos a la seguridad social y pensiones.')
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
    personaNatural === 'true' ? personaNatural = true : personaNatural = false; 

   

    if (this.generarOrdenServicios.invalid) {
      this.MensajeAdvertencia('Hay campos requeridos sin diligenciar. Por favor verifique');
      this.spinner.hide();
    }
    else {
      await this.validarConsecutivo();
      objOrden = {
        Title: empresaSolicitante,
        NroOrden: this.nroOrden,
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
        EmailProveedor: emailProveedor,
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
  
      this.servicio.AgregarOrden(objOrden).then(
        (item: ItemAddResult) => {
          this.idOrden = item.data.Id
          objAdjuntoPropuesta = {
            idOrdenServicioId: this.idOrden.toString()
          }
          if(this.idDocumentoAdjunto !== undefined) {
            this.actualizarMetadatosAdjuntoPropuestas(objAdjuntoPropuesta, this.idDocumentoAdjunto);
          }
          // let idOrden = item.data.Id;
          let numeroOrden = this.generarOrdenServicios.get('nroOrden').value
          console.log(this.idOrden);
          objServicio = {
            TipoServicio: 'Orden de servicio',
            CodigoServicioId: 4,
            AutorId: usuarioSolicitante,
            ResponsableActualId: responsableActual,
            Estado: "Pendiente de aprobación gerente unidad de negocios",
            idServicio: this.idOrden
          }

          let cuerpo = '<p>Cordial saludo</p>' +
            '<br>' +
            '<p>El usuario <strong>' + this.usuarioActual.nombre + '</strong> ha generado una nueva orden de servicio con el número <strong>' + this.generarOrdenServicios.get('nroOrden').value + '</strong> para su aprobación</p>' +
            '<br>' +
            '<p>Para ver la orden haga clic <a href="https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios" target="_blank">aquí</a>.</p>' +
            '<p>En caso de que el acceso no lo dirija a página por favor copie la siguiente url en el navegador:</p>' +
            'https://aribasas.sharepoint.com/sites/apps/SiteAssets/orden-servicio/index.aspx/bandeja-servicios';

          const emailProps: EmailProperties = {
            To: [this.generarOrdenServicios.controls['nombreCECO'].value.EMail], //this.usuarioActual.EmailJefeDirecto
            Subject: "Notificación de orden de servicio",
            Body: cuerpo,
          };
          this.servicio.GuardarServicio(objServicio).then(
            async (respuesta) => {
              let ans = await this.guardarCecos();
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
          this.MensajeExitoso('El proceso finalizó con éxito');
          this.spinner.hide();
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000);
        }
      ).catch(
        (err) => {
          console.log(err);
          this.MensajeError('Error al registrar la orden')
          this.spinner.hide();
        }
      )
    }
  }

  async guardarCecos(): Promise<any> {
    for (let index = 0; index < this.arrayCecos.length; index++) {
      const element = this.arrayCecos[index];
      let objCecos = {
        Ceco: element.nroCeco,
        Nombre: element.ceco,
        PorcentajeAsumido: element.porcentaje,
        OrdenServicioId: this.idOrden,
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
