export class BandejaServicios{
    constructor(
        public Id: string,
        public NumeroOrden: string,
        public Solicitante: string,
        public FechaSolicitud: Date,
        public Empresa: string,
        public Estado: string,
        public RazonSocial: string,
        public NroJob: string,
        public aprobado: boolean
    ) { }

    public static fromJson(element: any) {
        return new BandejaServicios(
            element.Id,
            element.NroOrden,
            element.UsuarioSolicitante.Title,
            element.Created,
            element.Title,
            element.Estado,
            element.RazonSocial,
            element.NroJob,
            element.Aprobado
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