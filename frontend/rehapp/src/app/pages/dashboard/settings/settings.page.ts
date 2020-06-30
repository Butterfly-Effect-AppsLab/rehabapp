import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { Diagnose } from 'src/app/services/models/Tree';
import { APIService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { Filesystem, FilesystemDirectory } from '@capacitor/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  @ViewChild('fader_top', {static: true}) topFader: ElementRef;
  @ViewChild('fader_bot', {static: true}) botFader: ElementRef;
  
  diagnoses: Array<Diagnose> = []
  username: string;
  namesize: number = 32;

  constructor(private account: AccountService, 
    private alertController: AlertController,
    private stateService: StateService,
    private api: APIService,
    private router: Router,
    private storage: StorageService) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() { 
    this.diagnoses = this.account.userLoggedIn.diagnoses;
    this.username = this.account.userLoggedIn.name;
    this.namesize = this.calculateFont(this.username.length)
  }

  async presentAlert(text: string, confirmHandler?: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Ste si istý...',
      message: text,
      buttons: [
        {
          text: 'Áno',
          handler: confirmHandler
        }, {
          text: 'Nie',
        }
      ]
    });

    await alert.present();
  } 
  
  async presentError(header: string, text: string) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: header,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  } 

  calculateFont(length: number) {
    if (length < 8)
      return 32;
    if (length < 15)
      return 28;
    if (length < 20)
      return 24;
    if (length < 25)
      return 20;
    else
      return 18;
  }

  logout() {
    this.presentAlert('...že sa chcete odhlásiť?', () => { this.account.logout();});
  }
  updateCredentials() {
    this.router.navigateByUrl('dashboard/demography')
  }

  removeDiag(index) {   
    let removeFromArr = () => { 
      let diagnoseId = this.diagnoses[index].id;
      this.api.removeDiagnosis(diagnoseId).subscribe(
        (resp) => { 
          this.account.userLoggedIn.diagnoses = resp['diagnoses'];
          this.diagnoses = this.account.userLoggedIn.diagnoses;
          this.storage.getObject(`d_${diagnoseId}`).then(
            (obj) => {
              if (obj && obj.videos) {
                console.log(obj.videos);
                
                obj.videos.forEach(video => {
                  this.fileDelete(video.name).then(
                    () => { },
                    (err) => { console.log(err); }
                  )                  
                });
                this.storage.removeItem(`d_${diagnoseId}`);
              }
            }
          )          
         },
         (err) => {
          this.presentError('Chyba pri odstraňovaní programu.', err.error)
        }
      )
    };
    this.presentAlert(`...že chcete odstrániť diagnózu ${this.diagnoses[index].name}`, removeFromArr)
  }

  removeFader(event) {    
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }

  async fileDelete(path: string) {
    await Filesystem.deleteFile({
      path: path,
      directory: FilesystemDirectory.Data
    });
  }
  
}
