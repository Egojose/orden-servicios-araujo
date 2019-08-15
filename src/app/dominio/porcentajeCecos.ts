export class PorcentajeCecos{
    constructor(
        public ceco: string, 
        public nombre: string, 
        public id: number, 
        public porcentaje: string, 
        public OrdenServicio: string,
        public director: any,
        public directorEmail: any,
        public aprobado: boolean,
        public fechaAprobado: string,
        public firma: any
       ) {}

    public static fromJson(element: any) {
        let url; 
        element.FirmaCeco !== null ? url = element.FirmaCeco.Url : url === "";
        return new PorcentajeCecos(
             element.Ceco,
             element.Nombre, 
             element.ID, 
             element.PorcentajeAsumido, 
             element.OrdenServicioId, 
             element.DirectorCeco, 
             element.DirectorCeco.EMail, 
             element.Aprobado, 
             element.FechaAprobacion, 
             url);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}