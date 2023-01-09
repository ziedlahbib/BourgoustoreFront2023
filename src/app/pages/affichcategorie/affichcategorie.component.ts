import { AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavbarComponent } from 'src/app/Component/front/navbar/navbar.component';
import { Article } from 'src/app/model/article.model';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';

@Component({
  selector: 'app-affichcategorie',
  templateUrl: './affichcategorie.component.html',
  styleUrls: ['./affichcategorie.component.scss']
})
export class AffichcategorieComponent implements OnInit {

  start=0;
  end=6;
  articles:Article[];
  articlePagination:Article[];
  constructor(private cs:CommandeServiceService,private articleserveice:ArticleServiceService) { }

  ngOnInit(): void {
    
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
