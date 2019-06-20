import { Component, OnInit, DoCheck } from '@angular/core';
import { ThemeChangerService } from '../services/theme-changer.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent implements OnInit, DoCheck {

  logginStatus:string = "Login";
  constructor(private ChangeThemeService: ThemeChangerService,private loginService: LoginService, private route: Router) { }
  
  appTheme;
  ngOnInit() {
    this.ChangeThemeService.themeinfo.subscribe((data)=>{
      this.appTheme = data;
    })
  }

  logBasedOnStatus(){
    if(this.logginStatus == 'Login'){
      this.route.navigate(['/userLogin']);
    }else{
      this.loginService.loggOut();
      this.route.navigate(['/'])
    }
  }

  changeTheme = () =>{
    this.ChangeThemeService.themeChage();
  }

  ngDoCheck(){
    this.loginService.logged.subscribe((data)=>{
      this.logginStatus = data;
    })
  }

}
