import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  //add constructor
  constructor(private loginService: LoginService,
              private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.loginService.$authenticatedUser){ //if incorrect then cannot load to next page
        this.router.navigateByUrl('../auth');
      };
    return this.loginService.$authenticatedUser; //if correct then can load to next page
  }
}
