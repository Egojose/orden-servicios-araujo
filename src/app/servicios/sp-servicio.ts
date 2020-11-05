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
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk4ODE5MzkzLCJuYmYiOjE1OTg4MTkzOTMsImV4cCI6MTU5ODkwNjA5MywiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI5YzBhNTEyNS0zMDhhLTRiOTAtOWY2Mi00YzM3MWI2NDdlNDNAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwic3ViIjoiNGVhYjVlMDAtNzA2MS00OGVjLTg3ODItOGVhZmQzY2Y0MjJlIiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.ayNnLRbJMvSWInZAO2EO7jlIjnU4sTzwV4w1VxydpdvAuPLNag0jZQnjJ9cUXOymJOjzWzkJ47SxBd0f8y74G86Odax9By4lJdiialfJr7xBktSXeBpBUhElupPWfKVANOswkMpdgDLmnDO8U3rpcBjWvlMIpC2dkbaFl-QM2urqkUUGNMhQTpfo-_kCQ44dERPoHqkbZBH00GLjzwLapiLRUfm18qjiiqkP8oWfUU0hwAohZyf7aoWcqHEsP1uFcSYGAqATS3412b9yvlbVz-DQxOpGmrWuj3EKyCb7REt-VRmRDSRgP6L35pI7Q9UUD750gRPH5U3ZV5FkWLDCRQ'
            }
        }, environment.urlWeb);

        return configuracionSharepoint;
    } 

    public ObtenerConfiguracionConPostGH() {
        const configuracionSharepoint = sp.configure({
            headers: {
                'Accept': 'application/json; odata=verbose',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyIsImtpZCI6ImppYk5ia0ZTU2JteFBZck45Q0ZxUms0SzRndyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvZW5vdmVsc29sdWNpb25lcy5zaGFyZXBvaW50LmNvbUA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwiaWF0IjoxNTk4ODE5NDM4LCJuYmYiOjE1OTg4MTk0MzgsImV4cCI6MTU5ODkwNjEzOCwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEA5MjAwNDBiMy1jMjIwLTQ4YTItYTczZi0xMTc3ZmEyYzA5OGUiLCJuYW1laWQiOiI0MTMxMjQ4ZC1iMDliLTQ4ZmItOWE5Ni04MTdjNTU5NzI3YTFAOTIwMDQwYjMtYzIyMC00OGEyLWE3M2YtMTE3N2ZhMmMwOThlIiwib2lkIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0Iiwic3ViIjoiNjlkOTMxNmItY2ZjOS00MWNkLTk0MjctN2Y0YTc1OWY2MzY0IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.Xi48UswVrLTgW3xnpXz3YOACLr6ULIXqBwmisngJPatBdCxFoaTGGhKlmlhTrHpo3LbI-d8rXw1-xJFVnvmMRpNOO_ab9T-HNV_Ulg9qQDnwdIWKlIeyV97gkWim3C2BJWgsZkkbSf7tzEMaExovrSeSWYnDA3k1lvSwmLe2zUFeyVqva_roihB5XnbBp3IkyCVPM-Vmse_FGfr8VwdInDA1y_XgtDOR9CfLbiDmYUXvtQ09y4axe5vL2i5w39EXMuL_m-SZ4LEEbuV5HVmIdF6PWFeCzeteMck4iKsO7JT_vaW65-hnPRhH995A4DX7xviZO_nAotWtt2oiHoJ5ww' 
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
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaUnegocios).items.select('*', 'Director/Title, Director/ID, Director/EMail').expand('Director').getAll());
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

    obtenerAprobadores(empresa) {
        let respuesta = this.ObtenerConfiguracion().web.lists.getByTitle(environment.listaAprobadores).items
        .select("*","GerenteAdministrativo/ID","GerenteAdministrativo/Title", "GerenteAdministrativo/EMail","DirectorOperativo/ID","DirectorOperativo/Title","DirectorOperativo/EMail","AuxContable/Title", "AuxContable/ID", "AuxContable/EMail")
        .expand("GerenteAdministrativo", "DirectorOperativo", "AuxContable").filter("Empresa eq '"+empresa+"'").getAll();
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
        let respuesta = from(this.ObtenerConfiguracion().web.lists.getByTitle(environment.ListaProveedores).select("*").items.getAll());
        return respuesta; 
    }

    obtenerClientesJobs() {
        let respuesta = from(this.ObtenerConfiguracionJobs().web.lists.getByTitle(environment.ListaCliente).select('*').items.getAll());
        return respuesta;
    }

    obtenerClientesJobsXid(id) {
        let respuesta = from(this.ObtenerConfiguracionJobs().web.lists.getByTitle(environment.ListaCliente).select('*').items.filter("ID eq '"+id+"'").getAll());
        return respuesta;
    }

    obtenerProyectosJobs() {
        let respuesta = from(this.ObtenerConfiguracionJobs().web.lists.getByTitle(environment.ListaProyectos).select('*', 'Cliente').expand('Cliente').items.getAll());
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

    agregarOtroSi(ObjOrden) {
        let respuesta = this.ObtenerConfiguracionConPost().web.lists.getByTitle(environment.ListaOtroSi).items.add(ObjOrden);
        return respuesta;
    }

}