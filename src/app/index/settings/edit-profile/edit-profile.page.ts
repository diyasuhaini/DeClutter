import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { User } from '../../auth/auth.model';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private user: User[];

  constructor(private router: Router,
              private itemService: ItemService,
              private builder: FormBuilder) { }

  ngOnInit() {
    
  }

  uploadImg(value){

  }

  ionViewWillEnter(){
    this.itemService.retrieveAccount().then((account) => {
      console.log(account);
      this.user = account;
    })

    this.itemService.updateAccount().then((updated) => {
      console.log(updated);
    })
  }

}
