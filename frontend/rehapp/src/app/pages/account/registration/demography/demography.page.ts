import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state-service.service';
import { User } from 'src/app/services/models/User';

@Component({
  selector: 'app-demography',
  templateUrl: './demography.page.html',
  styleUrls: ['./demography.page.scss'],
})
export class DemographyPage implements OnInit {

  private months: Array<string> = ["Január","Február","Marec","Apríl","Máj","Jún","Júl","August","September","Október","November","December"]
  private gender: string = ""
  private birdth: Date;

  constructor(private APIservice: APIService, private stateService: StateService) { }

  ngOnInit() {
  }


  valueSelected(event: CustomEvent, source: string) {
    if (source == "sex")
      this.gender = event.detail.value;
    else if (source == "date")
      this.birdth = new Date(event.detail.value);
    else 
      alert("Zla volba");
      
  }

  createUser() {
    let user: User = this.stateService.registratingUser;
    if (user == undefined) {
      console.log("UNDEFINED");
      user = new User("NAME","EMAIL","PSSWD");
    }
    user.sex = this.gender;
    user.birdthday = `${this.birdth.getFullYear()}-${this.birdth.getMonth()}-${this.birdth.getDate()}`;

    console.log(user);  

    this.APIservice.registrateUser(user).subscribe(
      response => console.log(JSON.stringify(response))
    );
  }

}
