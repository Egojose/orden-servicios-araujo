export class Empleado {
    constructor(
        public id: number,
        public nombreCompleto: string,
        public usuario: any,
        public empresa: string,
        public primerNombre: string,
        public segundoNombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public numeroDocumento: string,
        public tipoDocumento: string,
        public fechaIngreso: any,
        public tipoContrato: string,
        public cargo: string,
        public salario: string,
        public lugarExpedicion: string,
        public salarioTexto: string,
        public area: string,
        public jefe: any,
        public jefeEmail: string,
        public direccion: string,
        public celular: string,
        public sede: string,
        public extension: string,
        public bonos: string,
        public bonoGasolina: string,
        public afp: string,
        public terminoContrato: string,
        public carrera: string,
        public universidad: string,
        public salarioIntegral: string,
        public contactoEmergencia: string,
        public fechaSalida: any,
        public numeroContactoEmergencia: string,
        public grupoSanguineo: string,
        public urlHojaDeVida: any,
        public unidadNegocio: string

    ) {}


    public static fromJson(element: any) {
        return new Empleado(
            element.ID,
            element.Title,
            element.usuario,
            element.Empresa,
            element.PrimerNombre,
            element.SegundoNombre,
            element.PrimerApellido,
            element.SegundoApellido,
            element.NumeroDocumento,
            element.TipoDocumento,
            element.FechaIngreso,
            element.TipoContrato,
            element.Cargo,
            element.Salario,
            element.lugarExpedicion,
            element.salarioTexto,
            element.Area,
            element.JefeId,
            element.JefeEmail,
            element.Direccion,
            element.Celular,
            element.Sede,
            element.Extension,
            element.Bonos,
            element.BonoGasolina,
            element.AFP,
            element.TerminoContrato,
            element.Carrera,
            element.Universidad,
            element.SalarioIntegral,
            element.ContactoEmergencia,
            element.FechaSalida,
            element.NumeroContactoEmergencia,
            element.GrupoSanguineo,
            element.UrlHojaDeVida,
            element.UnidadNegocio
        )
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}