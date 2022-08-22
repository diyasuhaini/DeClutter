import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  //add validity
  authenticatedUser = true;
  private userId = 'jumong';

  constructor() { }

  authenticated(){
    //when user correct, can login now
    this.authenticatedUser = true;
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
