import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getStorage } from 'firebase/storage';
import { ReplyEmailService } from '../../../service/reply-email.service';
import { reply } from 'src/app/index/service/item.model';

// get storage from firebase bucket g://
const storage = getStorage(); 

@Component({
  selector: 'app-reply',
  templateUrl: './reply.page.html',
  styleUrls: ['./reply.page.scss'],
})
export class ReplyPage implements OnInit {

  //get from model
  private myReport: reply[];

  //to submit form
  replyForm: FormGroup;
  replyId: string;

  // error msg for description
  errorMsg: String = '';
  error_msg = {
    'description': [
      { 
        type: 'required', 
        message: 'Description is required.' 
      }
    ]
  };
  builder: any;

  constructor(private router: Router,
              private replyService: ReplyEmailService) { }

  ngOnInit() {

    // router state username & error
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.myReport = [{
      username: routerState.username,
      error: routerState.error,
      description: routerState.description,
    }];
    console.log(this.myReport);

    //form validation
    this.replyForm = this.builder.group({
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  // save form in database 
  submitReply(reply){
    this.replyService.sendReply(
      this.replyId,
      reply.username,
      reply.error,
      reply.description
    ).then((response) => {
      this.router.navigateByUrl('index/mod/inbox/list');
    }, error => {
      // check error
      console.log(error);
    })
    console.log("this is reply id ",this.replyId);
  }

}
