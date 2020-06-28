import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/services/models/User';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';

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
  }, { validator: this.checkPasswords })

  emailHighlighter: string = "highlight-gray";
  passHighlighter: string = "highlight-gray";
  repeatPassHighlighter: string = "highlight-gray";

  constructor(private formBuilder: FormBuilder, private router: Router,
    private accountService: AccountService,
    private alertController: AlertController,
    private api: APIService,
    private stateService: StateService) { }

  ngOnInit() {
  }

  async presentAlert(error: string, header?: string, subheader?: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: (header === '') ? null : 'Chyba...',
      subHeader: subheader,
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  createUser() {
    if (!this.regForm.valid) {
      this.presentAlert('...nesprávne vyplnené údaje.')
      return;
    }

    let email: string = this.email.value;
    let password: string = this.password.value;


    // this.router.navigateByUrl('dashboard/demography'); 

    this.stateService.startLoading().then(
      () => {
        this.api.registrateUser(email, password).subscribe(
          () => {
            this.stateService.stopLoading().then(
              () => {
                this.presentAlert(email, '', "Potvrdzovací email bol zaslaný na adresu")
                // this.accountService.registratingUser = new User("", email, password);
                // this.router.navigateByUrl('registration/demography');
              }
            )
          },
          (error) => {
            this.stateService.stopLoading().then(
              () => {
                if (error.error['description'] === 'User with email already exists') {
                  this.presentAlert("...zadaná emailová adresa už bola zaregistrovaná.")
                }
                console.log(error);                
              }
            )
          }
        );
      }
    )

  }

  checkPasswords(control: FormGroup) {
    return control.get('password').value === control.get('reppassword').value ? null : { 'confirmation': true }
  }

  get email() { return this.regForm.get('email'); }
  get password() { return this.regForm.get('password'); }
  get repPass() { return this.regForm.get('reppassword'); }
}
