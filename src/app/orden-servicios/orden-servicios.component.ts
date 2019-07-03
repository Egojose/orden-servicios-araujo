import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { SPServicio } from "../servicios/sp-servicio";
import { Unegocios } from '../dominio/unegocios';
import { Configuracion } from '../dominio/configuracion';
import { Config } from 'protractor';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-orden-servicios',
  templateUrl: './orden-servicios.component.html',
  styleUrls: ['./orden-servicios.component.css']
})
export class OrdenServiciosComponent implements OnInit {

  generarOrdenServicios: FormGroup;
  panelOpenState = false;
  panelOpenState1 = false;
  pagoCECO: boolean
  pagoUnico: boolean;
  pagoVarios: boolean;
  garantia: boolean;
  unegocios: Unegocios[] = [];
  config: Configuracion[] = [];
  ivaCalculado: number;
  total: number;
  precio: number;
  



  constructor(
    private servicio: SPServicio, private fb: FormBuilder, private toastr: ToastrManager) { }

  ngOnInit() {
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.pagoCECO = false;
    this.registrarControles();
    this.obtenerConsecutivo();
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
      regimen: ['', Validators.required],
      rut: [''],
      camara: [''],
      descripcionServicios: ['', Validators.required],
      cliente: ['', Validators.required],
      job: ['', Validators.required],
      precio: ['', Validators.required],
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

  obtenerUnegocios() {
    this.servicio.obtenerUnegocio().subscribe(
      (respuesta) => {
        this.unegocios = Unegocios.fromJsonList(respuesta);
      }
    )
  }
  
  obtenerConsecutivo() {
    this.servicio.obtenerConsecutivo().subscribe(
      (respuesta) => {
       this.config = Configuracion.fromJsonList(respuesta);
       console.log(this.config[0].consecutivo);
       this.cargarNroOrden();
       this. calcularIva();
      }
    )
  }
  cargarNroOrden() {
    this.generarOrdenServicios.controls['nroOrden'].setValue(this.config[0].consecutivo);
    this.obtenerUnegocios();
  }

  calcularIva() {
    this.precio = this.generarOrdenServicios.get('precio').value;
    let iva = this.config[0].iva;
    let ivaPorcentaje = iva / 100
    this.ivaCalculado = this.precio * ivaPorcentaje
    this.generarOrdenServicios.controls['iva'].setValue(this.ivaCalculado);
  }

  calcularTotal() {
    this.total = this.precio + this.ivaCalculado;
    console.log(this.total);
    this.generarOrdenServicios.get('total').setValue(this.total);
  }

  changePrecio($event) {
    this.calcularTotal();
  }


  pagoCECOchange($event) {
    if ($event.value === "true") {
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
  }

  changeFecha($event) {
    let cambio = event.target;
    if(cambio) {
    this.calcularDias();
    }
  }

  calcularDias() {
    let arrayInicio = this.generarOrdenServicios.get('fechaInicio').value.split(' ');
    let arrayFin = this.generarOrdenServicios.get('fechaFinal').value.split(' ');
    let fecha1 = arrayInicio[2];
    console.log(fecha1)
    let fecha2 = arrayFin[2];
    console.log(fecha2)
    let calculo = fecha1 + fecha2
    this.generarOrdenServicios.controls['totalDias'].setValue(calculo);
  }

  onSubmit() {
    let nroOrden = this.generarOrdenServicios.get('nroOrden').value;
    let empresaSolicitante = this.generarOrdenServicios.get('empresaSolicitante').value;
    let nitSolicitante = this.generarOrdenServicios.get('nitSolicitante').value;
    let ciudadSolicitante = this.generarOrdenServicios.get('ciudadSolicitante').value;
    let telSolicitante = this.generarOrdenServicios.get('telSolicitante').value;
    let direccionSolicitante = this.generarOrdenServicios.get('direccionSolicitante').value;
    let contactoSolicitante = this.generarOrdenServicios.get('contactoSolicitante').value;
    let emailSolicitante = this.generarOrdenServicios.get('emailSolicitante').value;
    let unidadNegocios = this.generarOrdenServicios.get('unidadNegocios').value;
    let nombreCECO = this.generarOrdenServicios.get('nombreCECO').value;
    let numeroCECO = this.generarOrdenServicios.get('numeroCECO').value;
    let razonSocial = this.generarOrdenServicios.get('razonSocial').value;
    let nitProveedor = this.generarOrdenServicios.get('nitProveedor').value;
    let ciudadProveedor = this.generarOrdenServicios.get('ciudadProveedor').value;
    let telProveedor = this.generarOrdenServicios.get('telProveedor').value;
    let direccionProveedor = this.generarOrdenServicios.get('direccionProveedor').value;
    let contactoProveedor = this.generarOrdenServicios.get('contactoProveedor').value;
    let regimen = this.generarOrdenServicios.get('regimen').value;
    let rut = this.generarOrdenServicios.get('rut').value;
    let camara = this.generarOrdenServicios.get('camara').value;
    let descripcionServicios = this.generarOrdenServicios.get('descripcionServicios').value;
    let cliente = this.generarOrdenServicios.get('cliente').value;
    let job = this.generarOrdenServicios.get('job').value;
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
    let ceco1 = this.generarOrdenServicios.get('ceco1').value;
    let ceco2 = this.generarOrdenServicios.get('ceco2').value;
    let ceco3 = this.generarOrdenServicios.get('ceco3').value;
    let porcentajeCeco1 = this.generarOrdenServicios.get('porcentajeCeco1').value;
    let porcentajeCeco2 = this.generarOrdenServicios.get('porcentajeCeco2').value;
    let porcentajeCeco3 = this.generarOrdenServicios.get('porcentajeCeco3').value;
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
    let objOrden;

    if(regimen === "") {
      this.MensajeAdvertencia('debe seleccionar el regimen');
      return false;
    }

    if(rut === "" && camara === "") {
      this.MensajeAdvertencia('Debe seleccionar el RUT o la Cámara de comercio')
      return false;
    }

    rut === "" ? rut = false : rut = rut;
    camara === "" ? camara = false : camara = camara;
    total === "" ? total = 0 : total = total; //pendiente para eliminar esta linea

    
 
    fechaPago === "" ? fechaPago = null : fechaPago = fechaPago;
    Pago1 === "" ? Pago1 = null : Pago1 = Pago1;
    Pago2 === "" ? Pago2 = null : Pago2 = Pago2;
    Pago3 === "" ? Pago3 = null : Pago3 = Pago3;
    Pago4 === "" ? Pago4 = null : Pago4 = Pago4;
    Pago5 === "" ? Pago5 = null : Pago5 = Pago5;
    Pago6 === "" ? Pago6 = null : Pago6 = Pago6;

    porcentajeCeco1 === "" ? porcentajeCeco1 = 0 : porcentajeCeco1 = porcentajeCeco1;
    porcentajeCeco2 === "" ? porcentajeCeco2 = 0 : porcentajeCeco2 = porcentajeCeco2;
    porcentajeCeco3 === "" ? porcentajeCeco3 = 0 : porcentajeCeco3 = porcentajeCeco3;

    let pCeco1 = parseInt(porcentajeCeco1, 10)
    let pCeco2 = parseInt(porcentajeCeco2, 10)
    let pCeco3 = parseInt(porcentajeCeco3, 10)

    if(this.pagoCECO === true && pCeco1 + pCeco2 + pCeco3 !== 100) {
      this.MensajeAdvertencia('La suma de todos los porcentajes debe se igual a 100%, por favor verifique');
      return false;
    }

    garantia === 'true' ? garantia = true : garantia = false;
    polizaVida === 'true' ? polizaVida = true : polizaVida = false;
    polizaVehiculos === "true" ? polizaVehiculos = true : polizaVehiculos = false;
    
    objOrden = {
      NroOrden: nroOrden,
      Title: empresaSolicitante,
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
      CECOResponsable1: ceco1,
      CECOResponsable2: ceco2,
      CECOResponsable3: ceco3,
      PorcentajeCECO1: pCeco1,
      PorcentajeCECO2: pCeco2,
      PorcentajeCECO3: pCeco3,
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
      Estado: 'Pendiente de aprobación gerente unidad de negocios'
    }
    console.log(objOrden);

    if(this.generarOrdenServicios.invalid) {
      this.MensajeAdvertencia('Hay campos requeridos sin diligenciar. Por favor verifique');
    }
    else {

      this.servicio.AgregarOrden(objOrden).then(
        (result) => {
          let id = 1
          let objConfig = {
            Consecutivo: nroOrden + 1
          }
          this.servicio.ActualizarNroOrden(id, objConfig);
          this.MensajeExitoso('La orden se registró con éxito')
        }
      ).catch(
        err => {
          this.MensajeError('Error al registrar la orden')
        }
      )
    }
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

  MensajeInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }


}
