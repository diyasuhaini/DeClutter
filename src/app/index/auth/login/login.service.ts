import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //add validity
  authenticatedUser = true;
  private userId = 'Squall';

  constructor() { }

  authenticated(){
    //when user correct, can login now
    this.authenticatedUser = true;
    console.log(this.authenticatedUser)
  }

  exitAuth(){
    //when user logout
    this.authenticatedUser = false;
  }

  get $authenticatedUser(){
    return this.authenticatedUser;
  }

  get $userId(){
    return this.userId;
  }
}
