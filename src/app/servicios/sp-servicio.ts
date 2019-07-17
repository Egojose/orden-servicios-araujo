import { environment } from 'src/environments/environment';
import { sp } from '@pnp/sp';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable()
export class SPServicio {
    constructor() { }

    public ObtenerConfiguracion() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebGH);

        return configuracionSharepoint;
    }

    public ObtenerConfiguracionConPost() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MzM4MzEwMCwibmJmIjoxNTYzMzgzMTAwLCJleHAiOjE1NjM0MTIyMDAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.mHxyiCcBSdyrA-Qoxtc-eB3fCFb3_ztjJF-eOR33HcLHrBSGlAYeMqWUdP5alBWEhZqMqmZkrc4AiuSPw54M4KJ1ixhpflQVwbOO50xXlTPuVhGlLV4euFDWZEpkp_WPMCz3hAOdCRhe9bt4OIVg5XpSAveXV-t-rOYvozpRqDrB-W__IlnH5LRycLL2zT3bkxkkMrjG0mJ0SxDl7XlNa0XFjKAS_a_RvMWJNUQwI-nUSQQPietXG708MUvU-3JQz0d613-eEcemAr5eIyQlIJnFrhcX_teWVUo-KeWCnfbhMBQqRik5T5iyzZBvBgipxww0qMIN1wYzvrj5SUP2DQ'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MDUzNzcxMiwibmJmIjoxNTYwNTM3NzEyLCJleHAiOjE1NjA1NjY4MTIsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiZmFlYWNkNGUtN2E4OS00ZjU5LWFmYjAtNmNjNzJiYTA1YTJkQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInN1YiI6ImI0YWUwMTkzLWQzMTAtNDhmMS05ZDI4LTBkZjgyZTY1YTAyYSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.ali_-pPNwE2S8XuNvLHwcffZiIgXRcKr-2MyYCtadLdk406UoypDtd4Ppbbl5iRtLPHjDZj7bOoZo7gh5SAqhiuN5_yinQsCmdx3DSjOCZddK_q8n3JwqH-noHMoBo8pIRZJYeFQ_ux9OgXROSIGiI-mQbWZ0pwiRWp8sJ53gvPidOUCQ52HTIp9T_nSFIVmkvMW6gIkBa9NYYVO5Mmrqrl-X0gxAh7ysUciABH4clXEd61x0pV9l82qozoZsnBFIHdzIC8JOuibxE_9sLR1B-Jii9JdDdBQBrcv95Mc2nG1BfkLzuXtrUdb2KWSLdZfMqPi1zd4zBtCf84D_u8P7Q' 
            }
        }, environment.urlWebGH);

        return configuracionSharepoint;
    } 

    ObtenerTodosLosUsuarios() {
        let respuesta = from(this.ObtenerConfiguracion().web.siteUsers.get());
        return respuesta;
    }

    ObtenerUsuarioActual() {
        let respuesta = from(this.ObtenerConfiguracion().web.currentUser.get());
        return respuesta;
    }

    AgregarOrden(ObjOrden){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaOrdenes).items.add(ObjOrden)
    }

    ActualizarOrden(IdOrden: number, objOrden) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaOrdenes).items.getById(IdOrden).update(objOrden);
    }

    ObtenerGruposUsuario(usuarioId: number){
        let respuesta = from(this.ObtenerConfiguracion().web.getUserById(usuarioId).groups.get());
        return respuesta;
    }

    obtenerUnegocio() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaUnegocios).items.get());
        return respuesta;
    }

    obtenerConsecutivo() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.get());
        return respuesta;
    }

    ActualizarNroOrden(id: number, objConfig) {
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaConfiguracion).items.getById(id).update(objConfig);
    }

    consultarOrden(idUsuario: number) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaOrdenes).items.select('NroOrden').filter("ResponsableActual eq '"+idUsuario+"'").get());
        return respuesta; 
    }

    obtenerOrden(nroOrden: string) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaOrdenes).items.select("*", "UsuarioSolicitante/EMail", "UsuarioSolicitante/Title", "UsuarioSolicitante/ID").expand("UsuarioSolicitante").filter("NroOrden eq '" + nroOrden + "'").get());
        return respuesta;
    }

    obtenerFirmas(idUsuario){
        let respuesta = this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuarioId eq '"+idUsuario+"'").select("*","usuario/EMail").expand("usuario").get();
        return respuesta;
    }

    obtenerInfoEmpleadoSeleccionado(IdUsuario: number) {
        let respuesta = from(this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.select("*").filter("usuarioId eq " + IdUsuario + "").get());
        return respuesta;
    }

    EnviarNotificacion(objNotificacion){
        let respuesta = this.ObtenerConfiguracionConPost().utility.sendEmail(objNotificacion);
        return respuesta;
    }

    ValidarUsuarioGerente() {
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaAprobadores).items.getAll();
        return respuesta;
    } 

    obtenerJefe(UsuarioActualId) {
        let respuesta = this.ObtenerConfiguracionGH().web.lists.getByTitle(environment.ListaEmpleados).items.filter("usuario eq "+UsuarioActualId).select("*","Jefe/Title","Jefe/EMail").expand("Jefe").getAll();
        return respuesta;
    }

    obtenerAprobadores() {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaAprobadores).items.select("*","GerenteAdministrativo/ID","GerenteAdministrativo/Title", "GerenteAdministrativo/EMail","DirectorOperativo/ID","DirectorOperativo/Title","DirectorOperativo/EMail","AuxiliarContabilidad/Title", "AuxiliarContabilidad/ID", "AuxiliarContabilidad/EMail").expand("GerenteAdministrativo", "DirectorOperativo", "AuxiliarContabilidad").getAll();
        return respuesta;
    }

    GuardarServicio(ObjServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.add(ObjServicio);
        return respuesta;
    }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de servicio'").getAll();
        return respuesta;
    }

}