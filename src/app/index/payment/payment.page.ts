import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { render } from 'creditcardpayments/creditCardPayments';
import { SuccessPaymentPage } from './success-payment/success-payment.page';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private router: Router,
              private alertController: AlertController){
    
  }
  
  ngOnInit() {
    
  }

  ionViewWillEnter(){
    render({
      id: "#myPaypalButtons",
      currency: "SGD",
      value: localStorage.getItem("totalPrice"), //transfer total value of item from previous page
      onApprove: async (details) =>{
        localStorage.setItem('method', 'paypal');
        const alert = await this.alertController.create({
          //below is for database

          //below is for navigate to next page
          subHeader: 'Payment Success!',
          buttons: [{
            text: 'continue',
            handler: () => {
              this.router.navigateByUrl('/index/payment/success-payment')
            }
          }],
        });
        
        //this will go to next page when payment is success
        await alert.present();
      }
    });
  }

  //for cash
  cashBtn(){
    localStorage.setItem('method', 'cash');
  }

}
