import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
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
  private validName: boolean = false;
  private gender: string = "female"
  private birth: Date = new Date("1990-01-01");
  private nameHighlighter: string = "highlight-gray";


  constructor(
    private APIservice: APIService, 
    private router: Router, 
    private accountService: AccountService, 
    private alertController: AlertController,
    private stateService: StateService
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    let user:User = this.accountService.userLoggedIn;

    console.log(user);

    this.name = user.username;
    this.gender = user.sex;
    this.birth = new Date(user.birthday);
    this.stateService.stopLoading();
  }

  async presentAlert(error?: object, message?: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: error == null ? 'Chyba...' : 'Error',
      message: error == null ? message : JSON.stringify(error),
      buttons: ['OK']
    });

    await alert.present();
  }

  valueSelected(event: CustomEvent, source: string) {
    if (source == "sex"){
      this.gender = event.detail.value;
    }
    else if (source == "date")
      this.birth = new Date(event.detail.value);
    else
      alert("Zla volba");
  }

  createUser() {
    if (!this.validName) {
      this.presentAlert(null, "...je potrebné zadať meno.")
      return
    }

    let user: User = this.accountService.registratingUser;
    if (user == undefined) {
      console.log("UNDEFINED");
      user = new User("NAME", "EMAIL", "PSSWD");
    }
    user.username = this.name;
    user.sex = this.gender;

    if (this.birth == undefined) this.birth = new Date()
    user.birthday = `${this.birth.getFullYear()}-${this.birth.getMonth() + 1}-${this.birth.getDate()}`;

    this.APIservice.registrateUser(user).subscribe(
      response => {
        console.log("status code: ", response.status);
        console.log("response: ", response.body);
        if (response.status == 201)
          this.router.navigateByUrl('/login');
        else {
          this.presentAlert(response.body)
        }
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

  nameChanged() {
    if (this.name.length > 0)
      this.validName = true;
    else 
      this.validName = false;
  }
}
