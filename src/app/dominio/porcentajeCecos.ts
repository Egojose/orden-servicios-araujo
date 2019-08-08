export class PorcentajeCecos{
    constructor(
        public ceco: string, 
        public nombre: string, 
        public id: number, 
        public nit: string, 
        public tipo: string) {}

    public static fromJson(element: any) {
        return new PorcentajeCecos(element.Ceco, element.Nombre, element.ID, element.Nit, element.TipoConsecutivo);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}