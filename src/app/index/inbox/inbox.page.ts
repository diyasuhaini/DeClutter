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
    var cuid = localStorage.getItem('currentname');
    this.replyService.getReply().then((theReply) => {
      console.log(theReply);
      theReply.forEach((items) => {
        if(cuid == items.username){
          this.box.push(items);
        }
        console.log(items);
      })
    })
    this.replies = this.box.reverse();
  }

  ionViewWillEnter(){
    
  }

}
