import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models/User';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  regForm = this.formBuilder.group({
    email: [
      '', 
      [ 
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]
    ], 
    password: [
      '', 
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9].{7,}')
      ]
    ],
    reppassword: [
      '',
    ],
    // termsOfUse: [false, Validators.requiredTrue],
  }, {validator: this.checkPasswords})

  emailHighlighter: string = "highlight-gray";
  passHighlighter: string = "highlight-gray";
  repeatPassHighlighter: string = "highlight-gray";

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private alertController: AlertController) { }

  ngOnInit() {
  }

  createUser() {
    if (!this.regForm.valid) {
      return;
    }

    let email: string = this.email.value;
    let password: string = this.password.value;
    
    this.accountService.registratingUser = new User("", email, password);
    
    console.log(JSON.stringify(this.accountService.registratingUser));

    // this.router.navigateByUrl('dashboard/demography'); 
  }

  checkPasswords(control: FormGroup) {
    return control.get('password').value === control.get('reppassword').value ? null : {'confirmation' : true}    
  }

  get email() { return this.regForm.get('email'); }
  get password() { return this.regForm.get('password'); }
  get repPass() { return this.regForm.get('reppassword'); }
}
