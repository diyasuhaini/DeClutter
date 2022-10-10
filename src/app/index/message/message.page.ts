import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../service/message.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  private vendorid;
  private vendorname;
  private message: FormGroup;

  constructor(private router: Router, private messageService: MessageService, private builder: FormBuilder) { }

  ngOnInit() {
    this.message = new FormGroup({
      text: new FormControl()
    });
    // get current user id
    const currentid = localStorage.getItem('currentid');
    // get the router state from the previous page
    const routerState = this.router.getCurrentNavigation().extras.state;
    // turn the router state into an array
      this.vendorid = routerState[0].vendor;
      this.vendorname = routerState[0].username;
  }

  sendmessage(text){
    this.messageService.sendmessage(this.message.value.text, this.vendorid);
  }



}
