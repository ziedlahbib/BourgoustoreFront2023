import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { loadStripe } from "@stripe/stripe-js/pure"

import  { NgForm } from "@angular/forms"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleVendu } from 'src/app/model/article-vendu.model';
import { ArticlevenduServiceService } from 'src/app/service/articlevendu-service.service';
import { CommandeServiceService } from 'src/app/service/commande-service.service';
import { Commande } from 'src/app/model/commande.model';
import { User } from 'src/app/model/user.model';
import { UserServiceService } from 'src/app/service/user-service.service';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit,AfterViewInit, OnDestroy {

  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  stripe;
  loading = false;
  confirmation;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  cmd:Commande = new Commande();
  cartItem:ArticleVendu[];
  cartNumber:number=0;
  prixtotal:number=0;
  user: User;
  constructor(private cd: ChangeDetectorRef,
    private http : HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {
         cmd :Commande
  },
  private avs :ArticlevenduServiceService,
  private cs:CommandeServiceService,
  public dialogRef: MatDialogRef<PaymentComponent>,
  private us: UserServiceService,
  ) { }
  ngOnDestroy(): void {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
   ngAfterViewInit(): void{
    this.us.getuserbyusername(sessionStorage.authenticatedUser).subscribe(
      res => {
          this.user = res;
      }
  )
    this.stripemeth();

}

  ngOnInit(): void {
    this.cartItemFunc();
    console.log(this.cartItem);
    this.calculeprixtotal();
    console.log(this.prixtotal)
  }
 async stripemeth(){
  loadStripe.setLoadParameters({ advancedFraudSignals: false })
  const stripe = await loadStripe('pk_test_51MQWvFLBHOF0pYRLryT0sBIYvYLFvJCMQ4tDvla4B4D5jcpZDPjVaaE7FAY5ZsCIPbN0EudiRbYaD478zaiHPbrw00sm0MjpKi');
  this.stripe = stripe;
  const elements = stripe.elements();
  this.card = elements.create('card');
  this.card.mount(this.cardInfo.nativeElement);
  this.card.addEventListener('change', this.cardHandler)
 }
  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }
  async onSubmit(form: NgForm) {

    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
      var idartv :number[]=[];
    for(let av of this.cartItem )
    {
      this.avs.ajoutArticlevendu(av,av.article.id).subscribe(
        data=>{
          idartv.push(data.id);
          console.log(this.data.cmd);
          this.cs.ajoutCommande(this.data.cmd,idartv,this.user.userId).subscribe(
            res=>{
              console.log(res.id);
              const headers = new HttpHeaders({'token': token.id, 'amount': this.prixtotal.toString()});
              this.http.post('/api/payment/charge', {}, {headers: headers})
                .subscribe(resp => {
                  console.log(resp);
                })
              this.dialogRef.close();
              this.delete();
            }
          )
        }
      )
      
    }  

    }
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
}



