import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getStorage } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from '../../../auth/auth.model';
import { FeedbackService } from '../../../service/feedback.service';

// get storage from firebase bucket g://
const storage = getStorage(); 

@Component({
  selector: 'app-cust-feedback',
  templateUrl: './cust-feedback.page.html',
  styleUrls: ['./cust-feedback.page.scss'],
})
export class CustFeedbackPage implements OnInit {

  //output username
  private userSub: Subscription;
  private people: User[];
  private currentusername: string;

  //to submit form
  feedbackForm: FormGroup;
  feedbackId: string;

  //error msg
  errorMsg: String = '';
  error_msg = {
    'description': [
      { 
        type: 'required', 
        message: 'Description is required.' 
      }
    ]
  };

  constructor(private builder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router,
              private feedbackService: FeedbackService) { }

  ngOnInit() {

    //output username
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentusername = user.username;
        }
      });
    });

    //form validation
    this.feedbackForm = this.builder.group({
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  //submit form
  submitFeedback(feedback){
    this.feedbackService.sendFeedback(
      this.feedbackId,
      this.currentusername,
      feedback.description
    ).then((response) => {
        this.router.navigateByUrl('index/settings/customer-support');
    }, error => {
      // check error
      console.log(error);
    })
    console.log("this is report id ",this.feedbackId);
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();    
  }

}
