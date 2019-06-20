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

  constructor(private themeChangerService: ThemeChangerService, private loggin: LoginService, private route:Router) { }

  ngOnInit() {
    this.themeChangerService.themeinfo.subscribe((data) =>{
      this.appTheme = data;
    })
  }

  login(formData){
      this.loggin.loggin(formData.value,'/dailyTask');
  }

}
