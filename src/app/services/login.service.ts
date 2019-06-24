import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';

@Injectable()

export class LoginService {

  baseURI = "http://localhost:3000";
  logged = new BehaviorSubject('Login');
  looginInfo = this.logged.asObservable();
  login = new BehaviorSubject({});
  

  constructor(private http: HttpClient, private route: Router) {
    this.isUserLoggedIn();
  }

  loggin(data, navigateURL) {
    if (data) {
      this.http.post(this.baseURI + '/login', data).subscribe((result) => {
        for (var x in result) {
          window.sessionStorage.setItem(x, result[x]);
        }
        this.isUserLoggedIn();
        this.route.navigate([navigateURL]);
        this.login.next(result);
      }, (err) => {
        this.login.next(err);
      })
    }
  }

  signup(data, navigateURL) {
    if (data) {
      this.http.post(this.baseURI + '/newUser', data).subscribe((result) => {
        for (var x in result) {
          window.sessionStorage.setItem(x, result[x]);
        }
        this.isUserLoggedIn();
        this.route.navigate([navigateURL]);
        this.login.next(result);
      }, (err) => {
        this.login.next(err);
      })

    }
  }

  getUserDetails(data){
    if(data){
      return this.http.get(this.baseURI + '/userDetails',{params:{'userID':data}})
    }
  }

  loggOut() {
    window.sessionStorage.clear();
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    var session = window.sessionStorage.getItem('userName');
    var loginStatus: string;
    this.looginInfo.subscribe((data) => {
      if (!session) {
        loginStatus = 'Login'
      } else {
        loginStatus = 'Logout'
      }
    })
    this.logged.next(loginStatus);
  }

}
