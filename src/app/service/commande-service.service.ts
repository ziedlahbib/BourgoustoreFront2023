import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticleVendu } from '../model/article-vendu.model';
import { Article } from '../model/article.model';
import { Commande } from '../model/commande.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeServiceService {

  addcommandeUrl="/api/commande/add-Commande";
  constructor(private http : HttpClient) { }
  ajoutCommande(cmd :Commande,article:number[],iduser:Number): Observable<Commande>{
    return this.http.post<Commande>(`${this.addcommandeUrl}/${article}/${iduser}`,cmd);
  }
  cartSubject = new Subject<any>();
}
