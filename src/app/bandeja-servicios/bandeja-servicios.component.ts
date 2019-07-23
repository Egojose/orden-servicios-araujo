import { Component, OnInit, ViewChild } from '@angular/core';
import { SPServicio } from '../servicios/sp-servicio';
import { Usuario } from '../dominio/usuario';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { BandejaServicios } from '../dominio/BandejaServicios';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

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
  dataSource;
  dataSource1;

  displayedColumns: string[] = ['NumeroOrden', 'Solicitante', 'FechaSolicitud', 'EmpresaSolicitante', 'Estado', 'Acciones'];
  ObjServicios: BandejaServicios[];

  constructor(private servicio: SPServicio, private route: ActivatedRoute, private router: Router, private toastr: ToastrManager) { }

  ngOnInit() {
    this.ObtenerUsuarioActual();
  }

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuarioActual = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuarioActual.nombre;
        this.idUsuario = this.usuarioActual.id;        
        this.ObtenerMisPendientes();
        this.ObtenerMisServicios();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  }
  
  ObtenerMisPendientes() {
    this.servicio.ConsultarMisPendientes(this.idUsuario).then(
      (res)=>{
        this.ObjServicios = BandejaServicios.fromJsonList(res);
        this.dataSource = new MatTableDataSource(this.ObjServicios);
        this.dataSource.paginator = this.MisPendientesPaginador;
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
      }
    ).catch(
      (error)=>{
        console.error(error);
        this.MensajeError("Error al obtener mis pendientes");
      }
    );
  }

  VerServicio(id) {
    sessionStorage.setItem("IdServicio", id);
    this.router.navigate(["/aprobar-orden-servicio"]);
    // console.log(this.dataSource.data[0].Estado);
    // if (this.dataSource.data[0].Estado !== 'Aprobado') {
    //   this.router.navigate(["/aprobar-orden-servicio"]);
    // }
    // else {
    //   this.router.navigate(["/consultar-orden"]);
    // }
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
