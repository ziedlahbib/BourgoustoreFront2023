import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article.model';
import { Categorie } from 'src/app/model/categorie';
import { FileDB } from 'src/app/model/file-db.model';
import { Type } from 'src/app/model/type';
import { ArticleServiceService } from 'src/app/service/article-service.service';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.scss']
})
export class AjoutArticleComponent implements OnInit {

  public articleform: FormGroup;
  listfile:FileDB[];
  selectedFiles: FileList ;
  currentFile: any;
  progress = 0;
  message = '';
  article:Article;
  fileInfos: Observable<any>;
  file: FileDB;
  id:number;
  type=Type;
  categorie=Categorie;
  constructor(private articleservice :ArticleServiceService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initForm()
    this.listfile=[];
  }

  initForm() {
    this.articleform = this.formBuilder.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      categorie: ['',Validators.required],
      type: ['',Validators.required],
      prix: ['', [Validators.required,,Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
      file: [null, Validators.required],
  });

  this.articleform.valueChanges.subscribe(
    data=>{console.log(this.articleform)}
  )
}

ajouter(){
  console.log(this.articleform.value);
  this.articleservice.ajoutArticle(this.articleform.value).subscribe(
  data=>{
    console.log('ssss',data)
    this.article=data;
    this.articleservice.affecterfileauarticle(this.article.id,this.file.id,this.article).subscribe(
      res=>{
       //this.listfile=res;
     
       this.router.navigate(["/afficherarticle"])
      }
   
  );
 }
);
  
}

selectFile(event:any) {
  this.selectedFiles = event.target.files;
}

upload() :FileDB{
  this.currentFile = this.selectedFiles.item(0);
  console.log(this.selectedFiles)
  console.log(this.currentFile)
  this.articleservice.upload(this.currentFile).subscribe(
  
    event => {
      
               console.log("file",event)
      
        this.articleservice.getFilesdetail(event).subscribe(
          data=>{
            this.file=data;
            console.log('file',this.file)
                   
            
          }
        );
  
      
    }
   );
  return this.file;
}

supprimer(file :FileDB){

this.listfile.splice(this.listfile.indexOf(file),1)
}


}
