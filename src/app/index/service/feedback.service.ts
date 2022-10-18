import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/authentication.service';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // private userSub: Subscription;
  // private people: User[];
  // private currentusername: string;

  constructor(private authenticationService: AuthenticationService) { }

  async sendFeedback(
    //datatype
    feedbackId: string,
    username: string,
    description: string
  ) {
    console.log(feedbackId);

    //get the referrence from created database
    var currentid = localStorage.getItem('currentid'); //only you can see
    const dbrefFeedback = ref(database, 'feedback/' + currentid); //get the referrence
    const getLength = await get((dbrefFeedback)); //refer back from user
    var feedId; //for initial
    var feedbackCont = [];
    if(getLength.val() == null){ //if no value
      feedId = 100001; //add value (start with 100001)
    }else{ //if value existed
      Object.keys(getLength.val()).forEach(index => feedbackCont.push(getLength.val()[index])); // for each by getting its index then pushing
      feedId = feedbackCont.length + 100001; // container length plus 100001 aka the starting point
    }
    const dbref2 = ref(database, 'feedback/' + currentid + '/' + currentid + '&' + feedId); //get the referrence (new)

    //create database in firebase
    return set(dbref2, {
      username: username,
      description: description
    })
  }

  //to show feedback in moderator
  async getFeedback() {
    const dbrefFeedback = ref(database, 'feedback/'); //get the referrence from feedback table
    const snapshot = await get((dbrefFeedback)); //refer back from user
    var feedback = snapshot.val(); //get the value
    console.log("feedback", feedback);
    var userbox = []; //assume there is no data
    var box = [];
    if (feedback != null){ //if there is an feedback
      Object.keys(feedback).forEach((newFeedback) => { //match the feedback
        userbox.push(feedback[newFeedback]); //convert 2d array into normal array
      })
      console.log("userbox",userbox);
      Object.keys(userbox[0]).forEach((newFeedback) => { //match the feedback
        box.push(newFeedback); //convert 2d array into normal array
      })
      console.log("box", box);
      const dbref2 = ref(database, 'feedback/'); //refer back from item
      const snapshot2 = await get((dbref2)); //refer from user
      var feedbackDetails = snapshot2.val(); //get the value
  
      var newBox = []; //new box appear
      console.log("feedbackDetails", feedbackDetails);
      Object.keys(feedbackDetails).forEach((key) => { //insert into 2d array (converted array)
        Object.keys(feedbackDetails[key]).forEach((key2) => {
          box.forEach((newFeedback) => { //match the feedback
            if (key2 == newFeedback) { //if the feedback is matched
              newBox.push(feedbackDetails[key][newFeedback]); //insert current index of converted array data into new container (newBox)
            }
          })
        })  
      })
    }
    return newBox;
  }


}
