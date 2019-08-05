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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2NDY4MzU0NiwibmJmIjoxNTY0NjgzNTQ2LCJleHAiOjE1NjQ3MTI2NDYsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.aXxZtATUT9Hcb2ADyfxlEoj0j7hHRZWWQmCP9w8Y4YfKJGEA_MBdcpdcvmAm6k0fROOn4956TeTfbj4LomCNALiendqGDM7o9Zd6TGLcLjthDHfxDuUMS6h0fq1sBhK6VmjzgGExiksTir_fUDvz9cDBT9UR9GvA_JkdXsMdCJny57QVAO76zTPn87JOIcoo_fUBi7wKUk1gqshzfKEBXSV_YKz8R7ZbkFi3xWbGwVtvS5p5e_EnINJAzHEk3vZkxSWfxS7D0zKMn7smRaaa1y7KIYEu_2wz4suk7750FQodmzYf7aSA38Hss-9OdiqQkWjxIySEUVicQCEe20GY9A'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSIsImtpZCI6InU0T2ZORlBId0VCb3NIanRyYXVPYlY4NExuWSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvYXJpYmFzYXMuc2hhcmVwb2ludC5jb21AM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsImlhdCI6MTU2MzU0MDY0OCwibmJmIjoxNTYzNTQwNjQ4LCJleHAiOjE1NjM1Njk3NDgsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAM2FjZDI5NDUtNDdlOC00YTVjLTljNjgtMjkzOTY5MTA5ZTRkIiwibmFtZWlkIjoiNTdjMWUwNjctOWM1My00MjQ4LWE2MmEtZmJhZGI3YWMwODUyQDNhY2QyOTQ1LTQ3ZTgtNGE1Yy05YzY4LTI5Mzk2OTEwOWU0ZCIsIm9pZCI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInN1YiI6ImQ4ZWNhM2E3LTBiNTUtNDJhNy1iYTk3LTMxNTJjZjZkZTI0MCIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.VufosIWhDog2p-e5gQ53ot9DVfDnaVXD1Iz8JpjCAAC2Sf9JJZsVLGgNWynxU12fWyumOYXA9RVET7EGzjciaz2t-5D3GEIHEXPrZBG9ekw-wNINXb0KcheaLwZhDhRDIkk_80Q4G7zCacTGivJDC7xdMtzYyoD7VwFlkynQKiKGDNCT--kv3LtoLFw7WRDf0C0tSAj7wzB03DNMPrMltOHfXTM4b7E2ggwBakeIfjY1athH2t-BTawnq-4if3OUJ4Jhv0eiXUiOJUolemmg8yfwJgciyPiq5vY7MykuPtEUrjh-9sbf3fCDKnQau-N2OfseRHAuFbj7jk9F6_sZ8w' 
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


    async ActualizarNroOrden(id: number, objConfig): Promise<any> {
         return await this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.listaConfiguracion).items.getById(id).update(objConfig);
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

    ModificarServicio(ObjServicio, idServicio){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.getById(idServicio).update(ObjServicio);
        return respuesta; 
    }

    ObtenerServicio(idSolicitud){
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaServicios).items.filter("idServicio eq "+idSolicitud+" and TipoServicio eq 'Orden de servicio'").getAll();
        return respuesta;
    }

}