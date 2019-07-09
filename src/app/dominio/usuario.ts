export class Usuario{

    id: number;
    nombre: string;
    email: string;
    IdJefeDirecto: number;
    NombreJefeDirecto: string;
    Area: string;
    EmailJefeDirecto: string;    

    constructor(nombre: string, email: string, id: number, IdJefeDirecto?: number, NombreJefeDirecto?: string, Area?: string, EmailJefeDirecto?: string){
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.IdJefeDirecto= IdJefeDirecto;
        this.NombreJefeDirecto = NombreJefeDirecto;
        this.Area = Area;
        this.EmailJefeDirecto = EmailJefeDirecto;
    }

    public static fromJson(element: any) {
        return new Usuario(element.Title, element.Email, element.Id, -1, "", "", "");
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}