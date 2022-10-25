import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../service/notifications.service'; //manually added
import { notification } from '../service/item.model'; //manuallty added

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.page.html',
  styleUrls: ['./alerts.page.scss'],
})
export class AlertsPage implements OnInit {

  //variable
  private notify = [];
  private current;

  constructor(private notificationService:NotificationsService) { }

  ngOnInit() {
    this.notificationService.getNotification().then((items) => {
      this.current = localStorage.getItem('currentname');
      items.forEach((keys) => {
        if(keys.vendor == this.current){
          this.notify.push(keys);
        }
      })
      
      console.log(this.notify);
    })
  }

  ionViewWillEnter(){
    
  }
}
