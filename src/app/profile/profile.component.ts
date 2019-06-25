import { Component, OnInit } from '@angular/core';
import { ThemeChangerService } from '../services/theme-changer.service';
import { LoginService } from '../services/login.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  appTheme: any;
  
  constructor(private ThemeChangerService: ThemeChangerService, private loginService: LoginService) { }

  ngOnInit() {
    this.ThemeChangerService.themeinfo.subscribe((data) => {
      this.appTheme = data;
    })
  }
}
