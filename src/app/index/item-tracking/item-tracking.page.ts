import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-tracking',
  templateUrl: './item-tracking.page.html',
  styleUrls: ['./item-tracking.page.scss'],
})
export class ItemTrackingPage implements OnInit {
  
  //first picture
  myImage = "assets/img/box.gif";
  texts = document.getElementById('myText');

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.myImage = 'assets/img/process.gif';
      this.texts.innerHTML = 'your order is being processed!';
      setTimeout(() => {
        this.myImage = 'assets/img/deliver.gif';
      }, 8000);
    }, 6000);
  }

}
