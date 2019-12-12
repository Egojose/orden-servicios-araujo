import { environment } from 'src/environments/environment';


export class Documento {
    constructor(
      public id: number,
      public nombreArchivo: string,
      public rutaArchivo: string,
      public idOrden: any
    ) {}


    public static fromJson(element: any) {
        return new Documento(
            element.ID,
            element.File.Name,
            environment.urlRaiz + element.File.ServerRelativeUrl,
            element.idOrdenServicioId
        )
    }

    public static fromJsonList(elements: any) {
        var list = [];
        for (var i = 0; i < elements.length; i++) {
            list.push(this.fromJson(elements[i]));
        }
        return list;
    }
}