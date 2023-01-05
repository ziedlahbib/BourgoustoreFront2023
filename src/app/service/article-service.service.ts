import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  getArticleUrl="/api/article/get-all-article";
  constructor(private http : HttpClient) { }
  affichArticle() : Observable<Article[]> {
    return this.http.get<Article[]>(this.getArticleUrl);
    }
}
