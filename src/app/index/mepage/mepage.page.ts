import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';
import { Tracks } from '../service/item.model'; //new
import { FollowService } from '../service/follow.service';


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
  private tracks: Tracks[]; //new
  private itemlist: any[];
  private follower = 0;
  private following = 0;
  segmentValue: String = "listing";

  //for segment change value
  segmentChanged(e){
    this.segmentValue = e.detail.value;
  }

  constructor(private authenticationService: AuthenticationService, private itemService: ItemService, private followService: FollowService) { }

  ngOnInit() {
    this.item = []; //
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

     this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentusername = user.username;
          this.currentid = user.id;
        }
      });
    });
    
  }

  

  


  //get the item from database
  ionViewWillEnter(){

    //get from item database
    this.authenticationService.fetchUser().subscribe();
    this.itemService.getVendorItems().then((item) => {
      this.item = item;
      console.log(item);
    }, error => {
      console.log(error);
    });

    //for follower
    this.followService.checkFollowers().then((number) => {
      this.follower = Object.keys(number).length;
      console.log(this.follower);
    }, error => {
      console.log(error);
    })

    //for following
    this.followService.checkFollowing().then((number) => {
      this.following = Object.keys(number).length;
      console.log(this.following);
    }, error => {
      console.log(error);
    })


    //get from tracks database
    this.itemService.getItemTracking().then((tracks) => { //refer from item.service getItemTracking
      this.tracks = tracks; //get the value
    },error => {
      console.log(error); //there is an error item.service getItemTracking
    })
  }

  

}
