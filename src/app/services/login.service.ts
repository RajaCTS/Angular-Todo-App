import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
      this.http.post(this.baseURI + '/login', data,{observe:'response'}).subscribe((result) => {
        for (var x in result['body']) {
          window.sessionStorage.setItem(x, result['body'][x]);
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
      return this.http.get(this.baseURI + '/userDetails',{headers: new HttpHeaders().append('Authorization',window.sessionStorage.getItem('Authorization')),params:{'userID':data}})
    }
  }

  updateUserDetails(param,data){
    if(data){
      return this.http.put(this.baseURI + '/userDetails',data,{params:{userID:param}})
    }
  }

  loggOut() {
    window.sessionStorage.clear();
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    var session = window.sessionStorage.getItem('x_auth');
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
