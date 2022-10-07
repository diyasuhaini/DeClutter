import { Injectable } from '@angular/core';
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/auth.model'

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private userSub: Subscription;
  private people: User[];
  private currentusername: string;

  constructor(private authenticationService: AuthenticationService) { }

  //details for report
  async sendReport(
    //datatype
    reportId: string,
    username: string,
    error: string,
    screenshot: string,
    description: string
  ) {
    console.log(reportId);

    //get the referrence from created database
    var currentid = localStorage.getItem('currentid'); //only you can see
    const dbrefReport = ref(database, 'report/' + currentid); //get the referrence
    const getLength = await get((dbrefReport)); //refer back from user
    var rptId; //for initial
    var reportCont = [];
    if(getLength.val() == null){ //if no value
      rptId = 1001; //add value (start with 1001)
    }else{ //if value existed
      Object.keys(getLength.val()).forEach(index => reportCont.push(getLength.val()[index])); // for each by getting its index then pushing
      rptId = reportCont.length + 1001; // container length plus 1001 aka the starting point
    }
    const dbref2 = ref(database, 'report/' + currentid + '/' + currentid + '&' + rptId); //get the referrence (new)

    //create database in firebase
    return set(dbref2, {
      username: username,
      error: error,
      screenshot: screenshot,
      description: description
    })

  }

  //to show report in moderator
  async getReport() {
    var currentid = localStorage.getItem('currentid'); //only you can see
    const dbrefReport = ref(database, 'report/' + currentid); //get the referrence from report table
    const snapshot = await get((dbrefReport)); //refer back from user
    var report = snapshot.val(); //get the value
    var box = []; //assume there is no data
    if (report != null){ //if there is an report
      Object.keys(report).forEach((newReport) => { //match the report
        box.push(newReport); //convert 2d array into normal array
      })
      const dbref2 = ref(database, 'report/' + currentid); //refer back from item
      const snapshot2 = await get((dbref2)); //refer from user
      var reportDetails = snapshot2.val(); //get the value
  
      var newBox = []; //new box appear
      Object.keys(reportDetails).forEach((key) => { //insert into 2d array (converted array)
        box.forEach((newReport) => { //match the report
          if (key == newReport) { //if the report is matched
            newBox.push(reportDetails[key]); //insert current index of converted array data into new container (newBox)
          }
        })
      })
    }
    //its confirmed
    return newBox;
  }



}
