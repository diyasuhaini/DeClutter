import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DonationService } from '../../service/donation.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {

  //get current id
  private cuid;
  private currentdate;
  private donationid;
  private uname;

  //select value box
  private places;
  options = ['brunei-muara','tutong','temburong','kuala belait'];
  private deliver;
  deliOpt = ['drop-off','pick-up'];

  //charges value
  private price;

  //add form
  donateForm: FormGroup;

  //add private constructor
  constructor(private donationService: DonationService,
              private router: Router,
              private builder: FormBuilder) { }

  ngOnInit() {
    this.donateForm = this.builder.group({
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
      quantity: new FormControl('', Validators.compose([
        Validators.required
      ])),
      area: new FormControl('', Validators.compose([
        Validators.required
      ])),
      street: new FormControl('', Validators.compose([
        Validators.required
      ])),
      delivery: new FormControl('', Validators.compose([
        Validators.required
      ])),
      charges: new FormControl('', Validators.compose([
        Validators.required
      ])),

    })
  }

  ionViewWillEnter(){
    //get currentid
    this.cuid = localStorage.getItem('currentid');
    //get today date
    this.currentdate = new Date();
    //get donateid
    this.donationid = this.cuid + this.currentdate
    localStorage.setItem('donationid', this.donationid);
    //get username
    this.uname = localStorage.getItem('currentname');
  }
  
  //submit button
  listDonate(donate){
     this.donationService.addDonate(
      //below list of item (from model)
      this.donationid,
      this.uname,
      donate.type,
      donate.quantity,
      donate.area,
      donate.street,
      donate.delivery,
      donate.charges
     ).then((response) => {
      this.router.navigateByUrl('index/donation/success-donate'); //after donate success will redirect to success page
     }, error => {
      console.log(error); //if there is an error when donate
     })
  }


  //trigger button for delivery
  triggerDelivery(item){
    item = this.deliver;
    console.log(item);
    console.log(this.places);

    if(item == 'pick-up'){// if we pick up customer item
      if(this.places == 'brunei-muara'){ //when brunei muara is selected
        this.price = '$3.00';
      }else if(this.places == 'kuala belait'){ //when kuala belait is selected
        this.price = '$8.00';
      }else{ //for tutong and temburong
        this.price = '$5.00';
      }
    }else{ //if customer send their item to our place
      this.price = 'no charges';
    }
  }

  triggerPlaces(item){
    item = this.places;
    console.log(item);
    console.log(this.deliver);

    if(item == 'brunei-muara'){
      if(this.deliver == 'pick-up'){
        this.price = '$3.00';
      }else{
        this.price = 'no charges';
      }
    }else if(item == 'kuala belait'){
      if(this.deliver == 'pick-up'){
        this.price = '$8.00';
      }else{
        this.price = 'no charges';
      }
    }else{
      if(this.deliver == 'pick-up'){
        this.price = '$5.00';
      }else{
        this.price = 'no charges';
      }
    }
  }

}
