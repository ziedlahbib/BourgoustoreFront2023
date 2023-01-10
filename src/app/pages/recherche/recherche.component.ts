import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
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
  articles:Article[];
  articlePagination:Article[];
  constructor(private articleserveice:ArticleServiceService) { }

  ngOnInit(): void {

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
