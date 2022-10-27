import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { report } from '../../service/item.model';
import { ReportService } from '../../service/report.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../../auth/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private reports: report[];
  private people: User[]; //for moderator user
  private userSub: Subscription;

  constructor(private reportService: ReportService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.reportService.retrieveReport().then((list) => {
      console.log(list);
      this.reports = list;
    })


    //for retrieve user data
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });

    this.userSub = this.authenticationService.$users.subscribe(users => {
      console.log(users);
      this.people.forEach((user) => {
        if(user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){ //if similar to current email
          localStorage.setItem('currentid', user.id); //send new currentid to localstorage
          localStorage.setItem('currentusername', user.username); //send new currentname to localstorage
        }else{
          console.log("not good"); //if error
        }
      })
    })

    console.log(this.userSub);
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }
}
