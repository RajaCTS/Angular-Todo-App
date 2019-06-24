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
  signupForm: FormGroup;
  appTheme

  constructor(private ThemeChangerService: ThemeChangerService, private loginService: LoginService) { }

  ngOnInit() {
    this.ThemeChangerService.themeinfo.subscribe((data) => {
      this.appTheme = data;
    })
    var userID = window.sessionStorage.getItem('userID');
    this.loginService.getUserDetails(userID).subscribe((data) => {
      console.log(data);
      this.signupForm = new FormGroup({
        'userName': new FormControl('', [Validators.required, this.validateName.bind(this)]),
        'emailID': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required),
        'rePassword': new FormControl('', [Validators.required, this.validatePassword.bind(this)]),
        'gender': new FormControl('Male')
      })
    })
  }

  validateName(control: FormControl): { [s: string]: boolean } {
    var regex = /[^a-zA-Z]/g
    if (control.value && regex.test(control.value)) {
      return { 'nameValidator': true }
    }

  }

  validatePassword(control: FormControl): { [s: string]: boolean } {
    if (this.signupForm && (control.value != this.signupForm.value.password)) {
      return { 'pwdDintMatch': true };
    }
  }


}
