import { Categorie } from "./categorie";
import { FileDB } from "./file-db.model";

import { Type } from "./type";

export class Article {
    id: number;
    description: String;
    name:String;
    prix: number;
    categorie:Categorie;
    type:Type;
    files:FileDB;
}
