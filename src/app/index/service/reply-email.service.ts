import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';


// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ReplyEmailService {

  constructor() { }

  //details for reply
  async sendReply(
    //datatype
    replyId: string,
    username: string,
    error: string,
    description: string
  ) {
    console.log(replyId);

    //get the referrence from created database
    var currentid = localStorage.getItem('currentid'); //only you can see
    const dbrefReply = ref(database, 'reply/' + currentid); //get the referrence
    const getLength = await get((dbrefReply)); //refer back from user
    var rplyId; //for initial
    var replyCont = [];
    if(getLength.val() == null){ //if no value
    rplyId = 10001; //add value (start with 10001)
    }else{ //if value existed
      Object.keys(getLength.val()).forEach(index => replyCont.push(getLength.val()[index])); // for each by getting its index then pushing
      rplyId = replyCont.length + 10001; // container length plus 10001 aka the starting point
    }
    const dbref2 = ref(database, 'reply/' + currentid + '/' + currentid + '&' + rplyId); //get the referrence (new)
  
    //create database in firebase
    return set(dbref2, {
      username: username,
      error: error,
      description: description
    })
  }

  //to show reply in customer's inbox
  async getReply() {
    const dbrefReply = ref(database, 'reply/'); //get the referrence from reply table
    const snapshot = await get((dbrefReply)); //refer back from user
    var reply = snapshot.val(); //get the value
    console.log("reply", reply);
    var userbox = []; //assume there is no data
    var box = [];
    if (reply != null){ //if there is an reply
      Object.keys(reply).forEach((newReply) => { //match the reply
        userbox.push(reply[newReply]); //convert 2d array into normal array
      })
      console.log("userbox",userbox);
      Object.keys(userbox[0]).forEach((newReply) => { //match the reply
        box.push(newReply); //convert 2d array into normal array
      })
      console.log("box", box);
      const dbref2 = ref(database, 'reply/'); //refer back from item
      const snapshot2 = await get((dbref2)); //refer from user
      var replyDetails = snapshot2.val(); //get the value
  
      var newBox = []; //new box appear
      console.log("replyDetails", replyDetails);
      Object.keys(replyDetails).forEach((key) => { //insert into 2d array (converted array)
        Object.keys(replyDetails[key]).forEach((key2) => {
          box.forEach((newReply) => { //match the reply
            if (key2 == newReply) { //if the reply is matched
              newBox.push(replyDetails[key][newReply]); //insert current index of converted array data into new container (newBox)
            }
          })
        })  
      })
    }
    return newBox;
  }

}
