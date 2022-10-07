import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from '../../service/item.service';
import { User } from '../../auth/auth.model';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { UsersService } from '../../service/users.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private editProfile: FormGroup;

  private user: User[];

  constructor(private router: Router,
              private itemService: ItemService,
              private usersService: UsersService,
              private builder: FormBuilder) { }

  ngOnInit() {
  
  } 

  uploadImg(value){

  }

  updateUser(){
    this.usersService.updateAccount(this.editProfile.value).then((updated) => {
      console.log("updated", updated);
    })
  }

  ionViewWillEnter(){
    this.usersService.retrieveAccount().then((account) => {
      console.log(account);
      this.user = account;
      if(account[0].fullname == null){
        account[0].fullname = "";
      }
      if(account[0].address1 == null){
        account[0].address1 = "";
      }
      if(account[0].address2 == null){
        account[0].address2 = "";
      }
      console.log("account", account);
      this.editProfile = new FormGroup({
        username: new FormControl(account[0].username),
        fullname: new FormControl(account[0].fullname),
        email: new FormControl(account[0].email),
        contact: new FormControl(account[0].contact),
        address1: new FormControl(account[0].address1),
        address2: new FormControl(account[0].address2)
      });
    })
  }

}
