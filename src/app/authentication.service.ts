import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private http: HttpClient) { }
}
