import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { get, getDatabase, ref, set } from "firebase/database";
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { environment } from 'src/environments/environment';
import { User } from '../auth/auth.model';

  // initialize the application allow new database apit to be used
  initializeApp(environment.firebaseConfig);
  // connection to realtime
  const database = getDatabase();

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private people: User[];
  private currentusername: string;
  private cuid: string;
  private userSub: Subscription;
  private currentid: string;

  constructor( private authenticationService: AuthenticationService,) { }
  

  followUser(
    // Data type needed
    following, // user that is following
    followed,  // user that is being followed
    //
  ) {
    // set is firebase funciton for posting item
    return set(ref(database, 'useractions/' + following + "/following/"+ followed), {
      user :followed 
    })
  }

  followedUser(
    // Data type needed
    following, // user that is following
    followed,  // user that is being followed
    //
  ) {
    // set is firebase funciton for posting item
    return set(ref(database, 'useractions/' + followed + "/followed/" + following), {
      user: following 
    })
  }

  async checkUserFollowers(
    followed
  ){
    // choose which database bucket to be reference at
    var counter = 0;
    const dbref = ref(database, 'useractions/' + followed + "/followed");
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    console.log(Object.keys(item).length);
    return item
  }

  async checkFollowers(
  ){
    // choose which database bucket to be reference at
    var counter = 0;
    const dbref = ref(database, 'useractions/' + localStorage.getItem('currentid') + "/followed");
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    return item
  }
  
  async checkUserFollowing(
    following
  ){
    // choose which database bucket to be reference at
    var counter = 0;
    const dbref = ref(database, 'useractions/' + following + "/following");
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    console.log(Object.keys(item).length);
    return item
  }

  async checkFollowing(
  ){
    // choose which database bucket to be reference at
    var counter = 0;
    const dbref = ref(database, 'useractions/' + localStorage.getItem('currentid') + "/following");
    // get values
    const snapshot = await get((dbref));
    var item = snapshot.val();
    return item
  }

}
