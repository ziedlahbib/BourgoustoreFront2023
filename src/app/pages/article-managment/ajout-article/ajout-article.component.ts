import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'app/model/article.model';
import { Categorie } from 'app/model/categorie';
import { FileDBTrip } from 'app/model/file-dbtrip.model';
import { Type } from 'app/model/type';
import { ArticleServiceService } from 'app/service/article-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.scss']
})
export class AjoutArticleComponent implements OnInit {

  public articleform: UntypedFormGroup;
  listfile:FileDBTrip[];
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  article:Article;
  fileInfos: Observable<any>;
  file: FileDBTrip;
  id:number;
  type=Type;
  categorie=Categorie;
  constructor(private articleservice :ArticleServiceService,private formBuilder: UntypedFormBuilder,private router:Router) { }

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

selectFile(event) {
this.selectedFiles = event.target.files;
}

upload() :FileDBTrip{
this.progress = 0;
this.currentFile = this.selectedFiles.item(0);
this.articleservice.upload(this.currentFile).subscribe(
  event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      this.message = event.body.message;
      this.articleservice.getFilesdetail(event.body).subscribe(
        data=>{
          this.file=data;
          console.log('file',this.file)
                 
          
        }
      );

    }
  },
  err => {
    this.progress = 0;
    this.message = 'Could not upload the file!';
    this.currentFile = undefined;
  });
this.selectedFiles = undefined;
return this.file;
}

supprimer(file :FileDBTrip){

this.listfile.splice(this.listfile.indexOf(file),1)
}


}
