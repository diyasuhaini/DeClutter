import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { ItemService } from '../service/item.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model';
import { Router } from '@angular/router';

// get storage from firebase bucket g://
const storage = getStorage(); 

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  // 
  private people: User[];
  private currentusername: String;
  private cuid: string;
  private userSub: Subscription;
  img1url: string;
  img2url: string;
  img3url: string;

  sellForm: FormGroup;
  errorMsg: String = '';

  error_msg = {
    'img1': [
      { 
        type: 'required', 
        message: 'Item image is required' 
      }
    ],
    'img2': [
      { 
        type: 'required', 
        message: 'Item image is required' 
      }
    ],
    'img3': [
      { 
        type: 'required', 
        message: 'Item image is required' 
      }
    ],
    'title': [
      { 
        type: 'required', 
        message: 'Item title is required' 
      }
    ],
    'description': [
      { 
        type: 'required', 
        message: 'Item description is required' 
      }
    ],
    'price': [
      { 
        type: 'required', 
        message: 'Item price is required' 
      }
    ],
    'color': [
      { 
        type: 'required', 
        message: 'Item color is required' 
      }
    ],
    'categories': [
      { 
        type: 'required', 
        message: 'Item categories is required' 
      }
    ],
    'brand': [
      { 
        type: 'required', 
        message: 'Item brand is required' 
      }
    ],
    'type': [
      { 
        type: 'required', 
        message: 'Item type is required' 
      }
    ],
  };

  constructor(private builder: FormBuilder, private itemService: ItemService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {

    // Sell Form Validators
    this.sellForm = this.builder.group({
      img1: new FormControl('', Validators.compose([
        Validators.required
      ])),
      img2: new FormControl('', Validators.compose([
        Validators.required
      ])),
      img3: new FormControl('', Validators.compose([
        Validators.required
      ])),
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      price: new FormControl('', Validators.compose([
        Validators.required
      ])),
      size: new FormControl('', Validators.compose([
        Validators.required
      ])),
      color: new FormControl('', Validators.compose([
        Validators.required
      ])),
      categories: new FormControl('', Validators.compose([
        Validators.required
      ])),
      brand: new FormControl('', Validators.compose([
        Validators.required
      ])),
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
    })

    // GETING THE CURRENT USER IDs! ------------------------
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email == localStorage.getItem('currentemail')){
          this.cuid = user.id;
        }
      });
    });
    // ----------------------------------------------------
  }

  // for item listing... allow the user to post a new item
  listItem(item){
    this.itemService.postItem(
      item.title + this.cuid,
      this.cuid,
      this.img1url,
      this.img2url,
      this.img3url,
      item.title,
      item.description,
      item.price,
      item.size,
      item.color,
      item.categories,
      item.brand,
      item.type
    ).then((response) => {
      // check if the user already setup payment method
      // if(alreadysetup){ 
        this.router.navigateByUrl('index/home');
      // } else {
        // this.router.navigateByUrl( to where ever payment method page is );
      // }
    }, error => {
      // check error
      console.log(error);
    })

    
  }

  uploadImg(value, value2){

    // get file name
    var file = value.target.files[0]; // get file 
    var filename = value.target.files[0].name; // get filename
    var filetype = value.target.files[0].type; // get filetype

    console.log(filename); // check filename
    console.log(value2);  // check value 2
    console.log(filetype); // check filetype
    // database variable setup
    var uploadroute = 'item-gallery/' + filename;
    var imgurl = "https://firebasestorage.googleapis.com/v0/b/declutter-1172d.appspot.com/o/item-gallery%2F"+ filename + "?alt=media";
    
    // file type
    const metadata = {
      contentType: filetype,
    };
    
    // const imgref = ref(storage, uploadroute);
    
    // storage reference
    const storageRef = ref(storage, uploadroute);

    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    
    // setting url to be pushed for gallery
    if(value) {
     switch(value2){
      case "img1":
        this.img1url = imgurl; 
        break;
      case "img2":
        this.img2url = imgurl; 
        break;
      case "img3":
        this.img3url = imgurl; 
        break;
     } 
    }
  }

  //get the item from database
  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();
  }

}