import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, remove, set, update } from "firebase/database";

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private currentid;

  constructor() { }

  async postReviews(comment, vendorid, imgurl, star){
    const currentid = localStorage.getItem('currentid');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var finaldate = mm + '/' + dd + '/' + yyyy;


    return set(ref(database, 'reviews/' + vendorid + "/" + currentid), {
      username: localStorage.getItem('currentname'),
      comment: comment,
      imgurl: imgurl,
      star: star,
      date: finaldate
    });
  }

  async retrieveReviews(vendorid){
    this.currentid = localStorage.getItem('currentid');
    console.log("this.currentid", this.currentid);
    // choose which database bucket to be reference at
    var reviewcont = [];
    const dbref = ref(database, 'reviews/' + vendorid);
    // get values
    const snapshot = await get((dbref));
    var reviews = snapshot.val();
    
    console.log(reviews);
    Object.keys(reviews).forEach((key) => {
      console.log(key);
      console.log(reviews[key]);
      reviewcont.push({
          "username": reviews[key].username,
          "comment": reviews[key].comment, 
          "imgurl": reviews[key].imgurl,
          "star": reviews[key].star,
          "date": reviews[key].date,
        });
    });
    return reviewcont
  }
  
}
