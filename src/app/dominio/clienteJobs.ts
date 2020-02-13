export class ClienteJobs{
    constructor(public cliente: string, public nit: string) {}

    public static fromJson(element: any) {
        return new ClienteJobs(element.NombreCliente, element.Nit);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}