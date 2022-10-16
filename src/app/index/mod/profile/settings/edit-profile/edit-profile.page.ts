import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { get, getDatabase, onValue, ref as dref, set } from 'firebase/database';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { User } from '../../../../auth/auth.model';
import { UsersService } from '../../../../service/users.service';

const storage = getStorage();
const database = getDatabase();

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  private editProfile: FormGroup;

  private user: User[];
  private imgurl;

  //error msg
  errorMsg: String = '';
  error_msg = {
    'username': [
      { 
        type: 'required', 
        message: 'Username is required.' 
      }
    ],
    'contact': [
      { 
        type: 'required', 
        message: 'Contact number is required.' 
      }
    ],
    'address1': [
      { 
        type: 'required', 
        message: 'At least one address is required.' 
      }
    ]
  };

  constructor(private usersService: UsersService,
              private builder: FormBuilder) { }

  ngOnInit() {
    // get user pfp
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      const currentid = localStorage.getItem('currentid');
      this.imgurl = (await get((dref(database, 'userpfp/' + currentid)))).val();
    });

    //form validation
    this.editProfile = this.builder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      contact: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address1: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  uploadImg(value){
    const currentid = localStorage.getItem('currentid');
    // get file name
    var file = value.target.files[0]; // get file 
    var filename = value.target.files[0].name; // get filename
    var filetype = value.target.files[0].type; // get filetype

    console.log("filename", filename); // check filename
    console.log("filetype", filetype); // check filetype
    // database variable setup
    var uploadroute = 'userpfp/' + filename;
    var imgurl = "https://firebasestorage.googleapis.com/v0/b/declutter-1172d.appspot.com/o/userpfp%2F"+ filename + "?alt=media";
    
    // file type
    const metadata = {
      contentType: filetype,
    };
    
    // storage reference
    const storageRef = ref(storage, uploadroute);

    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    set(dref(database, "userpfp/" + currentid), {
      imgurl: imgurl
    });
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
