import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { SPServicio } from "../servicios/sp-servicio";

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


  constructor(
    private servicio: SPServicio,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.pagoUnico = false;
    this.pagoVarios = false;
    this.pagoCECO = false;
    this.registrarControles();
  }

  private registrarControles() {
    this.generarOrdenServicios = this.fb.group({
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
      rut: ['',Validators.required],
      camara: ['', Validators.required],
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

  onSubmit() {
    let empresaSolicitante = this.generarOrdenServicios.get('empresaSolicitante').value;
    let nitSolicitante = this.generarOrdenServicios.get('nitSolicitante').value;
    let ciudadSolicitante = this.generarOrdenServicios.get('ciudadSolicitante').value;
    let telSolicitante = this.generarOrdenServicios.get('telSolicitante').valid;
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
    
    console.log(this.generarOrdenServicios);
  }

}
