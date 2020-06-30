import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/models/User';
import { AccountService } from 'src/app/services/account.service';
import { StateService } from 'src/app/services/state.service';
import { APIService } from 'src/app/services/apiservice.service';
import { StorageService } from 'src/app/services/storage.service';
import { Diagnose } from 'src/app/services/models/Tree';
import { AlertController, LoadingController } from '@ionic/angular';
import { Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  @ViewChild('fader_top', { static: true }) topFader: ElementRef;
  @ViewChild('fader_bot', { static: true }) botFader: ElementRef;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  user: User = new User("");
  diagnoses: Array<Diagnose> = [];
  selectedIndex = 0;
  fontsize: Array<number> = [];
  namesize: number = 32;

  videoSize: number = 0.0;
  videoFormattedSize: number = 0.0;
  videoIds = undefined;
  downloaded = 0.0;

  constructor(private api: APIService,
    private accountService: AccountService,
    private storage: StorageService,
    private stateService: StateService,
    private videoService: VideoService,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController) {
  }

  ngOnInit() {
    this.user = new User('');
    this.accountService.diagnoses.subscribe((data)=>{
      console.log(data);
      this.diagnoses = [];

    for(let i=0; i< data.length; i++){
      if (!data[i].today)
      this.diagnoses.push(data[i]);
    }

    this.selectedIndex = 0;
    this.wrapper.nativeElement.scrollTop = 0;
    this.wrapper.nativeElement.scrollTop = 0;
    });
    // this.diagnoses = this.accountService.userLoggedIn.diagnoses;
    this.updateFonts();
  }

  ionViewWillEnter() {
    this.user = this.accountService.userLoggedIn;
    // this.diagnoses = this.user.diagnoses;
    this.updateFonts();

    this.stateService.stopLoading();
  }

  async presentAlert(header: string, text: string, confirmHandler?: () => void) {
    const alert = await this.alertController.create({
      cssClass: 'app-alert',
      subHeader: header,
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

  loading;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'app-loading',
      message: `Prebieha sťahovanie... 0%`,
      // duration: 2000
    });

    await this.loading.present();
  }
  async dismissLoading() {
    await this.loading.dismiss();
    // const { role, data } = this.loading.onDidDismiss();
  }

  updateFonts() {
    this.namesize = this.calculateCaption(this.user.name.length);

    this.diagnoses.forEach((diag, i) => {
      this.fontsize[i] = this.calculateFont(diag.name.length)
    })
  }

  calculateFont(length: number) {
    if (length < 15)
      return 4.5;
    if (length < 20)
      return 4;
    if (length < 30)
      return 3.5;
    if (length < 40)
      return 3;
    if (length < 50)
      return 2.5;
    else
      return 2;
  }

  calculateCaption(length: number) {
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

  begin() {
    this.videoService.excercise = this.diagnoses[this.selectedIndex];
    this.storage.getObject(`d_${this.videoService.excercise.id}`).then(
      (obj) => {
        if (obj && obj.videos) {
          console.log('ok', obj.videos);
          this.videoService.videos = obj.videos;
          this.videoService.excerciseCount = obj.videos.length;
          this.router.navigateByUrl('excercise');
        }
        else {
          this.getVideos();
        }
      }
    )
  }

  getVideos() {
    this.api.getVideos(this.videoService.excercise.id).subscribe(
      (resp) => {
        console.log(resp);

        this.videoSize = resp.size;
        this.videoFormattedSize = resp.formatted_size;
        this.videoIds = resp.ids;
        this.downloaded = 0;
        this.videoService.videos = [];
        this.videoService.excerciseCount = this.videoIds.length;

        this.presentAlert(`Bude stiahnutých ${resp.formatted_size} videí.`, 'Chcete pokračovať?',
          () => {
            this.presentLoading();
            this.downloadVideos(0)
          })
      },
      (err) => {
        this.presentAlert('Chyba pri sťahovaní videí.', err.error)
      }
    );

  }

  downloadVideos(idx: number = 0) {
    if (idx < this.videoIds.length) {
      this.api.donloadVideo(this.videoIds[idx].id).subscribe((resp) => {
        let video = resp;
        this.api.donloadVideoData(this.videoIds[idx].id).subscribe((resp) => {

          const reader = new FileReader();
          reader.addEventListener('loadend', (e: ProgressEvent) => {
            this.fileWrite(resp.video.name, e.srcElement['result']).then(() => {
              this.downloaded += this.videoIds[idx].size;
              document.getElementsByClassName('loading-content')[0].textContent =
                `Prebieha sťahovanie... ${(Math.round((this.downloaded / this.videoSize) * 100 * 100) / 100)}%`;
              this.videoService.videos.push(resp.video);
              this.downloadVideos(idx + 1);
              if (this.downloaded == this.videoSize) {
                this.dismissLoading();
                this.storage.setObject(`d_${this.videoService.excercise.id}`, { 'videos': this.videoService.videos })
                this.router.navigateByUrl('excercise');
              }

              // this.fileRead(resp.video.name).then((data) => {
              //   this.downloaded += this.ids[idx].size;
              //   this.downloadVideos(idx + 1);

              // });
            });
          });

          // Start reading the blob as text.
          reader.readAsDataURL(video);

        },
        (err) => {
          this.presentAlert('Chyba pri sťahovaní videí.', err.error)
        });
      },
      (err) => {
        this.presentAlert('Chyba pri sťahovaní videí.', err.error)
      });
    }
  }

  async fileWrite(path, data) {
    try {
      const result = await Filesystem.writeFile({
        path: path,
        data: data,
        directory: FilesystemDirectory.Data,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Wrote file', result);
    } catch (e) {
      this.presentAlert('Chyba pri sťahovaní.', null);
      this.dismissLoading();
      console.error('Unable to write file', e);
    }
  }

  addDiagnosis() {
    this.router.navigateByUrl('/diagnostic/choice')
  }

  removeFader(event) {
    this.stateService.removeFader(event, this.topFader, this.botFader)
  }

  programSelected(i) {
    this.selectedIndex = i;
    // this.router.navigateByUrl('dashboard/video');
  }

  identify() {
    this.api.identify().subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        this.presentAlert('Používateľ nebol overený.', err.error)
      }
    );
  }
}


