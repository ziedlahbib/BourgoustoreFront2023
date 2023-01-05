import { Article } from "./article.model";

export class FileDB {
    id:number;
    name:String;
    type:String;
    data:Int32Array[];
    article:Article;
}
