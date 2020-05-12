import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators'

import { APIService } from 'src/app/services/apiservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { Area, Option } from 'src/app/services/models/Tree';

@Component({
  selector: 'app-self-diagnostic',
  templateUrl: './self-diagnostic.page.html',
  styleUrls: ['./self-diagnostic.page.scss'],
})
export class SelfDiagnosticPage implements OnInit {


  public type: string = "";
  public questionForChild: object = {};
  public textForChild: String = "";

  private subpart: Option;
  private tree;

  private areaID: string;

  public subscription: Array<Subscription> = [];
  public observables;

  constructor(private route: ActivatedRoute, private router: Router, private api: APIService) {

    this.route.queryParams.subscribe( () => {      
      if (this.router.getCurrentNavigation().extras.state) {      
        this.tree = this.router.getCurrentNavigation().extras.state.tree;
        this.subpart = this.router.getCurrentNavigation().extras.state.subpart;        
      }
      console.log("subpart:");        
      console.log(this.subpart);
      console.log("tree:");
      console.log(this.tree);
    });    
  }

  ngOnInit() {
    if (this.tree == undefined){
      this.getTreeFromAPI();      // ako spravit, aby pockalo, kym sa vykona ???? 
      this.subpart = {id: -1, label: "Bolesť pozdĺž hrudnej chrbtice", ref: 'q_1'};
    }      
  }

  ngOnDestroy() {
    this.subscription.forEach(
      (subscribe) => subscribe.unsubscribe()
    );
  }

  getTreeFromAPI() {
    this.api.getTree().subscribe(
      resp => { 
        this.tree = resp.body["self-diagnose"];
        this.subpart = resp.body["self-diagnose"]["a_1"]['options'][0]; 
      }     
    )    
  }

  // childAnswered(id: string){
  //   console.log("ANSWER = " + id);
    

  //   if (this.APIresponse[id]["type"] == "question"){
  //     this.type = "YesNo"
  //     this.questionForChild = this.APIresponse[id];
  //   }
  //   if (this.APIresponse[id]["type"] == "diagnose"){
  //     this.type = "Diagnose"
  //     this.textForChild = this.APIresponse[id];
  //   }

  // }

  // getQuestionsForArea(area: string) {
  //   return this.areas[area];
  // }

  // findQuestion(id: string) {
  //   return this.APIresponse[id];
  // }

  start(){
    this.type = "Question";
    this.questionForChild = this.tree[this.subpart.ref]
  }

  // multiOptClick() {
  //   this.type = "MultiOpt";
  // }

  diagnoseClick(){
    this.type = "Diagnose";
  }
}
