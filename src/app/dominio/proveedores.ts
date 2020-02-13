export class Proveedores{
    constructor(public nombre: string, public nit: string, public ciudad: string, public telefono: string, public direccion: string, public representante: string, public emailRepresentante: string, id: number) {}

    public static fromJson(element: any) {
        return new Proveedores(element.Title, element.Nit, element.Ciudad, element.Telefono, element.Direccion, element.RepresentanteLegal, element.EmailRepresentante, element.Id);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}