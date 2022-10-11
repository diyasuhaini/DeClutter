import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../../auth/auth.model';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportService } from '../../..//service/report.service'
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { report } from 'process';

// get storage from firebase bucket g://
const storage = getStorage(); 

@Component({
  selector: 'app-cust-report',
  templateUrl: './cust-report.page.html',
  styleUrls: ['./cust-report.page.scss'],
})
export class CustReportPage implements OnInit {

  //output email
  private userSub: Subscription;
  private people: User[];
  private currentusername: string;

  //for error screenshot
  private screenshotUrl: string;

  //to submit form
  reportForm: FormGroup;
  reportId: string;

  //error msg
  errorMsg: String = '';
  error_msg = {
    'error': [
      { 
        type: 'required', 
        message: 'Type of error is required.' 
      }
    ],
    'screenshot': [
      { 
        type: 'required', 
        message: 'Error screenshot is required.' 
      }
    ],
    'description': [
      { 
        type: 'required', 
        message: 'Description is required.' 
      }
    ]
  };

  constructor(private builder: FormBuilder,
              private authenticationService: AuthenticationService,
              private reportService: ReportService,
              private router: Router) { }

  ngOnInit() {
    //output email
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
    });
    this.userSub = this.authenticationService.$users.subscribe(users => {
      this.people = users;
      this.people.forEach((user) => {
        if (user.email.toLowerCase() == localStorage.getItem('currentemail').toLowerCase()){
          this.currentusername = user.username;
        }
      });
    });

    //for photo
    this.reportForm = this.builder.group({screenshot: new FormControl(),})

    //form validation
    this.reportForm = this.builder.group({
      error: new FormControl('', Validators.compose([
        Validators.required
      ])),
      screenshot: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })

  }

  //submit form
  submitReport(report){
    this.reportService.sendReport(
      this.reportId,
      this.currentusername,
      report.error,
      this.screenshotUrl,
      report.description
    ).then((response) => {
        this.router.navigateByUrl('index/settings/customer-support');
    }, error => {
      // check error
      console.log(error);
    })
    console.log("this is report id ",this.reportId);
  }


  //to save screenshot
  uploadSS(value){
    // get file name
    var file = value.target.files[0]; // get file 
    var filename = value.target.files[0].name; // get filename
    var filetype = value.target.files[0].type; // get filetype
  
    console.log(filename); // check filename
    console.log(filetype); // check filetype
      
    // database variable setup
    var uploadroute = 'error-ss/' + filename; //changed 'item-gallery' to 'error-ss'
    var ssUrl = "https://firebasestorage.googleapis.com/v0/b/declutter-1172d.appspot.com/o/error-ss%2F"+ filename + "?alt=media";
      
    // file type
    const metadata = {
      contentType: filetype,
    };
      
    // storage reference
    const storageRef = ref(storage, uploadroute);
  
    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
      
    // setting url to be pushed for mod page
    if(value) {
      this.screenshotUrl = ssUrl;
    }
  }

  ionViewWillEnter(){
    this.authenticationService.fetchUser().subscribe();    
  }

}

