import { Article } from "./article.model";
import { Commande } from "./commande.model";

export class ArticleVendu {
    id: number;
    qte: number;
    article:Article;
    commande:Commande[];
}
