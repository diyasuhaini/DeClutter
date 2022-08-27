import { Component, OnInit } from '@angular/core';
// import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor() {
    // render({
    //   id: "#myPaypalButtons",
    //   currency: "SGD",
    //   value: "1.00",
    //   onApprove: (details) =>{
    //     alert("HEHE Success");
    //   }
    // });
   }

  ngOnInit() {
  }

}
