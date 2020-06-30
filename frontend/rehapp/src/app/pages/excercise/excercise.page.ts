import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Diagnose } from 'src/app/services/models/Tree';
import { VideoService } from 'src/app/services/video.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FilesystemDirectory, FilesystemEncoding, Filesystem } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/apiservice.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-excercise',
  templateUrl: './excercise.page.html',
  styleUrls: ['./excercise.page.scss'],
})
export class ExcercisePage implements OnInit {

  videoCount = [];
  actualVideo = 0;
  excersiceDiagnose: Diagnose = new Diagnose();
  videoData = undefined;
  videoText = "";
  fullscreenToggle: boolean = false;
  loaded: boolean = false;

  @ViewChild('player', { static: false }) player: ElementRef;

  @HostListener("document:webkitfullscreenchange", ['$event'])
  fullScreen(e) {
    if (this.fullscreenToggle)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    else
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.fullscreenToggle = !this.fullscreenToggle;
  }

  constructor(private videoService: VideoService, 
    private screenOrientation: ScreenOrientation, 
    private apiService: APIService, 
    private accountService: AccountService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.videoCount = Array(this.videoService.excerciseCount);
    this.videoData = this.videoService.videos[0];
    this.videoText = this.videoData.text;
    this.excersiceDiagnose = this.videoService.excercise;
    // console.log('Program: ',this.excersiceDiagnose);
    console.log('Videos: ',this.videoService.videos);

    // if (!this.excersiceDiagnose) {
    //   this.excersiceDiagnose = new Diagnose()
    //   this.excersiceDiagnose.name = 'nezvoleny'
    // }

    this.play();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: 'Úspešne ste ukončili dnešné cvičenie.',
      message: 'Blahoželáme Vám!',
      buttons: [
        {
          text: 'OK'
        }
      ]
    });

    await alert.present();
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      header: 'Úroveň bolesti',
      inputs: [
        {
          name: 'level',
          type: 'radio',
          label: 'žiadna bolesť',
          value: '1',
          checked: true
        },
        {
          name: 'level',
          type: 'radio',
          label: 'mierna bolesť',
          value: '2',
        },
        {
          name: 'level',
          type: 'radio',
          label: 'výrazná bolesť',
          value: '3',
        },
        {
          name: 'level',
          type: 'radio',
          label: 'silná bolesť',
          value: '4',
        },
        {
          name: 'level',
          type: 'radio',
          label: 'neznesiteľná bolesť',
          value: '5',
        }
      ],
      buttons: [
        {
          text: 'OK',
          handler: (data) => { 
            this.apiService.painLevel(this.excersiceDiagnose.id, data).subscribe((resp)=>{
              this.accountService.userLoggedIn.diagnoses = resp.body['diagnoses'];
              this.accountService.diagnoses.next(resp.body['diagnoses']);
              this.router.navigateByUrl('dashboard');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  done() {
    this.presentAlertRadio();
  }

  next() {
    if (this.actualVideo < this.videoCount.length - 1) {
      this.actualVideo++;
      this.play();
    }
  }

  previous() {
    if (this.actualVideo > 0) {
      this.actualVideo--;
      this.play()
    }
  }

  play() {
    let video = this.videoService.videos[this.actualVideo];
    this.videoData = this.videoService.videos[this.actualVideo];
    this.videoText = this.videoData.text;
    const videoTag: HTMLVideoElement = this.player.nativeElement;

    this.fileRead(video['name']).then(async (data) => {
      videoTag['src'] = data.data;
      videoTag['muted'] = true;
      await videoTag.play();
      this.loaded = true;
    });
  }

  async fileRead(path) {
    let contents = await Filesystem.readFile({
      path: path,
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8
    });
    return contents;
  }
}
