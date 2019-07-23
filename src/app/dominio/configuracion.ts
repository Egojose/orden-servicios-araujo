export class Configuracion{
    constructor(
        public consecutivo: string,
        public consecutivoAsociados: string,
        public iva: number,
        public consultores: string,
        public asociados: string,
        public id: number) {}

    public static fromJson(element: any) {
        return new Configuracion(
            element.Consecutivo,
            element.ConsecutivoAsociados,
            element.valorIva,
            element.AraujoConsultores,
            element.AraujoAsociados,
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