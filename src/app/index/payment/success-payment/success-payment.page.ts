import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//below is manually import
import { Item } from '../../service/item.model';
import { ItemService } from '../../service/item.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.page.html',
  styleUrls: ['./success-payment.page.scss'],
})
export class SuccessPaymentPage implements OnInit {

  //add private tracking item
  private trackId: string


  constructor(private itemService: ItemService,
              private router: Router) { }

  ngOnInit() {
  }


  //add tracking data
  async addTracking(){
    this.itemService.addItemTracking().then(() => {
      this.itemService.clearCart().then(() => {
        this.router.navigateByUrl("/index/home"); //go back to home
      }); //clear current item
      console.log('working jua');
    })

    //this will update the quantity of item list
    this.itemService.updateItemQty().then((update) => {
      console.log(update);
    })
  }

  

}
