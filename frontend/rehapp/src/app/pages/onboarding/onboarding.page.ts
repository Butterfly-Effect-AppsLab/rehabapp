import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Quote } from 'src/assets/data/quote'


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor(private api: APIService) { }

  quotes: Quote[] = [];
  headers: string[] = [];
  print: string = ""

  ngOnInit() {
  }

  onClick(){
    console.log("redirecting"); 
  }

  getAllQuotes() {
    
    this.api.getQuotes()
      .subscribe(resp => {
        console.log(resp);
        
        
        const keys = resp.headers.keys;

        for (const q of resp.body) {
          this.quotes.push(q);
        }
        
        this.print = JSON.stringify(this.quotes);
      });
  }

  getQuoteById(id: number) {
    this.api.getQuoteById(id)
    .subscribe(data => {
      this.print = JSON.stringify(data);
    });
  }

}
