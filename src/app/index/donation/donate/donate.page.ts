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
    this.cuid = localStorage.getItem('currentid');
    this.currentdate = new Date();
  }
  
  //submit button
  listDonate(donate){
     this.donationService.addDonate(
      //below list of item (from model)
      this.cuid + this.currentdate,
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

}
