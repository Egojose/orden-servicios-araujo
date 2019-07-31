export class Empresas{
    constructor(public nombre: string, public id: number, public nit: string, public tipo: string) {}

    public static fromJson(element: any) {
        return new Empresas(element.RazonSocial, element.ID, element.Nit, element.TipoConsecutivo);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}