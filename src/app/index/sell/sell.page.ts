import { Component, OnInit } from '@angular/core';
import { getApp } from '@angular/fire/app';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { getStorage, ref, uploadBytes } from "firebase/storage";

// get storage from firebase bucket g://
const storage = getStorage(); 

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

  // 
  img1url: String;
  img2url: String;
  img3url: String;

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

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
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
      brand: new FormControl('', Validators.compose([
        Validators.required
      ])),
      type: new FormControl('', Validators.compose([
        Validators.required
      ])),
    })
  }

  listItem(value){
    console.table(value);
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

}