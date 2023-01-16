import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { loadStripe } from "@stripe/stripe-js/pure"

import  { NgForm } from "@angular/forms"
//import { AngularStripeService } from '@fireflysemantics/angular-stripe-service'


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
  constructor(private cd: ChangeDetectorRef,
    //private stripeService:AngularStripeService,
    private http : HttpClient) { }
  ngOnDestroy(): void {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
   ngAfterViewInit(): void{
    // this.stripeService.setPublishableKey('pk_test_51MQWvFLBHOF0pYRLryT0sBIYvYLFvJCMQ4tDvla4B4D5jcpZDPjVaaE7FAY5ZsCIPbN0EudiRbYaD478zaiHPbrw00sm0MjpKi').then(
    //   stripe=> {
    //     this.stripe = stripe;
    // const elements = stripe.elements();    
    // this.card = elements.create('card');
    // this.card.mount(this.cardInfo.nativeElement);
    // this.card.addEventListener('change', this.cardHandler);
    //});
    this.stripemeth();
}

  ngOnInit(): void {
    
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
         const headers = new HttpHeaders({'token': token.id, 'amount': '100'});
    this.http.post('/api/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
    }
  }
}



