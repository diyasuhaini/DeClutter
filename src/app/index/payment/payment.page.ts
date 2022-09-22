import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    
    render({
      id: "#myPaypalButtons",
      currency: "SGD",
      value: localStorage.getItem("totalPrice"), //transfer total value of item from previous page
      onApprove: (details) =>{
        alert("HEHE Success");
      }
    });
  }

}
