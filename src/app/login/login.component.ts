import { Component, OnInit } from '@angular/core';
import { ThemeChangerService } from '../services/theme-changer.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  appTheme;
  loginConnect;
  errMsg;
  constructor(private themeChangerService: ThemeChangerService, private loggin: LoginService, private route: Router) { }

  ngOnInit() {
    this.themeChangerService.themeinfo.subscribe((data) => {
      this.appTheme = data;
    })
  }

  resetError(formData) {
    this.loginConnect = false;
    formData.form.controls['emailID'].setErrors(null);
    formData.form.controls['password'].setErrors(null);
  }

  login(formData) {
    this.loggin.loggin(formData.value, '/dailyTask');
    this.loggin.login.subscribe((data) => {
      if (data.hasOwnProperty('error')) {
        this.loginConnect = true;
        this.errMsg = data['error']['errmsg']
        formData.form.controls['emailID'].setErrors({ 'incorrect': true });
        formData.form.controls['password'].setErrors({ 'incorrect': true });
      }
    })
  }

}
