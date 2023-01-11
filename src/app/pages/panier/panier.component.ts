import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleVendu } from 'src/app/model/article-vendu.model';
import { Article } from 'src/app/model/article.model';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { PassercommandedialogComponentComponent } from './passercommandedialog-component/passercommandedialog-component.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  cartItem:ArticleVendu[];
  cartNumber:number=0;
  prixtotal:number=0;
  constructor(public dialog: MatDialog,private cs:CommandeServiceService) { }

  ngOnInit(): void {
    this.cartItemFunc();
    this.calculeprixtotal();
  }


  cartItemFunc(){
      if(localStorage.getItem('localCart')!=null){
          var cartCount=JSON.parse(localStorage.getItem('localCart')||'[]');
          this.cartItem=cartCount;
          console.log('localstorage',cartCount.length);
          console.log('localstorage',this.cartItem)
          
  }else{
      this.cartItem=[];
      
  }
}
deleteitem(articlev:ArticleVendu){

  this.cartItem.splice(this.cartItem.indexOf(articlev),1);
  this.prixtotal=this.prixtotal-articlev.article.prix*articlev.qte;
  localStorage.setItem('localCart',JSON.stringify(this.cartItem));
  this.cartNumberFunc();
}
delete(){
  localStorage.clear();
  var cartCount=JSON.parse(localStorage.getItem('localCart')||'[]');
          this.cartItem=cartCount;
          this.prixtotal=0;
          this.cartNumberFunc();
}

cartNumberFunc(){
  var cartValue=JSON.parse(localStorage.getItem('localCart')|| '[]');
  this.cartNumber=cartValue.length;
  console.log(this.cartNumber);
  this.cs.cartSubject.next(this.cartNumber);
}

calculeprixtotal():number{
  for(let i of this.cartItem){
      this.prixtotal=this.prixtotal+(i.qte*i.article.prix);
  }
  return this.prixtotal;
}
dialoggg(){
  const dialogRef = this.dialog.open(PassercommandedialogComponentComponent, {
    data: {
        title: "NWAS NTD"
    },
    width: '600px',
    height: '300px',
    panelClass: 'epsSelectorPanel'
});
  dialogRef.updatePosition({ top: '170px', left: '500px' });
  dialogRef.afterClosed().subscribe(data => {

  });
}
}
