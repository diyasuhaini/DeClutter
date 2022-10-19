import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms'; //manually imported
import { UsersService } from '../service/users.service'; //manually imported
import { User } from '../auth/auth.model'; //manually imported
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  //model here
  private user: User[];
  private address;
  private new;

  //formGroup
  addressForm = FormGroup;

  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    //retreive current account
    this.usersService.retrieveAccount().then((account) => {
      console.log(account);
      this.user = account;
      if(account[0].fullname == null){
        account[0].fullname = "";
      }
      if(account[0].address1 == null){
        account[0].address1 = "";
      }
      if(account[0].address2 == null){
        account[0].address2 = "";
      }
      console.log("account", account);
      this.address = new FormControl(account[0].address1);
    })
  }

  toPayment(){
    if(this.new == null || this.new == ""){
      console.log(this.address.value);
      localStorage.setItem('address', this.address.value);
      this.router.navigateByUrl('index/payment');
    }else{
      console.log(this.new);
      localStorage.setItem('address', this.new);
      this.router.navigateByUrl('index/payment');
    }
  }

}
