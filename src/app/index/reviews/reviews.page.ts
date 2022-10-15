import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReviewsService } from '../service/reviews.service';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDatabase, ref as dref, onValue, get } from 'firebase/database';

// get storage from firebase bucket g://
const storage = getStorage(); 
// connection to realtime
const database = getDatabase();

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.page.html',
  styleUrls: ['./reviews.page.scss'],
})
export class ReviewsPage implements OnInit {

  private vendorid;
  private vendorname;
  private cmtform: FormGroup; 
  private starcatcher;
  private imgurl;
  private imgurl22;
  private reviews;
  private calstar;

  constructor(private router: Router, private builder: FormBuilder, private review: ReviewsService) { }

  ngOnInit() {
    var review2 =[];
    const routerState = this.router.getCurrentNavigation().extras.state;
    this.vendorid = routerState[0].vendor;
    this.vendorname = routerState[0].username;
    
    // init form control  
     this.cmtform = this.builder.group({
      comment: new FormControl('', Validators.compose([
        Validators.required
      ])),
      img: new FormControl('', Validators.compose([
        Validators.required
      ])),
     });

     onValue(dref(database, "reviews/"), (snapshot) => {
      this.review.retrieveReviews(this.vendorid).then((reviews) => {
        console.log("reviews", reviews);
        var calstar = 0; // total star
      var startaker = 0; // get length of review

      reviews.forEach(async (review) => {
        review2.push({ 
          comment: review.comment,
          date: review.date,
          imgurl: review.imgurl,
          star: review.star,
          userid: review.userid,
          username: review.username,
          pfpimg: ((await get((dref(database, 'userpfp/' + review.userid)))).val()).imgurl
         });
        calstar += review.star;
        startaker++;
      });
      console.log("review2", review2);
      this.reviews = review2;
      this.calstar = calstar / startaker;
      });
     });
  }

  postcmt(value,){
    // console.log("values" , value);
    // console.log("comment" , value.comment);
    this.review.postReviews(value.comment, this.vendorid, this.imgurl, this.starcatcher).then(result => {console.log("result")});
  }
  
  async pfpimage(userid){
    console.log("userid" , userid);
    var imgurl = (await get((dref(database, 'userpfp/' + userid)))).val();
    return imgurl;
  }

  star(value){
    this.starcatcher = value;
  }

  uploadImg(value){

    // get file name
    var file = value.target.files[0]; // get file 
    var filename = value.target.files[0].name; // get filename
    var filetype = value.target.files[0].type; // get filetype

    console.log("filename", filename); // check filename
    console.log("filetype", filetype); // check filetype
    // database variable setup
    var uploadroute = 'reviews/' + filename;
    var imgurl = "https://firebasestorage.googleapis.com/v0/b/declutter-1172d.appspot.com/o/reviews%2F"+ filename + "?alt=media";
    
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
    
    this.imgurl = imgurl; 
  }

  ionViewWillEnter() {
    // getting pfp Start
    onValue(dref(database, 'userpfp/'), async (snapshot)=>{
      const currentid = localStorage.getItem('currentid');
      var imgurl = (await get((dref(database, 'userpfp/' + currentid)))).val();
      console.log(imgurl);
      if (imgurl){
        this.imgurl22 = imgurl;
      }
    });
    // getting pfp End

    var review2 = [];
    this.starcatcher = 0;
    this.review.retrieveReviews(this.vendorid).then((reviews) => {
      console.log("reviews", reviews);
      var calstar = 0; // total star
      var startaker = 0; // get length of review
      if(reviews){
        reviews.forEach(async (review) => {
          calstar += review.star;
          startaker++;
          review2.push({ 
            comment: review.comment,
            date: review.date,
            imgurl: review.imgurl,
            star: review.star,
            userid: review.userid,
            username: review.username,
            pfpimg: ((await get((dref(database, 'userpfp/' + review.userid)))).val()).imgurl
           });
        });
        this.calstar = calstar / startaker;
      }

    });
  }

}
