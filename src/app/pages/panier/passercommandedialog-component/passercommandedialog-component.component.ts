import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleVendu } from 'src/app/model/article-vendu.model';
import { Commande } from 'src/app/model/commande.model';
import { ArticlevenduServiceService } from 'src/app/service/articlevendu-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';


@Component({
  selector: 'app-passercommandedialog-component',
  templateUrl: './passercommandedialog-component.component.html',
  styleUrls: ['./passercommandedialog-component.component.scss']
})
export class PassercommandedialogComponentComponent implements OnInit {


  cartItem:ArticleVendu[];
  cartNumber:number=0;
  prixtotal:number=0;
  cmd:Commande = new Commande();
  constructor(public dialogRef: MatDialogRef<PassercommandedialogComponentComponent>,
    private cs:CommandeServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {
      cartItem : ArticleVendu[],
      userID :number,
      prixtotal:number
  },
    private avs :ArticlevenduServiceService,
  ) { }


  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ajouter(){
    var idartv :number[]=[];
    for(let av of this.data.cartItem )
    {
      this.avs.ajoutArticlevendu(av,av.article.id).subscribe(
        data=>{
          idartv.push(data.id);
          this.cs.ajoutCommande(this.cmd,idartv,this.data.userID).subscribe(
            res=>{
              console.log(res.id);
              this.dialogRef.close();
              this.delete();
            }
          )
        }
      )
      
    }
  
    
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
}
