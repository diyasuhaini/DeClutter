import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../auth/auth.model';
import { FollowService } from '../service/follow.service';
import { Item } from '../service/item.model';
import { ItemService } from '../service/item.service';

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

  constructor(private router: Router,
              private itemService: ItemService,
              private followService: FollowService,
              private authenticationService: AuthenticationService
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
    
  }

}
