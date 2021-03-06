export class CentroCosto{
    constructor(public nombre: string, public id: number, public ceco: string, public directorId: any) {}

    public static fromJson(element: any) {
        return new CentroCosto(element.Title, element.ID, element.CentroCosto, element.DirectorCecoId);
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}