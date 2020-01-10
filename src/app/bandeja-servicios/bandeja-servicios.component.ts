import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { SPServicio } from '../servicios/sp-servicio';
import { Usuario } from '../dominio/usuario';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { TimepickerModule } from 'ngx-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BandejaServicios } from '../dominio/BandejaServicios';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmailProperties, ItemAddResult } from '@pnp/sp';
import { Empleado } from '../dominio/empleado';
import { NgxSpinnerService } from "ngx-spinner";
import { element } from 'protractor';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-bandeja-servicios',
  templateUrl: './bandeja-servicios.component.html',
  styleUrls: ['./bandeja-servicios.component.css']
})
export class BandejaServiciosComponent implements OnInit {
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
@ViewChild('MisPendientesPaginador', {read: MatPaginator, static:true}) MisPendientesPaginador: MatPaginator;
@ViewChild('MisOrdenesPaginador', {read: MatPaginator, static:true}) MisOrdenesPaginador: MatPaginator; 

  panelOpenState = false;
  panelOpenState1 = false;
  usuarioActual: any;
  nombreUsuario: any;
  idUsuario: any;
  idSolicitud: number;
  nroOrden: string;
  dataSource;
  dataSource1;
  empty: boolean = false;
  emptyOrdenes: boolean = false;
  modalRef: BsModalRef;
  motivoAnulacion: string = '';
  displayedColumns: string[] = ['NumeroOrden', 'Solicitante', 'FechaSolicitud', 'Proveedor','NroJob','Estado', 'Acciones'];
  ObjServicios: BandejaServicios[];
  isModalCTBShown: boolean = false;
  emailCecos: any[] = [];
  ocultarBtn: boolean = false;
  // usuarioActual: Usuario;
  empleadoEditar: Empleado[] = [];
  jefe;


  constructor(private servicio: SPServicio, private route: ActivatedRoute, private router: Router, private toastr: ToastrManager, private modalService: BsModalService, public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.ObtenerUsuarioActual();
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.Email, respuesta.Id);
        console.log(this.usuarioActual);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;
        this.obtenerInfoEmpleado();        
        this.ObtenerMisPendientes();
        this.ObtenerMisServicios();
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
  }

  obtenerInfoEmpleado() {
    let idUser = this.usuarioActual.id;
    console.log(idUser)
    this.servicio.obtenerInfoEmpleadoSeleccionado(idUser).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.empleadoEditar = Empleado.fromJsonList(respuesta);
        this.jefe = this.empleadoEditar[0].jefeEmail;
        console.log(this.jefe);
      }
    )
  }
  
  ObtenerMisPendientes() {
    this.servicio.ConsultarMisPendientes(this.idUsuario).then(
      (res)=>{
        this.ObjServicios = BandejaServicios.fromJsonList(res);
        this.dataSource = new MatTableDataSource(this.ObjServicios);
        this.dataSource.paginator = this.MisPendientesPaginador;
        this.dataSource.data.length === 0 ? this.empty = true : this.empty = false;
        console.log(this.dataSource);
      }
    ).catch(
      (error)=>{
        console.error(error);
        this.MensajeError("Error al obtener mis pendientes");
      }
    );
  }

  ObtenerMisServicios() {
    this.servicio.ConsultarMisServicios(this.idUsuario).then(
      (res)=>{
        this.ObjServicios = BandejaServicios.fromJsonList(res);
        this.dataSource1 = new MatTableDataSource(this.ObjServicios);
        this.dataSource1.paginator = this.MisOrdenesPaginador;
        this.dataSource1.data.length === 0 ? this.emptyOrdenes = true : this.emptyOrdenes = false;
      },
    ).catch(
      (error)=>{
        console.error(error);
        this.MensajeError("Error al obtener mis pendientes");
      }
    );
  }

  VerServicio(id, estado) {    
    sessionStorage.setItem("IdServicio", id);

    if (estado === 'Aprobado' || estado === 'Pendiente de radicar factura') {
      this.router.navigate(["/consultar-orden"])
    }
    else if(estado === 'Rechazado') {
      this.router.navigate(["/editar-orden"])
    }
    else {
      this.router.navigate(["/aprobar-orden-servicio"])
    }
  }

  verServicioEditar(id, estado) {
    sessionStorage.setItem("IdServicio", id);
    this.router.navigate(['/editar-orden']);
  }

  agregarOtroSi(id) {
    sessionStorage.setItem('IdServicio', id);
    this.router.navigate(['/editar-orden'], {queryParams: {otrosi: 'true'}})
  }

  anularSolicitud(element) {
    this.idSolicitud = element.Id;
    this.isModalCTBShown = true;
  }

  openModal(element, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.nroOrden = element.NumeroOrden;
    this.idSolicitud = element.Id;
    console.log(this.idSolicitud);
    this.obtenerCecos();
  }

  obtenerCecos() {
    this.servicio.obtenerParticipacion(this.idSolicitud).then(
      (respuesta) => {
        if(respuesta.length > 0) {
          respuesta.forEach(x => {
            this.emailCecos.push(x.DirectorCeco.EMail)
            console.log(this.emailCecos.toString());
          })
        }
        else {
          this.emailCecos = [];
        }
      }
    )
  }

  confirmarAnular() {
    this.spinner.show();
    let obj = {
      Estado: 'Anulada',
      ResponsableActualId: null,
      MotivoAnulacion: this.motivoAnulacion
    }
    if (this.motivoAnulacion === '') {
      this.MensajeAdvertencia('Debe proporcionar el motivo de la anulación');
      this.spinner.hide();
      return false
    }
    else {
      this.servicio.ActualizarOrden(this.idSolicitud, obj).then(
        (respuesta) => {
          this.MensajeInfo('La orden se ha anulado con éxito');
          this.ObtenerMisServicios();

          let cuerpo = '<p>Cordial saludo</p>' +
          '<br>' +
          '<p>El usuario <strong>' + this.usuarioActual.nombre + '</strong> ha anulado la orden de servicio con el número <strong>' + this.nroOrden + '</strong> por el motivo <b> '+ this.motivoAnulacion +'</b></p>' +
          '<br>' +
          '<p>Si requiere más información por favor comuníquese con el usuario</p>';

          const emailProps: EmailProperties = {
            To: [this.usuarioActual.EmailJefeDirecto],
            CC: [this.emailCecos.toString()],
            Subject: "Notificación de orden de servicio",
            Body: cuerpo,
          };

          this.servicio.EnviarNotificacion(emailProps).then(
            (res) => {
              this.MensajeInfo("Se ha enviado una notificación a todos los CECOs involucrados");
              this.spinner.hide();
              // setTimeout(
              //   () => {
              //     window.location.href = 'https://aribasas.sharepoint.com/sites/Intranet';
              //     // this.spinnerService.hide();
              //   }, 2000);
            }
          )
        }
      )
      this.modalRef.hide();
    }
  }

  cerrarModal() {
    this.modalRef.hide()
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
