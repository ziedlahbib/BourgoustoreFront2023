import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';;
import {MatSort, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { FileDB } from 'src/app/model/file-db.model';
import { Article } from 'src/app/model/article.model';
import { ArticleServiceService } from 'src/app/service/article-service.service';


@Component({
  selector: 'app-article-managment',
  templateUrl: './article-managment.component.html',
  styleUrls: ['./article-managment.component.scss']
})
export class ArticleManagmentComponent implements OnInit {

  listofarticles:Article[];
  fileById:FileDB[];
  imageSource:String;
  counters = [100, 200, 10];
  meilleurDestination:any;
  displayedColumns = ['image','description', 'categorie', 'type','name','prix','option'];
  dataSource: MatTableDataSource<Article>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private articleserveice:ArticleServiceService) { }


  ngOnInit(): void {
    this.articleserveice.affichArticle().subscribe(
      data=>{
        this.listofarticles=data;
        this.dataSource=new MatTableDataSource(this.listofarticles);
        this.dataSource._renderChangesSubscription;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   
  }

  supprimer(article :any){
    this.articleserveice.deletearticle(article.id).subscribe(()=>this.articleserveice.affichArticle().subscribe(
      data=>{
        this.listofarticles=data;
        this.dataSource = new MatTableDataSource(this.listofarticles);
       let audio = new Audio()
       audio.src= "../assets/alert.mp3"
       audio.src= "../assets/confirm2.mp3"
       audio.load();
       audio.play();
      }
    )
    );
  }
}
