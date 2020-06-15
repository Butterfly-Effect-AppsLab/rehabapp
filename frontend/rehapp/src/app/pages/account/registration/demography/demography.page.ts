import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state-service.service';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account-service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-demography',
  templateUrl: './demography.page.html',
  styleUrls: ['./demography.page.scss'],
})
export class DemographyPage implements OnInit {

  private months: Array<string> = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"]
  private name: string = ""
  private gender: string = ""
  private birth: Date;
  private nameHighlighter: string = "highlight-gray";


  constructor(private APIservice: APIService, private router: Router, private accountService: AccountService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(error: object) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: JSON.stringify(error),
      buttons: ['OK']
    });

    await alert.present();
  }

  valueSelected(event: CustomEvent, source: string) {
    if (source == "sex")
      this.gender = event.detail.value;
    else if (source == "date")
      this.birth = new Date(event.detail.value);
    else
      alert("Zla volba");

  }

  createUser() {
    let user: User = this.accountService.registratingUser;
    if (user == undefined) {
      console.log("UNDEFINED");
      user = new User("NAME", "EMAIL", "PSSWD");
    }
    user.sex = this.gender;

    if (this.birth == undefined) this.birth = new Date()
    user.birthday = `${this.birth.getFullYear()}-${this.birth.getMonth() + 1}-${this.birth.getDate()}`;

    console.log(user.toJSON());

    this.APIservice.registrateUser(user).subscribe(
      response => {
        console.log("status code: ", response.status);
        console.log("response: ", response.body);
        if (response.status == 201)
          this.router.navigateByUrl('/login');
      },
      error => {
        this.presentAlert(error.error);

      }

    );
  }

  setHighlight(event: string): string {
    if (event == "focus")
      return "highlight-blue";
    else if (event == "blur") {
      if (this.name.length > 0)
        return "highlight-dark";
      return "highlight-gray";
    }
    else {
      return "";
    }

  }
}
