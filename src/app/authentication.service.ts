import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

//interface here
interface accountData{
  username: string;
  potrait: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //add private http and auth
  constructor(private http: HttpClient,
              private angularFireAuth: AngularFireAuth) { }


  //create a new user
  createUser(value){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  //sign in user
  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }

  //sign out user
  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  //get user details
  userDetails() {
    return this.angularFireAuth.user
  }

  //add data to realtime database (firebase)

  //step 1 - variable
  // private users = new BehaviorSubject<User[]>([]);
}
