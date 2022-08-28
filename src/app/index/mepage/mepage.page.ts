import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';


@Component({
  selector: 'app-mepage',
  templateUrl: './mepage.page.html',
  styleUrls: ['./mepage.page.scss'],
})
export class MepagePage implements OnInit {

  private people: User[];
  private currentusername: String;
  private currentid: String;
  private userSub: Subscription;
  private item: Item[];
  private itemlist: any[];
  segmentValue: String = "listing";

  segmentChanged(e){
    this.segmentValue = e.detail.value;
  }

  constructor(private authenticationService: AuthenticationService, private itemService: ItemService) { }

  ngOnInit() {
    this.item = [];
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

     this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      console.log("this.people");
      this.people.forEach((user) => {
        if (user.email == localStorage.getItem('currentemail')){
          this.currentusername = user.username;
          this.currentid = user.id;
        }
      });
    });
    // retriving the posts
    
    this.itemService.myItems().then((item) => {
      var pusheditem = [];
      console.log(item);
      Object.keys(item).forEach((key) => {
        console.log(item[key].vendor + " item[key].vendor");
        console.log( this.currentid+ " this.currentid");
        // if(item[key].vendor == this.currentid){
          pusheditem.push({"title": item[key].title, 
          "img1": item[key].img1, 
          "vendor": item[key].vendor, 
          "brand": item[key].brand,
          "description": item[key].description,
          "price": item[key].price.toFixed(2),
          "name": item[key].title});
        // }
      })
      this.item = pusheditem;
      
      // console.table(this.item);
    }, error => {
      // check error
      console.log(error);
    });
    }


  //get the item from database
  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }

  filter(value2){
    return value2 == this.currentid;
  }

  

}
