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
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
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
    termsOfUse: [false, Validators.requiredTrue],
  }, {validator: this.checkPasswords})

  emailHighlighter: string = "highlight-gray";
  passHighlighter: string = "highlight-gray";
  repeatPassHighlighter: string = "highlight-gray";

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(errorMessage: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Chyba ...',
      message: "..." + errorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }

  createUser() {
    if (!this.regForm.valid) {
      if (!this.regForm.get('email').valid) 
        this.presentAlert("Email nespĺňa požadovaný formát.")        
      else if (!this.regForm.get('password').valid) 
        this.presentAlert("Heslo musí byť dlhé aspoň 8 znakov a musí obsahovať aspoň 1 malé a veľké písmeno a číslo.")
      else if (!this.regForm.get('termsOfUse').valid)
        this.presentAlert("Je potrebné vyjadriť Váš súhlas s podmienkami používania.")
      else 
        this.presentAlert("Zadané heslá sa nezhodujú.")
      return;
    }

    let email: string = this.regForm.get('email').value;
    let password: string = this.regForm.get('password').value;
    
    this.accountService.registratingUser = new User("", email, password);
    
    console.log(JSON.stringify(this.accountService.registratingUser));

    this.router.navigateByUrl('registration/demography'); 
  }

  setHighlight(event: string): string {
    if (event == "focus") 
      return "highlight-red";
    else if (event == "blur") 
          return "highlight-dark";
    else {
      return "";
    }
  }

  checkPasswords(control: FormGroup) {
    return control.get('password').value === control.get('reppassword').value ? null : {'confirmation' : true}    
  }
}
