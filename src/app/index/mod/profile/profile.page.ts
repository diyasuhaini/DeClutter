import { Component, OnInit } from '@angular/core';
import { get, getDatabase, onValue, ref as dref } from 'firebase/database';
import { getStorage, ref } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { User } from '../../auth/auth.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { UsersService } from '../../service/users.service';

const storage = getStorage();
const database = getDatabase();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private users: User[];
  private currentusername: String;
  private currentid: String;
  private imgurl;
  private userSub: Subscription;

  constructor(private authenticationService: AuthenticationService,
              private usersService: UsersService) { }

  ngOnInit() {

    // get user pfp
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      const currentid = localStorage.getItem('currentid');
      this.imgurl = (await get((dref(database, 'userpfp/' + currentid)))).val();
    });

    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.users = users;
    });

    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.users = users;
      this.users.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentusername = user.username;
          this.currentid = user.id;
          
        }
      });
    });
    
  }

  //get the item from database
  ionViewWillEnter(){ 
    // getting pfp Start
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      const currentid = localStorage.getItem('currentid');
      var imgurl = (await get((dref(database, 'userpfp/' + currentid)))).val();
      console.log(imgurl);
      if (imgurl){
        this.imgurl = imgurl;
      }
    });
    // getting pfp End

    this.usersService.retrieveAccount().then((account) => {
      console.log(account);
      this.users = account;
    })
  }

}
