import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { APIService } from 'src/app/services/apiservice.service';
import { User } from 'src/app/services/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private usermail: string = "";
  private password: string = "";
  private rememberLogin: boolean = false;
  private showPass: boolean = false;

  constructor(private APIservice: APIService) { }

  ngOnInit() {
  }

  login() {
    console.log("mail: ",this.usermail);
    console.log("pass: ", this.password);
    console.log("remember: ", this.rememberLogin); 


    this.APIservice.loginUser(new User(null, this.usermail, this.password)).subscribe(
      response => {
        console.log("status code: ", response.status);
        console.log("response: ", response.body);
      }    
    );
  }
}
