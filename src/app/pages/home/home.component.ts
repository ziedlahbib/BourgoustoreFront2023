import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectItem } from 'primeng/api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { Categorie } from 'src/app/model/categorie';
import { Article } from 'src/app/model/article.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
  constructor(private cs:CommandeServiceService,private articleserveice:ArticleServiceService) { }

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
  itemsCart:any[]=[];
addtoCart(article:any){
  this.itemsCart=JSON.parse(localStorage.getItem('localCart')|| '[]');
  this.itemsCart.push(article);
  console.log("sss",this.itemsCart)
  localStorage.setItem('localCart',JSON.stringify(this.itemsCart));
  this.cartNumberFunc();
}
cartNumber:number=0;
cartNumberFunc(){
  var cartValue=JSON.parse(localStorage.getItem('localCart')|| '[]');
  this.cartNumber=cartValue.length;
  console.log(this.cartNumber);
  this.cs.cartSubject.next(this.cartNumber);
}
}
