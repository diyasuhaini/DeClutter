import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../service/donation.service';
import { donation } from '../../service/item.model'; //manually imported

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  //array
  private donate: donation[];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.donationService.getDonate().then((item) => {
      console.log(item);
      this.donate = item;
    })
  }

}
