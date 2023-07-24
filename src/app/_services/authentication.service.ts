import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private route: Router) {}

  login(username: string, password: string):boolean  {
    if (username == "admin" && password == "admin") {
      localStorage.setItem('currentUser', "loggedin");
      this.route.navigate(["home"]);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('currentUser') !== null);
  }
}
