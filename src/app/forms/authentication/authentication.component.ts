import { Component, OnInit } from '@angular/core';

import {FormControl, Validators} from '@angular/forms';
import { AuthenticationService } from 'app/services/authentication/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = ""
  nipOrganisation = ""
  
  

  hide = true

  constructor(private autSer: AuthenticationService) { }

  ngOnInit() {}


  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onLogin() {
    console.log("Start login")
    this.autSer.emailSignInWithEmail(this.email.value, this.password)
  }

  onCreateUser() {
    console.log("Start sing up ")
    this.autSer.emailSignUpWith(this.email.value, this.password, this.nipOrganisation)
  }

}
