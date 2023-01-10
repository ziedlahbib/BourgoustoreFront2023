import { Article } from "./article.model";
import { User } from "./user.model";

export class Commande {
    id: number;
    articles:Article[];
    user:User;
}
