export class Configuracion{
    constructor(
        public consecutivo: string,
        public consecutivoAsociados: string,
        public iva: number,
        public parametroAprobacion: number,
        public id: number) {}

    public static fromJson(element: any) {
        return new Configuracion(
            element.Consecutivo,
            element.ConsecutivoAsociados,
            element.valorIva,
            element.ParametroAprobacionDOperativo,
            element.Id);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}