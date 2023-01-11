import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/model/article.model';
import { ArticleServiceService } from 'src/app/service/article-service.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {

  start=0;
  end=6;
  value:string;
  articles:Article[]=[];
  articlePagination:Article[]=[];
  constructor(private articleserveice:ArticleServiceService,
    
    private act: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.get();
  }
  get(){
    this.act.queryParams.subscribe(
      data=>{
        console.log(data)
        this.value=data.filterValue
        if(data.filterValue=="")
        this.router.navigate(['/home'])
        else{
          this.articleserveice.affichArticleparName(data.filterValue).subscribe(
            res=>{
              console.log(res)
                this.articles=res;
                this.articlePagination=this.articles.slice(this.start, this.end);
            }
          )
        }


      }
    )
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
}
