import { Component } from '@angular/core';
import { Usuario } from './dominio/usuario';
import { Grupo } from './dominio/grupo';
import { SPServicio } from './servicios/sp-servicio';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orden-servicio';
  usuario: Usuario;
  usuarioActual: Usuario;
  nombreUsuario: string;
  idUsuario: number;
  grupos: Grupo[] = [];
  permisoAprobarOrden: boolean;

  public ngOnInit() {
    this.ObtenerUsuarioActual();
   }

  constructor(private servicio: SPServicio, private router: Router, public toastr: ToastrManager) {
    this.permisoAprobarOrden = false;
 
   }

   MensajeExitoso() {
    this.toastr.successToastr('This is success toast.', 'Success!');
  }

  MensajeError() {
    this.toastr.errorToastr('This is error toast.', 'Oops!');
  }

  MensajeAdvertencia() {
    this.toastr.warningToastr('This is warning toast.', 'Alert!');
  }

  MensajeInfo() {
    this.toastr.infoToastr('This is info toast.', 'Info');
  }



  showToast(position: any = 'top-left') {
    this.toastr.infoToastr('This is a toast.', 'Toast', {
      position: position
    });
  };

  verificarPermisos() {
    let existeGrupoAprobarOrden = this.grupos.find(x => x.title === "AprobarOrdenServicios");
    if(existeGrupoAprobarOrden !== undefined) {
      this.permisoAprobarOrden = true;
    } 
  }; 
  
  obtenerGrupos() {
    let idUsuario = this.usuario.id;
    this.servicio.ObtenerGruposUsuario(idUsuario).subscribe(
      (respuesta) => {
        this.grupos = Grupo.fromJsonList(respuesta);
        this.verificarPermisos();
      }, err => {
        console.log('Error obteniendo grupos de usuario: ' + err);
      }
    )
  };

  ObtenerUsuarioActual() {
    this.servicio.ObtenerUsuarioActual().subscribe(
      (respuesta) => {
        this.usuario = new Usuario(respuesta.Title, respuesta.email, respuesta.Id);
        this.nombreUsuario = this.usuario.nombre;
        console.log(this.nombreUsuario);
        this.idUsuario = this.usuario.id;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.obtenerGrupos();
      }, err => {
        console.log('Error obteniendo usuario: ' + err);
      }
    )
  };
}

