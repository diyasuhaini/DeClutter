import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.page.html',
  styleUrls: ['./sell.page.scss'],
})
export class SellPage implements OnInit {

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
        message: 'Item image is required' 
      }
    ],
    'description': [
      { 
        type: 'required', 
        message: 'Item image is required' 
      }
    ],
    'brand': [
      { 
        type: 'required', 
        message: 'Item image is required' 
      }
    ],
    'type': [
      { 
        type: 'required', 
        message: 'Item image is required' 
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

}
