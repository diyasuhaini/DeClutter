import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { User } from './index/auth/auth.model';
import { take, map, tap, switchMap} from 'rxjs/operators';

//interface here
interface accountData{
  username: string;
  contact: string;
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
    return this.angularFireAuth.currentUser
  }


  //add data to realtime database (firebase)

  //step 1 - variable
  private users = new BehaviorSubject<User[]>([]);

  //get data
  get $users(){
    return this.users.asObservable();
  }

  //match data
  getUser(id: string){
    return this.$users.pipe(take(1), map(users => {
      return {...users.find(p => p.id === id)}
    }))
  }

  //get users from firebase
  fetchUser(){
    return this.http.get<{[key: string]: accountData}>('https://declutter-1172d-default-rtdb.asia-southeast1.firebasedatabase.app/user.json').pipe(map(resData => {
      //create array
      const users = [];
      //iteration
      for(const key in resData){
        //condition
        if(resData.hasOwnProperty(key)){
          users.push(new User(key,
            resData[key].username,
            resData[key].email,
            resData[key].contact
            ));
        }
      }
      return users;
    }), tap(users => {
      this.users.next(users);
    }))
  } //end of fetch

  //add comment
  addUser(
    username: string,
    email: string,
    contact: string){
    
    //generate id
    let generateId: string;
    const newUser = new User(
      Math.random().toString(),
      username,
      email,
      contact
    );
    return this.http.post<{name: string}>('https://declutter-1172d-default-rtdb.asia-southeast1.firebasedatabase.app/user.json', {...newUser, id: null}).pipe(switchMap(resData => {
      generateId = resData.name;
      return this.users;
    }), take(1), tap(user => {
      newUser.id = generateId;
      this.users.next(user.concat(newUser))
    }))
  }

  //update/edit profile data
  updateUser(id: string,
    username: string,
    ){
      let updateUser: User[];
      return this.$users.pipe(take(1), switchMap(users => {
        const updateUserIndex = users.findIndex(p1 => p1.id === id);
        updateUser = [...users];
        const oldUser = updateUser[updateUserIndex];
        updateUser[updateUserIndex] = new User(
          oldUser.id, //reuse old data
          username, //new data
          oldUser.email, //old data
          oldUser.contact //old data
        ); 
          return this.http.put(`https://declutter-1172d-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`, {...updateUser[updateUserIndex], id: null});
      }), tap(resData => {
        this.users.next(updateUser);
      }))
    }
}
