import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth/auth.model';
import { FollowService } from '../service/follow.service';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';
import { get, getDatabase, onValue, ref as dref, set } from 'firebase/database';
import { ReviewsService } from '../service/reviews.service';
import { NotificationsService } from '../service/notifications.service';

const database = getDatabase();

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private user = [];
  private item: Item[];
  private follower = 0;
  private following = 0;
  private reviews = 0;
  private people: User[];
  private userSub: Subscription;
  private cuid: string;
  private vendor: string;
  private isfollowing = false;
  private imgurl;
  private reviewed = 0;

  private time;

  constructor(private router: Router,
              private itemService: ItemService,
              private followService: FollowService,
              private authenticationService: AuthenticationService,
              private reviewer: ReviewsService,
              private notificationService: NotificationsService
    ) { }
  
  ngOnInit() {
    this.item = [];
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.user = [
      {
        vendor: routerState[0].vendor,
        username: routerState[0].username
    }
    ];
    console.log(this.user);
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.cuid = user.id;
        }
      });
    });
    this.vendor = routerState[0].vendor;

    // getting pfp Start
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      this.imgurl = (await get((dref(database, 'userpfp/' + this.vendor)))).val();
    });
    // getting pfp End

    //for time
    this.time = new Date();
  }

  followuser(){
    this.followService.followUser(
      this.cuid,
      this.user[0].vendor
    ).then((response) => {
      this.followService.followedUser(
        this.cuid,
        this.user[0].vendor
      )
    }, error => {
      // check error
      console.log(error);
    })

    this.notificationService.addNotification(
      this.cuid + 'following',
      localStorage.getItem('currentname'),
      this.user[0].username,
      "followed",
      "you",
      this.time,
      "assets/img/follow.png"
    )
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
    this.itemService.getUserItems(this.user[0].vendor).then((item) => {
      this.item = item;
      console.log(item);
    }, error => {
      console.log(error);
    });
    this.followService.checkUserFollowers(this.user[0].vendor).then((number) => {
      this.follower = Object.keys(number).length;
      console.log(this.follower);
    }, error => {
      console.log(error);
    })
    this.followService.checkUserFollowing(this.user[0].vendor).then((number) => {
      this.following = Object.keys(number).length;
      console.log(this.following);
    }, error => {
      console.log(error);
    })
    this.followService.antiDuplicate(this.vendor).then((item) => 
      this.isfollowing = item
    );
    this.reviewer.retrieveReviews(this.vendor).then((reviews) => {
      console.log("reviews", reviews);
      this.reviewed = 0;
      reviews.forEach(() => {
        this.reviewed++
      });
    });
    
  }

}
