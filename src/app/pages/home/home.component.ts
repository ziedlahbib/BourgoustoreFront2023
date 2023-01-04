import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectItem } from 'primeng/api';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { CommandeServiceService } from 'src/app/service/commande-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  start=0;
  end=6;
  item:any=[];
  imagesPagination:any[]=[];
  images:any[]=[
    {
      previewImageSrc:"assets/téléchargement222.jpg",
      thumbnailImageSrc:"assets/téléchargement222.jpg",
      title:"zied",
      alt:"zziiieidiidiidi",
      prix:20

    },
    {
      previewImageSrc:"assets/téléchargement222.jpg",
      thumbnailImageSrc:"assets/téléchargement222.jpg",
      title:"ziedsssss",
      alt:"zziiieidiidiidi",
      prix:20

    },
    {
      previewImageSrc:"assets/téléchargement222.jpg",
      thumbnailImageSrc:"assets/téléchargement222.jpg",
      title:"ziedsssss",
      alt:"zziiieidiidiidi",
      prix:20

    },
    {
      previewImageSrc:"assets/téléchargement222.jpg",
      thumbnailImageSrc:"assets/téléchargement222.jpg",
      title:"ziedsssss",
      alt:"zziiieidiidiidi",
      prix:20

    },
    {
      previewImageSrc:"assets/téléchargement222.jpg",
      thumbnailImageSrc:"assets/téléchargement222.jpg",
      title:"ziedsssss",
      alt:"zziiieidiidiidi",
      prix:20
   
    }
  ]
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
  constructor(private cs:CommandeServiceService) { }

  ngOnInit(): void {
    this.imagesPagination=this.images.slice(this.start, this.end)
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    var imagessearch:any[]=[];
    for(let v of this.images)
    {
      if(v.title.includes(filterValue))
      {
        imagessearch.push(v);
      }
    }
    this.imagesPagination=imagessearch;
  }
  paginate(event:PageEvent) {
    let startIndex = event.pageSize * event.pageIndex;
    this.start = startIndex;
    let endIndex = startIndex + event.pageSize;
    this.end = endIndex;
    if (endIndex > this.images.length) {
      endIndex = this.images.length;
    }
    this.imagesPagination = this.images.slice(startIndex, endIndex);
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
