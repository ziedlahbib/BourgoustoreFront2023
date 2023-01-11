import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleVendu } from '../model/article-vendu.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlevenduServiceService {

  addarticlevenduUrl="/api/articlevendu/add-articlevendu";
  constructor(private http : HttpClient) { }
  ajoutArticlevendu(article :ArticleVendu,id:number): Observable<ArticleVendu>{
    return this.http.post<ArticleVendu>(`${this.addarticlevenduUrl}/${id}`,article);
  }
}
