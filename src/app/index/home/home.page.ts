import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { Item } from '../service/item.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private item: Item[];
  private userSub: Subscription;
  private people: User[];
  private currentusername: string;
  private currentid: string;

  //auto scroll
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay:true
   };

  constructor(private itemService: ItemService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.item = [];
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

     this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentusername = user.username;
          this.currentid = user.id;
          console.log(user.id);
          localStorage.setItem('currentid', user.id);
        }
      });
    });
    
  }


    
  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
    this.itemService.myItems().then((item) => {
      this.item = item;
    }, error => {
      console.log(error);
    });
  }

  

}
