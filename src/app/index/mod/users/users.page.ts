import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../auth/auth.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { UsersService } from '../../service/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private userSub: Subscription;
  private people;
  private newPeople = [];
  private currentusername: string;
  private imgurl;

  constructor(private authenticationService: AuthenticationService,
              private userService: UsersService) { }

  ngOnInit() {
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      console.log(this.people);
      Object.keys(this.people).forEach((key) => {

        //get pfp
        this.userService.retrievepfp(this.people[key].id).then((pfp) => {
          this.newPeople[key] = {
            id:this.people[key].id,
            email:this.people[key].email,
            contact:this.people[key].contact,
            username:this.people[key].username,
            imgurl:pfp
          };
          console.log(this.newPeople);
          console.log("pfp:",pfp);

        }, error => {
          console.log(error);
        });
      })
    });

  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();

    
    
  }

}
