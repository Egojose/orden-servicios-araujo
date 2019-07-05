export class Orden{
    constructor(
        public empresaSolicitante: string,
        public nitSolicitante: string,
        public ciudadSolicitante: string,
        public telSolicitante: string,
        public direccionSolicitante: string,
        public contactoSolicitante: string,
        public emailSolicitante: string,
        public uNegocios: string,
        public nombreCECO: string,
        public numeroCECO: string,
        public razonSocial: string,
        public nitProveedor: string,
        public ciudadProveedor: string,
        public telProveedor: string,
        public direccionProveedor: string,
        public contactoProveedor: string,
        public regimen: string,
        public rut: boolean,
        public camara: boolean,
        public descripcion: string,
        public cliente: string,
        public job: string,
        public precio: number,
        public iva: number,
        public total: number,
        public fechaInicio: any,
        public fechaFin: any,
        public totalDias: string,
        public valorLetras: string,
        public formaPago: string,
        public fechaPago: any,
        public fecha1erPago: any,
        public fecha2doPago: any,
        public fecha3erPago: any,
        public fecha4toPago: any,
        public fecha5toPago: any,
        public fecha6toPago: any,
        public cecoResponsable1: string,
        public cecoResponsable2: string,
        public cecoResponsable3: string,
        public porcentajeResponsable1: number,
        public porcentajeResponsable2: number,
        public porcentajeResponsable3: number,
        public porcentajeCumplimiento: string,
        public mesesCumplimiento: string,
        public porcentajePagoSalarios: string,
        public aniosPagoSalarios: string,
        public porcentajeResposabilidadCivil: string,
        public porcentajeManejoAnticipos: string,
        public mesesManejoAnticipos: string,
        public porcentajeCalidad: string,
        public validezCalidad: string,
        public extensionCalidad: string,
        public garantia: boolean,
        public polizaColectiva: boolean,
        public polizaVehiculos: boolean,
        public nroOrden: string,
        public tieneIva: boolean,
        public distPago: boolean
    ) {}

    public static fromJson(element: any) {
        return new Orden(
            element.Title,
            element.NitSolicitante,
            element.CiudadSolicitante,
            element.TelSolicitante,
            element.DireccionSolicitante,
            element.ContactoSolicitante,
            element.EmailContactoSolicitante,
            element.UnidadNegocios,
            element.NombreCECO,
            element.NumeroCECO,
            element.RazonSocial,
            element.NitProveedor,
            element.CiudadProveedor,
            element.TelProveedor,
            element.DireccionProveedor,
            element.ContactoProveedor,
            element.Regimen,
            element.Rut,
            element.CamaraComercio,
            element.DescripcionServicio,
            element.Cliente,
            element.NroJob,
            element.Precio,
            element.Iva,
            element.Total,
            element.FechaInicio,
            element.FechaFin,
            element.TotalDias,
            element.ValorLetras,
            element.FormaPago,
            element.FechaPago,
            element.Fecha1erPago,
            element.Fecha2doPago,
            element.Fecha3erPago,
            element.Fecha4toPago,
            element.Fecha5toPago,
            element.Fecha6toPago,
            element.CECOResponsable1,
            element.CECOResponsable2,
            element.CECOResponsable3,
            element.PorcentajeCECO1,
            element.PorcentajeCECO2,
            element.PorcentajeCECO3,
            element.PorcentajeCumplimiento,
            element.MesesCumplimiento,
            element.PorcentajePagoSalarios,
            element.AniosPagoSalarios,
            element.PorcentajeResponsabilidadCivil,
            element.PorcentajeManejoAnticipos,
            element.MesesAnticipos,
            element.PorcentajeCalidadServicio,
            element.ValidezCalidadServicio,
            element.ExtensionCalidadServicio,
            element.Garantia,
            element.PolizaColectiva,
            element.PolizaVehiculos,
            element.NroOrden,
            element.TieneIva,
            element.DistribucionPago
        );
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}