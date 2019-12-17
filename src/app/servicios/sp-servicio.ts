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

    public ObtenerConfiguracionJobs() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose'
            }
        }, environment.urlWebJobs);

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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTc2NTU1MjExLCJuYmYiOjE1NzY1NTUyMTEsImV4cCI6MTU3NjU4NDMxMSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.LokYB3GyF2gM4HfUGMqlfI3n60skxkYdKzIl3e29zwYJ34engQ5SNCJuA7MX0LcZPct1rtHlDsjdXsuCYlfbD8ujdbV1f0FfZ6i2qMlfTvH1aHgWW7TgmEQexHUIZOcgFsaV4eoK9mcYur64AiU4dRW1PzhIAfmTwBDhazs1FNuN_kHYoBz0Us0SBhpuyjfY4DKGjraBV8VxwDicWV8B6sWJifyPcFJZYQZciFLfS0C18MoFTL7pQ4gsr2hdVMeqI-gH8pP5KL8EUUmqrHEXjS_Zom9iCYDsuYZAlxhREqaQwJkFd9zBjTPt4j3UKKkBAzeioIJ9QzN8jPE6DxTHsw'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyIsImtpZCI6IkJCOENlRlZxeWFHckdOdWVoSklpTDRkZmp6dyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTc2NTA1NjAzLCJuYmYiOjE1NzY1MDU2MDMsImV4cCI6MTU3NjUzNDcwMywiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.PKtN-PSzAwjDbMXlDqs0Hra3DjcsJw9Ef529QiQQnEZfwS48gys78N7tw06dHsm_7pVqTTzZTXs20XorI-DwRdMJaNYuqN4bJijZIE7nIncbqT0DYKt8OJ6TDTUAlDiA58xN-1UKKUfsXofoDBNDRtVCQelQU6fWHWF4Xond1y_wSuuvYe1qe0zZV5XaXJ26UpGgITcY3EVeZmMMwJLg5wqVNtVDB4YBzej3VS5AD5LGSiQvDIe_AYtrMN5aZwIN2X-ivSY9oIKI7Eb1F7EfCPeRanxiM0wT-rzWR9roDXk_l5MMgMw8L52D8sQdYA8-P1uTAyqZEJ3gMKRRrBnyNg' 
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

    obtenerSedes() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaSedes).items.get());
        return respuesta;
    }

    obtenerCecos() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaCeco).items.get());
        return respuesta;
    }

   async obtenerConsecutivo(): Promise<any> {
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.get();
        return respuesta;
    }

    async obtenerConsecutivoInciail(): Promise<any> {
        let respuesta = await this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.get();
        return respuesta;
    }

    obtenerEmpresa() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaEmpresas).select("RazonSocial", "ID", "Nit").items.get());
        return respuesta;
    }


    async ActualizarNroOrden(idServicio: number, objConfig): Promise<any> {
         return await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaConfiguracion).items.getById(idServicio).update(objConfig);
    }

    ConsultarMisPendientes(idUsuario) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaOrdenes).items.select("*", "UsuarioSolicitante/EMail", "UsuarioSolicitante/Title", "UsuarioSolicitante/ID").expand("UsuarioSolicitante").filter("ResponsableActual eq '" + idUsuario +"'").getAll();
        return respuesta;
    }

    ConsultarMisServicios(idUsuario) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaOrdenes).items.select("*", "UsuarioSolicitante/EMail", "UsuarioSolicitante/Title", "UsuarioSolicitante/ID").expand("UsuarioSolicitante").filter("UsuarioSolicitanteId eq '" + idUsuario +"'").getAll();
        return respuesta;
    }
    
    obtenerOrden(IdRegistro: string) {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaOrdenes).items.select("*", "UsuarioSolicitante/EMail", "UsuarioSolicitante/Title", "UsuarioSolicitante/ID").expand("UsuarioSolicitante").filter("Id eq '" + IdRegistro +"'").get());
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

    // ActualizarServicio(id, objServicio) {
    //     let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(id).update(objServicio);
    //     return respuesta;
    // }

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de servicio'").getAll();
        return respuesta;
    }

    async AgregarCecos(ObjOrden){
        return await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaCecos).items.add(ObjOrden)
    }

    // ObtenerParticipacion(idOrden) {
    //     let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaCecos).items.select("*", 'DirectorCeco/Title', 'DirectorCeco/EMail', 'OrdenServicio/ID').expand('DirectorCeco', 'OrdenServicio').filter("OrdenServicioId eq "+idOrden).getAll();
    //     return respuesta; 
    // }

    obtenerParticipacion(idOrden){
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaCecos).items.filter("OrdenServicioId eq '"+idOrden+"'").select("*","DirectorCeco/Title", "DirectorCeco/ID", "DirectorCeco/EMail").expand("DirectorCeco").get();
        return respuesta;
    }

    ModificarParticipacion(id, objPorcentaje){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaCecos).items.filter("OrdenServicioId eq '"+id+"'").getById(id).update(objPorcentaje);
        return respuesta;
    }

    aprobarParticipacionPorCeco(id, objPorcentaje) {
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaCecos).items.filter("ID eq '"+id+"'").getById(id).update(objPorcentaje);
        return respuesta;
    }

    borrarCecos(OrdenServicio: number){
        return this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaCecos).items.getById(OrdenServicio).delete();
    }

    obtenerProveedor() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaProveedores).select("*").items.get());
        return respuesta; 
    }

    obtenerClientesJobs() {
        let respuesta = from(this.ObtenerConfiguracionJobs().web.lists.getByTitle(environment.ListaCliente).select('*').items.get());
        return respuesta;
    }

    async AgregarPropuesta(nombre, archivo: File): Promise<any> {
        let respuesta = await this.ObtenerConfiguracionConPost().web.getFolderByServerRelativeUrl("PropuestasProveedores").files.add(nombre, archivo);
        return respuesta;
        
    }

    ActualizarMetaDatosAdjuntoPropuestas(obj, idDocumento){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle("PropuestasProveedores").items.getById(idDocumento).update(obj);
        return respuesta;
    }

    obtenerDocumentos(idOrden: number) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("PropuestasProveedores").items.select("ID", "Title", "idOrdenServicio/ID", "File").expand("File", "idOrdenServicio").filter("idOrdenServicio eq " + idOrden + "").getAll();
        return respuesta;
    }

    obtenerClausulas() {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle("Clausulas").items.select('*', "File").expand("File").getAll();
        return respuesta;
    }

}