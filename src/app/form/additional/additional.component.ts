import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.css']
})
export class AdditionalComponent implements OnInit {

  additionalForm:FormGroup;
  userID:any =  window.sessionStorage.getItem('userID');

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.additionalForm = new FormGroup({
        addressLine1: new FormControl(''),
        addressLine2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),        
        pincode: new FormControl('')
      })
  }

  updateProfile() {
    this.loginService.updateUserDetails(this.userID, this.additionalForm.value).subscribe((data) => {
      console.log(data)
    })
  }

}
