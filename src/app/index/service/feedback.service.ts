import { Injectable } from '@angular/core';

// initializeApp(environment.firebaseConfig);
// const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // private userSub: Subscription;
  // private people: User[];
  // private currentusername: string;

  constructor() { }
// private authenticationService: AuthenticationService
  // async sendFeedback(
  //   //datatype
  //   reportId: string,
  //   username: string,
  //   description: string
  // ) {
  //   console.log(reportId);

  //   //get the referrence from created database
  //   var currentid = localStorage.getItem('currentid'); //only you can see
  //   const dbrefReport = ref(database, 'report/' + currentid); //get the referrence
  //   const getLength = await get((dbrefReport)); //refer back from user
  //   var rptId; //for initial
  //   var reportCont = [];
  //   if(getLength.val() == null){ //if no value
  //     rptId = 1001; //add value (start with 1001)
  //   }else{ //if value existed
  //     Object.keys(getLength.val()).forEach(index => reportCont.push(getLength.val()[index])); // for each by getting its index then pushing
  //     rptId = reportCont.length + 1001; // container length plus 1001 aka the starting point
  //   }
  //   const dbref2 = ref(database, 'report/' + currentid + '/' + currentid + '&' + rptId); //get the referrence (new)

  //   //create database in firebase
  //   return set(dbref2, {
  //     username: username,
  //     error: error,
  //     screenshot: screenshot,
  //     description: description
  //   })
  // }


}
