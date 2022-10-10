import { Injectable } from '@angular/core';
import { get, getDatabase, ref, remove, set, update } from "firebase/database";
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { Console } from 'console';

// initialize the application allow new database apit to be used
initializeApp(environment.firebaseConfig);
// connection to realtime
const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  async sendmessage(text, nduser){
    const currentid = localStorage.getItem('currentid');
    const comb1 = currentid + nduser;
    const comb2 = nduser + currentid;
    var finaldist = comb1;
    const dbref = ref(database, 'message/');
    const snapshot = await get((dbref));
    const check = snapshot.val();
    var checker = [];
    console.log(check);
    if(!check){
      return set(ref(database, 'message/' + finaldist), [{text: text, user: currentid}]);
    } else {
      Object.keys(check).forEach(key => {
        if (key == comb2){
          finaldist = comb2;
        }
      });
      console.log("finaldist", finaldist);
      const dbref2 = ref(database, 'message/' + finaldist);
      const snapshot = await get((dbref2));
      const check2 = snapshot.val();
      Object.keys(check2).forEach(key => {
        checker.push(check2[key]);
      })
      checker.push({text: text, user: currentid});
      console.log("checker", checker);
      console.log("finaldist", finaldist);
      return set(ref(database, 'message/' + finaldist), checker);
    }
  }

  async retrieveMessage(nduser){
    var currentid = localStorage.getItem('currentid');
    const comb1 = currentid + nduser;
    const comb2 = nduser + currentid;
    var finaldist = comb1;
    const dbref = ref(database, 'message/');
    const snapshot = await get((dbref));
    const check = snapshot.val();
    console.log(check);
    if(!check){
      console.log("uwee1");
      return [];
    } else {
      Object.keys(check).forEach(key => {
        if (key == comb2){
          finaldist = comb2;
        }
      });
      
      const dbref = ref(database, 'message/' + finaldist);
      // get values
      const snapshot = await get((dbref));
      var item = snapshot.val();
      
    }
    
    return item;
  }

}
