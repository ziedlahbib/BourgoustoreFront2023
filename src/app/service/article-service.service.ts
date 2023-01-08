import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article.model';
import { Categorie } from '../model/categorie';
import { FileDB } from '../model/file-db.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  getArticleUrl="/api/article/get-all-article";
  addarticleUrl="/api/article/add-article";
  uploadfilef="/api/File/uploadf";
  getfiledetail="/api/File/filesdetail";
  deletearticleUrl="/api/article/delete-article";
  afichparcaturl="/api/article/get-article-by-categorie/"
  constructor(private http : HttpClient) { }
  affichArticle() : Observable<Article[]> {
    return this.http.get<Article[]>(this.getArticleUrl);
    }
    affichArticleparcategorie(categorie :String) : Observable<Article[]> {
      return this.http.get<Article[]>(`${this.afichparcaturl}/${categorie}`);
      }
    ajoutArticle(article :Article): Observable<Article>{
      return this.http.post<Article>(`${this.addarticleUrl}`,article);
    }
    upload(file :File): Observable<Number>{
      const formData: FormData = new FormData();
      formData.append('file', file);
      return this.http.post<Number>(`${this.uploadfilef}`,formData)
      };
    
    getFilesdetail(id:Number): Observable<FileDB> {
      return this.http.get<FileDB>(`${this.getfiledetail}/${id}`);
    }
    affecterfileauarticle(id:String,idf:number,article :Article):Observable<Article>{
      return this.http.put<Article>("/api/File/affecter-fileToArticle/"+id+"/"+idf,article);
    }
    deletearticle(id:number): any{
      return this.http.delete(`${this.deletearticleUrl}/${id}`);
    }

}
