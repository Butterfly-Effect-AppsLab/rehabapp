import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/assets/data/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  @ViewChild('username', {read: ElementRef, static: true}) username: ElementRef;
  @ViewChild('email', {read: ElementRef, static: true}) email: ElementRef;
  @ViewChild('password', {read: ElementRef, static: true}) password: ElementRef;
  constructor() { }

  ngOnInit() {
  }


  createUser() {
    let username: string = this.username.nativeElement.value;
    let email: string = this.email.nativeElement.value;
    let password: string = this.password.nativeElement.value;

    if (username.length > 0 && password.length > 0){
      let newuser: User = new User(username, password);
      if (email.includes("@"))
        newuser.email = email;

      alert("registred!");
      console.log(JSON.stringify(newuser));      
    } else {
      alert("username and password are required");
    }


  }
}
