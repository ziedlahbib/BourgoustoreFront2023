import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article.model';
import { ArticleServiceService } from 'src/app/service/article-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';

@Component({
  selector: 'app-affichcategorietype',
  templateUrl: './affichcategorietype.component.html',
  styleUrls: ['./affichcategorietype.component.scss']
})
export class AffichcategorietypeComponent implements OnInit {

  start=0;
  end=6;
  articles:Article[];
  articlePagination:Article[];
  constructor(private cs:CommandeServiceService,private articleserveice:ArticleServiceService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    console.log('cat',this.router.snapshot.queryParams.cat);
    console.log('cat',this.router.snapshot.queryParams.type);
    this.articleserveice.affichArticleparcategorieType(this.router.snapshot.queryParams.cat,this.router.snapshot.queryParams.type).subscribe(
      data=>{
          this.articles=data;
          this.articlePagination=this.articles.slice(this.start, this.end);
          
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
