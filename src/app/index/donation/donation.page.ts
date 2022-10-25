import { Component, OnInit } from '@angular/core';
import { DonationService } from '../service/donation.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  //auto scroll
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };


  //variable
  private totalquantity = 0;

  constructor(private donationService: DonationService) { }

  ngOnInit() {
  }


  //auto load
  ionViewWillEnter(){
    this.donationService.getDonate().then((item) => { //get service
      this.totalquantity = 0;
      item.forEach((key) => { //for each item
        this.totalquantity = this.totalquantity + key.quantity; //add the quantity
      })
      console.log(this.totalquantity); //check console
    })
  }

}
