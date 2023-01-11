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
  afichparcaturl="/api/article/get-article-by-categorie/";
  afichparnameurl="/api/article/get-article-by-name/";
  affichcattypeurl="/api/article/get-article-by-categorie-ET-Type/";
  getArticlebyIdurl="/api/article/get-article"
  constructor(private http : HttpClient) { }
  affichArticle() : Observable<Article[]> {
    return this.http.get<Article[]>(this.getArticleUrl);
    }
    getArticlebyid(id:number): Observable<Article>{
      return this.http.get<Article>(`${this.getArticlebyIdurl}/${id}`);
  
    }
    affichArticleparName(name :String) : Observable<Article[]> {
      return this.http.get<Article[]>(`${this.afichparnameurl}/${name}`);
      }
    affichArticleparcategorie(categorie :String) : Observable<Article[]> {
      return this.http.get<Article[]>(`${this.afichparcaturl}/${categorie}`);
      }
      affichArticleparcategorieType(categorie :String,type:String) : Observable<Article[]> {
        return this.http.get<Article[]>(`${this.affichcattypeurl}/${categorie}/${type}`);
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
    affecterfileauarticle(id:number,idf:number,article :Article):Observable<Article>{
      return this.http.put<Article>("/api/File/affecter-fileToArticle/"+id+"/"+idf,article);
    }
    deletearticle(id:number): any{
      return this.http.delete(`${this.deletearticleUrl}/${id}`);
    }

}
