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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCIsImtpZCI6ImllX3FXQ1hoWHh0MXpJRXN1NGM3YWNRVkduNCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2NjMwMjYwMCwibmJmIjoxNTY2MzAyNjAwLCJleHAiOjE1NjYzMzE3MDAsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.Qtmzghmpol0dqivVUgkUjkaMTdSWj8x4fibl-CY8yKTWuNUHIaMdGndibjEMnzclqZhTWQxjzq5bOTUARCfddj7lK6L8TVc5FpWFEawzK6PVJhBSkeZYaaHWO_trG-JIZVj7hFWN22KqLe77rIzU-r2P2DCxPtJFZpxXBq7YZdw0ABdEm9v2-B_-iTSvFQJ1lZ9CHW2gQSSqf_GV44yYpAeQXZvQezmRMWyH71TUgO7PmilvRkyaIMGYxP8E7WOK2nkaSVRjvWmWz8TuPaiWLtbGXQXRr8GIqiPbHg6uf54R_NpQytaFf9L9aumxBGvJLd6-k_AIdm66b9CZUHVxxg'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2NTI2OTczNywibmJmIjoxNTY1MjY5NzM3LCJleHAiOjE1NjUyOTg4MzcsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.K_C1ww1d1Js9JRQk8Pv174Y97WDAYaoKZDqXgrG6gXayeIrJ6jD0pDuOT2x18b1M0tI-t_w7z4xSBJAhs86rYBegn1c2cO-WUNKX00K-GA40LFusRu0IE36nrbW55_yCxQr7ZNaH-MuoaDBxxQ-m9Clf9K8XNZOYvshwLiQVoykvtiTXc8N5vHlU8akyS8ZM3eWqILDu4pd9OzZ-OpRcCjK66ADvt-Fo6WU0WKdgfEV96CRS93bOwHc5-lPBZ2nRJqFYt4UARPzzWYc97PY3rrLPM3pUloFxBvbP2ASfC9J8E1FE-CpvSaFyKe36mhSn19KqxBNzuztsS78XFKcFGw' 
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

    obtenerConsecutivoInciail() {
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaConfiguracion).items.get());
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de servicio'").getAll();
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
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaCecos).items.filter("OrdenServicioId eq '"+idOrden+"'").select("*","DirectorCeco/Title", "DirectorCeco/ID", "DirectorCeco/EMail").expand("DirectorCeco").get();
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

}