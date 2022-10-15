import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { getDatabase, ref, onValue, get} from "firebase/database";
import { ReviewsService } from '../service/reviews.service';

const database = getDatabase();

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  @ViewChild("messageContainer") mContainer: ElementRef;

  private currentid = localStorage.getItem('currentid');
  private vendorid;
  private vendorname;
  private message: FormGroup;
  private currentname = localStorage.getItem('currentname');
  private messages;
  private vimg;
  private cimg;

  constructor(private router: Router, private messageService: MessageService, private builder: FormBuilder, private reviews: ReviewsService) { }

  ngOnInit() {
    this.message = new FormGroup({
      text: new FormControl()
    });
    // get the router state from the previous page
    const routerState = this.router.getCurrentNavigation().extras.state;
    // turn the router state into an array
      this.vendorid = routerState[0].vendor;
      this.vendorname = routerState[0].username;

    onValue(ref(database, "message/" + this.currentid + this.vendorid), (snapshot) => {
      this.messageService.retrieveMessage(this.vendorid).then((message) => this.messages = message);
    })

    onValue(ref(database, "message/" + this.vendorid + this.currentid), (snapshot) => {
      this.messageService.retrieveMessage(this.vendorid).then((message) => this.messages = message);
    })

    onValue(ref(database, 'userpfp/'), async (snapshot)=>{
      this.cimg = (await get((ref(database, 'userpfp/' + this.currentid)))).val();
    });

    onValue(ref(database, 'userpfp/'), async (snapshot)=>{
      this.vimg = (await get((ref(database, 'userpfp/' + this.vendorid)))).val();
    });
  }

  sendmessage(){
    this.messageService.sendmessage(this.message.value.text, this.vendorid);
  }

  ionViewWillEnter(){
    this.messageService.retrieveMessage(this.vendorid).then((message) => this.messages = message);
  }

  ngAfterViewInit() {}

  ngAfterViewChecked() {
    this.mContainer.nativeElement.scrollTop = this.mContainer.nativeElement.scrollHeight;
  }

  



}
