import { Component, OnInit } from '@angular/core';
import { reply } from '../service/item.model';
import { ReplyEmailService } from '../service/reply-email.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  private replies: reply[];
  private box = [];

  constructor(private replyService: ReplyEmailService) { }

  ngOnInit() {
    var cuid = localStorage.getItem('currentname'); //retrieve from localstorage
    this.replyService.getReply().then((theReply) => { //get the service
      console.log(theReply); //check if the value is correct
      theReply.forEach((items) => { //separate the item
        if(cuid == items.username){ //check if the item is the real owner
          this.box.push(items); //if correct then push it the empty box
        }
        console.log(items); //check every item
      })
    })
    this.replies = this.box.reverse(); //in reverse
  }

  ionViewWillEnter(){
    
  }

}
