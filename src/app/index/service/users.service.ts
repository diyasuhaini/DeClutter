import { Injectable } from '@angular/core';
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';


// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  
  //below for retrieve user database
  async retrieveAccount(){
    var currentid = localStorage.getItem('currentid'); //only you can see
    const accountref = ref(database, "user/" + currentid); //refer from database for user
    const snapshot = await get((accountref)); //refer accountref
    const accountDetails = snapshot.val(); //get the value for account
    console.log(accountDetails);

    var accounts = []; //new box appear
    accounts.push(accountDetails);

    return accounts; //completed
  }


  //below is for updating user account
  async updateAccount(value){
    //below is for retrieving current data
    var currentid = localStorage.getItem('currentid'); //only you can see
    const accountref = ref(database, "user/" + currentid); //refer from database for user
    const snapshot = await get((accountref)); //refer accountref
    const accountDetails = snapshot.val(); //get the value for account
    console.log("test", accountDetails);

    //below is for pushing new to current data
    var accountBox = []; //created an empty array
    accountBox.push({
      username: value.username,
      fullname: value.fullname,
      email: value.email,
      contact: value.contact,
      address1: value.address1,
      address2: value.address2
    })

    console.log("accountBox", accountBox[0]);

    //completed
    return set(ref(database, 'user/' + currentid), accountBox[0]);
  }

  async retrievepfp(userids){
    const snapshot = (await get((ref(database, 'userpfp/' + userids)))).val();
    return snapshot.imgurl
  }

}


