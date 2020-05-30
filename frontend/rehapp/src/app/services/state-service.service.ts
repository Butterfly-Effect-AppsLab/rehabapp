import { Injectable } from '@angular/core';
import { Question, TreeComponent } from './models/Tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from './apiservice.service';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _actualTreeComponent: BehaviorSubject<TreeComponent> = new BehaviorSubject<TreeComponent>(null);
  private _checksum: String;
  private _questions: object;
  private _componentStack: Array<TreeComponent> = [];
  private _actualSide: BehaviorSubject<string> = new BehaviorSubject<string>("front");
  private _opositeSide: BehaviorSubject<string> = new BehaviorSubject<string>("back");
  private isLoading = false;
  public animationInPogress = false;

  constructor(private api: APIService, private navCtrl: NavController, private router: Router, private loadingController: LoadingController) {
    if(this.questions == undefined)
      this.api.getTree().subscribe( 
        (resp) => { 
          this.questions = resp['questions'];   
        },
        (err) => alert("Prerusilo sa spojenie.")
      );
  }

  

  async startLoading(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    })
    await loading.present();
    this.isLoading = true;
  }

  async stopLoading(){
    this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);
    this.isLoading = false;
  }

  set actualTreeComponent(state: BehaviorSubject<TreeComponent>) {
    this._actualTreeComponent = state;
  } 

  get actualTreeComponent(): BehaviorSubject<TreeComponent> {
    return this._actualTreeComponent;
  }

  get actualSide(): BehaviorSubject<string> {
    return this._actualSide;
  }

  get opositeSide(): BehaviorSubject<string> {
    return this._opositeSide;
  }

  public get questions() { return this._questions }
  public set questions(questions) { this._questions = questions }

  public get checksum() { return this._checksum } 
  public set checksum(checksum) { this._checksum = checksum }

  public get componentStack() { return this._componentStack } 
  
  public pushComponent(component: TreeComponent) { 
    this._componentStack.push(component);
  } 
  public popComponent():TreeComponent { 
    return this._componentStack.pop();
  }

  async back() {

    if(this.isLoading)
      return;

    if(this.componentStack.length == 0){
      this.router.navigateByUrl('/onboarding');
      return;
    }
      
    var oldTreeComponent = this.actualTreeComponent.getValue();
    this.actualTreeComponent.next(this.componentStack.pop());

    if(oldTreeComponent.type == "area"){
      await this.startLoading();
      this.router.navigateByUrl('/diagnostic');
    }

    if(this.actualTreeComponent.getValue().type == "area"){
      await this.startLoading();
      this.router.navigateByUrl('/selection');
    }
  }
}
