import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-cust-feedback',
  templateUrl: './cust-feedback.page.html',
  styleUrls: ['./cust-feedback.page.scss'],
})
export class CustFeedbackPage implements OnInit {

  // private userSub: Subscription;
  // private people: User[];
  // private currentusername: string;
  // feedbackForm: FormGroup;
  // feedbackId: string;

  // errorMsg: String = '';
  // error_msg = {
  //   'description': [
  //     { 
  //       type: 'required', 
  //       message: 'Description is required.' 
  //     }
  //   ]
  // };
  // feedbackService: any;

  constructor() { }
// private builder: FormBuilder,
//               private authenticationService: AuthenticationService,
//               private feedbackService: feedbackService,
//               private router: Router
  ngOnInit() {
    // this.userSub = this.authenticationService.$users.subscribe(users => {
    //   this.people = users;
    // });
    // this.userSub = this.authenticationService.$users.subscribe(users => {
    //   this.people = users;
    //   this.people.forEach((user) => {
    //     if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
    //       this.currentusername = user.username;
    //     }
    //   });
    // });
  }

  // submitFeedback(feedback){
  //   this.feedbackService.sendFeedback(
  //     this.feedbackId,
  //     this.currentusername,
  //     feedback.description
  //   ).then((response) => {
  //       this.router.navigateByUrl('index/settings/customer-support');
  //   }, error => {
  //     // check error
  //     console.log(error);
  //   })
  //   console.log("this is report id ",this.feedbackId);
  // }

  // ionViewWillEnter(){
  //   this.authenticationService.fetchUser().subscribe();    
  // }

}
