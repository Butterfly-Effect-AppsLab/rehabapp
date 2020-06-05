import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models/User';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regForm = this.formBuilder.group({
    username: [''],
    email: [
      '', 
      [ 
        Validators.required,
        Validators.email
      ]
    ], 
    password: [
      '', Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9].{7,}')
    ],
    termsOfUse: [false, Validators.requiredTrue],
  })

  private buttonEnabled: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private APIservice: APIService, private stateService: StateService) { }

  ngOnInit() {
  }

  createUser() {
    let username: string = this.regForm.get('username').value;
    let email: string = this.regForm.get('email').value;
    let password: string = this.regForm.get('password').value;

    if (username == "")
      username = email.split("@")[0];
    
    this.stateService.registratingUser = new User(username, email, password);
    
    console.log(JSON.stringify(this.stateService.registratingUser));

    this.router.navigateByUrl('registration/demography'); 
  }

}
