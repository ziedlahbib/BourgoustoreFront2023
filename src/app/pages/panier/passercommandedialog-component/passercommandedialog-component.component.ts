import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleVendu } from 'src/app/model/article-vendu.model';
import { Commande } from 'src/app/model/commande.model';
import { User } from 'src/app/model/user.model';
import { ArticlevenduServiceService } from 'src/app/service/articlevendu-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PaymentComponent } from '../../payment/payment.component';


@Component({
  selector: 'app-passercommandedialog-component',
  templateUrl: './passercommandedialog-component.component.html',
  styleUrls: ['./passercommandedialog-component.component.scss']
})
export class PassercommandedialogComponentComponent implements OnInit,AfterViewInit {


  user: User;
  role: string;
  username: String;
  isLoggedIn = false;
  cartItem:ArticleVendu[];
  cartNumber:number=0;
  prixtotal:number=0;
  cmd:Commande = new Commande();
  constructor(public dialogRef: MatDialogRef<PassercommandedialogComponentComponent>,
    public dialog: MatDialog,
    private cs:CommandeServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {
      cartItem : ArticleVendu[],
      userID :Number,
      prixtotal:number
  },
    private avs :ArticlevenduServiceService,
    private us: UserServiceService
  ) { }
  ngAfterViewInit(): void {
    this.us.getuserbyusername(sessionStorage.authenticatedUser).subscribe(
      data => {
          this.user = data;
          this.role = data.role.role;
          this.username = data.userName;
      }
  )

  }


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
          console.log(this.data.prixtotal)
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
  payer(){
    const dialogRef = this.dialog.open(PaymentComponent, {
      data: {
          title: "NWAS NTD",
          cmd:this.cmd

  
      },
      width: '600px',
      height: '230px',
      panelClass: 'epsSelectorPanel'
  });
    dialogRef.updatePosition({ top: '170px', left: '500px' });
    dialogRef.afterClosed().subscribe(data => {
      this.dialogRef.close()
      this.cartItemFunc();
      this.prixtotal=0;
  
    });
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
    this.cs.cartSubject.next(this.cartNumber);
  }
  cartItemFunc(){
    if(localStorage.getItem('localCart')!=null){
        var cartCount=JSON.parse(localStorage.getItem('localCart')||'[]');
        this.cartItem=cartCount;
        
}else{
    this.cartItem=[];
    
}
}
}
