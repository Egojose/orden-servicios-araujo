export class Aprobadores{
    constructor(public gerenteUnegocios: string,
                public director: string) { }

    public static fromJson(element: any) {
        return new Aprobadores(
            element.GerenteAdministrativoId,
            element.DirectorOperativoId
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