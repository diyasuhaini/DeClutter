import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';
import { Tracks } from '../service/item.model'; //new
import { FollowService } from '../service/follow.service';
import { get, getDatabase, onValue, ref } from 'firebase/database';
import { ReviewsService } from '../service/reviews.service';
import { getAuth } from 'firebase/auth';

const database = getDatabase();

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
  private imgurl;
  private reviewed = 0;
  private earns = {itemsold: 0, totalitem: 0, total: 0, profits: 0 };
  segmentValue: String = "listing";

  //for segment change value
  segmentChanged(e){
    this.segmentValue = e.detail.value;
  }

  constructor(private authenticationService: AuthenticationService, private itemService: ItemService, private followService: FollowService, private reviews: ReviewsService) { }

  ngOnInit() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("user.emailVerified",user.emailVerified);
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
      console.log(this.tracks);
    },error => {
      console.log(error); //there is an error item.service getItemTracking
    })

    this.reviews.retrieveReviews(this.currentid).then((reviews) => {
      console.log("reviews", reviews);
      this.reviewed = 0;
      reviews.forEach(() => {
        this.reviewed++
      });
    });

    // get earns from database for the user
    this.itemService.getEarns().then((item) => {
      if(item){
        console.log("earns on ts", item);
        // earns = {itemsold: 0, totalitem: 0, total: 0, profits: 0 };
        this.earns.itemsold = item[0]; // itemsold
        this.earns.totalitem = item[1]; // totalitem
        this.earns.total = item[2]; // total
        this.earns.profits = item[3]; // profits
      }
    });

    // getting pfp Start
    onValue(ref(database, 'userpfp/'), async (snapshot)=>{
      const currentid = localStorage.getItem('currentid');
      var imgurl = (await get((ref(database, 'userpfp/' + currentid)))).val();
      console.log(imgurl);
      if (imgurl){
        this.imgurl = imgurl;
      }
    });
    // getting pfp End

  }

}
