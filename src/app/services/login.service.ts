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
      }, (err) => {
        this.login.next(err);
      })
    }
  }

  signup(data, navigateURL) {
    if (data) {
      this.http.post(this.baseURI + '/newUser', data).subscribe((result) => {
        for (var x in result['data']) {
          window.sessionStorage.setItem(x, result['data'][x]);
        }
        this.isUserLoggedIn();
        this.route.navigate([navigateURL]);
      }, (err) => {
        console.log(err);
      })

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
