import { Injectable, ElementRef, HostListener } from '@angular/core';
import { Question, TreeComponent, Diagnose } from './models/Tree';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from './apiservice.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import { User } from './models/User';
import { Element } from '@angular/compiler';
import { StorageService } from './storage.service';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _actualTreeComponent: BehaviorSubject<TreeComponent> = new BehaviorSubject<TreeComponent>(null);
  private _checksum: string;
  private _questions: object;
  private _componentStack: Array<TreeComponent> = [];
  private _actualSide: BehaviorSubject<string> = new BehaviorSubject<string>("front");
  private _opositeSide: BehaviorSubject<string> = new BehaviorSubject<string>("back");
  private _userDiagnosis: Diagnose;
  private isLoading = false;
  public animationInPogress = false;
  public resetValues: boolean = false;

  constructor(private api: APIService,
    private router: Router,
    private loadingController: LoadingController,
    private storage: StorageService) {

    if (this.questions == undefined) {
      this.loadTreeFromStorage();
    }
  }

  updateTree(resp) {
    this.questions = resp['questions'];
    this.checksum = resp['checksum'];
    this.storage.setObject('tree', resp);
  }

  async getVideoObject(keyToFind: string) {
    const ret = await Storage.get({ key: keyToFind });

    return JSON.parse(ret.value);
  }

  loadTreeFromStorage() {
    this.storage.getObject('tree').then(
      (tree) => {
        if (tree) {
          console.log("Tree is loaded from storage.");

          this.questions = tree['questions'];
          this.checksum = tree['checksum'];

          this.api.updateTree(this.checksum).subscribe(
            (resp) => {
              if (resp.status != 204) {
                console.log("Tree is outdated.");
                this.updateTree(resp.body);
              }
            }
          );
        }
        else {
          console.log("Tree is not in storage.");
          this.loadTreeFromAPI();
        }        
      }
    )
  }

  loadTreeFromAPI() {
    this.api.getTree().subscribe(
      (resp) => {
        this.updateTree(resp);
      },
      () => alert("Prerusilo sa spojenie.")
    );
  }

  async startLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      animated: false,
      spinner: null,
      message: `<div class="custom-spinner-container">
      Počkajte prosím...
      <div class="custom-spinner-box">
         <img src="assets/images/loading.gif" />
      </div>
    </div>`
    })
    await loading.present();
    this.isLoading = true;
  }

  async stopLoading() {
    this.loadingController.getTop().then(v => v ? this.loadingController.dismiss() : null);
    this.isLoading = false;
  }

  public pushComponent(component: TreeComponent) {
    this._componentStack.push(component);
  }
  public popComponent(): TreeComponent {
    return this._componentStack.pop();
  }

  async back() {

    if (this.isLoading)
      return;
    
    if (this.componentStack.length == 0) {
      this.router. navigateByUrl('/onboarding');
      return;
    }
    
    var oldTreeComponent = this.actualTreeComponent.getValue();
    this.actualTreeComponent.next(this.componentStack.pop());

    if (oldTreeComponent.type == "area") {
      this.startLoading().then(
        () => this.router.navigateByUrl('/diagnostic')
      );
    }
    
    if (this.actualTreeComponent.getValue().type == "area") {
      this.startLoading().then(
        () => this.router.navigateByUrl('/diagnostic')
      );
    }
  }

  public navigateToBodyPage() {
    this.actualTreeComponent.next(null);
    this.resetValues = true;

    while (this.componentStack.length > 0)
      this.componentStack.pop();

    this.router.navigate(['/diagnostic']);
  }

  @HostListener('scroll', ['$event'])
  removeFader(scrollEvent, topFader: ElementRef, botFader: ElementRef) {
    // visible height + pixel scrolled >= total height 
    if (scrollEvent.target.scrollTop == 0)
      topFader.nativeElement.style['display'] = "none";
    else
      topFader.nativeElement.style['display'] = "block";

    if (scrollEvent.target.offsetHeight + scrollEvent.target.scrollTop >= scrollEvent.target.scrollHeight)
      botFader.nativeElement.style['display'] = "none";
    else
      botFader.nativeElement.style['display'] = "block";
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
  public set checksum(checksum: string) { this._checksum = checksum }

  public get componentStack() { return this._componentStack }

  public get diagnosis() { return this._userDiagnosis }
  public set diagnosis(userDiagnosis: Diagnose) { this._userDiagnosis = userDiagnosis }
}
