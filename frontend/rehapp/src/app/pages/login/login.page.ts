import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

import { User } from 'src/assets/data/User'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: Array<User> = []; 

  @ViewChild('username', {read: ElementRef, static: true}) username: ElementRef;
  @ViewChild('pass', {read: ElementRef, static: true}) password: ElementRef;
  @ViewChild('h', {static: false}) h1: ElementRef;

  constructor(private api : APIService) { 
    this.api.getUsers().subscribe(
      resp => { this.users = resp.body; }
    );
  }

  ngOnInit() {
  }
  
  login(){
    let loggedUser: User; 
    
    this.users.forEach(
      (user) => { 
        if (user.username == this.username.nativeElement.value) {
          loggedUser = user;
        }
      }
    )

    if (loggedUser == undefined) {
      alert("User or password is incorrect");
    } 
    else {
      if (loggedUser.password == this.password.nativeElement.value) 
        alert("Ok");
      else 
        alert("User or password is incorrect!");
    }
      
  }
}