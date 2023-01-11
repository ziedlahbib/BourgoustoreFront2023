import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectItem } from 'primeng/api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { Categorie } from 'src/app/model/categorie';
import { Article } from 'src/app/model/article.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleVendu } from 'src/app/model/article-vendu.model';
import { ArticlevenduServiceService } from 'src/app/service/articlevendu-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public articleForm: FormGroup;
  article:Article;
  start=0;
  end=6;
  articles:Article[];
  articlePagination:Article[];
  ArticleGaming:Article[];
  Articletelephonique:Article[];
  Articleinfoematique:Article[];
  item:Article;
  
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(private cs:CommandeServiceService,private articleserveice:ArticleServiceService,
    private formBuilder: FormBuilder,private avs:ArticlevenduServiceService) { }

  ngOnInit(): void {

    
    this.articleserveice.affichArticle().subscribe(
      data=>{
        this.articles=data;
        this.articlePagination=this.articles.slice(this.start, this.end);
      }
    )
    
      this.articleserveice.affichArticleparcategorie("Univers_Gaming").subscribe(
        data=>{
          console.log(data);
          this.ArticleGaming=data;

        }
      )
      this.articleserveice.affichArticleparcategorie("Univers_Telephonie").subscribe(
        data=>{
          console.log(data);
          this.Articletelephonique=data;

        }
      )
      this.articleserveice.affichArticleparcategorie("Univers_Informatique").subscribe(
        data=>{
          console.log(data);
          this.Articleinfoematique=data;

        }
      )
      this.initForm();

  }
  initForm() {

  this.articleForm = this.formBuilder.group({
    qte: ['',]

  });
   this.articleForm.valueChanges.subscribe(
  data=>{console.log(this.articleForm)}
 )
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    var imagessearch:any[]=[];
    for(let v of this.articles)
    {
      if(v.name.includes(filterValue))
      {
        imagessearch.push(v);
      }
    }
    this.articlePagination=imagessearch;
  }
  paginate(event:PageEvent) {
    let startIndex = event.pageSize * event.pageIndex;
    this.start = startIndex;
    let endIndex = startIndex + event.pageSize;
    this.end = endIndex;
    if (endIndex > this.articles.length) {
      endIndex = this.articles.length;
    }
    this.articlePagination = this.articles.slice(startIndex, endIndex);
  }
  itemsCart:ArticleVendu[]=[];
addtoCart(article:Article){
  this.itemsCart=JSON.parse(localStorage.getItem('localCart')|| '[]');
  console.log("article vendu",this.articleForm.value);
  this.avs.ajoutArticlevendu(this.articleForm.value,article.id).subscribe(
    data=>{
      console.log("article vendu",this.articleForm.value);
      console.log("data",data);
      this.itemsCart.push(data);
      console.log("sss",this.itemsCart)
      localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
      this.cartNumberFunc();

    }
  );
  

}
cartNumber:number=0;
cartNumberFunc(){
  var cartValue=JSON.parse(localStorage.getItem('localCart')|| '[]');
  this.cartNumber=cartValue.length;
  console.log(this.cartNumber);
  this.cs.cartSubject.next(this.cartNumber);
}
}
