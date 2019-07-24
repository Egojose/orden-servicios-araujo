export class Sede{
    constructor(
        public nombre: string, 
        public id: number, 
        public direccion: string, 
        public telefono: string
        ) {}

    public static fromJson(element: any) {
        return new Sede(
            element.Title, 
            element.ID, 
            element.Direccion, 
            element.Telefono
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