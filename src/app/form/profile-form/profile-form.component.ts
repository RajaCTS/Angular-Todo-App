import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  profileForm:FormGroup;
  userID:any =  window.sessionStorage.getItem('userID');

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        contactNumber: new FormControl(''),
        emailID: new FormControl(''),        
        dateOfBirth: new FormControl('')
      })

      this.loginService.getUserDetails(this.userID).subscribe((data)=>{
        this.profileForm = new FormGroup({
          firstName: new FormControl(data['userName']),
          emailID: new FormControl(data['emailID'])
        })
      })
  }

  updateProfile() {
    this.loginService.updateUserDetails(this.userID, this.profileForm.value).subscribe((data) => {
      console.log(data)
    })
  }


}
