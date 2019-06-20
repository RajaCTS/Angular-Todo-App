import { Component, OnInit } from '@angular/core';
import { ThemeChangerService } from '../services/theme-changer.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  appTheme: string;
  signupForm: FormGroup;
  constructor(private themeChangeService: ThemeChangerService,
    private form: FormBuilder,
    private loginService: LoginService,
    private route: Router) { }

  genders = ['Male', 'Female'];
  ngOnInit() {
    this.themeChangeService.theme.subscribe((data) => {
      this.appTheme = data;
    })
    this.signupForm = new FormGroup({
      'userName': new FormControl('', [Validators.required, this.validateName.bind(this)]),
      'emailID': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'rePassword': new FormControl('', [Validators.required, this.validatePassword.bind(this)]),
      'gender': new FormControl('Male')
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

  onSignUp() {
    this.loginService.signup(this.signupForm.value, '/dailyTask');
  }

}
