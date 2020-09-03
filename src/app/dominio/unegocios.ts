export class Unegocios{
    constructor(
        public nombre: string, 
        public id: number, 
        public responsable: any, 
        // public responsableId: number, 
        // public responsableEmail: string
        ) {}

    public static fromJson(element: any) {
        return new Unegocios(
             element.Title,
             element.ID,
             element.Director, 
            //  element.Director.ID, 
            //  element.Director.EMail
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