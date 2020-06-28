import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  fullscreenToggle: boolean = false;
  loaded: boolean = false;
  size: number = 0.0;
  formattedSize: number = 0.0;
  ids = undefined;
  videos = [];
  downloaded = 0.0;
  videoData = {};

  @ViewChild('player', { static: false }) player: ElementRef;

  @HostListener("document:webkitfullscreenchange", ['$event'])
  fullScreen(e) {
    if (this.fullscreenToggle)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    else
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.fullscreenToggle = !this.fullscreenToggle;
  }

  constructor(
    private screenOrientation: ScreenOrientation,
    private apiService: APIService,
    private stateService: StateService
  ) {

  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    // const videoTag: HTMLVideoElement = this.player.nativeElement;
    // this.apiService.checkConnection().subscribe((response) => {
    //   const reader = new FileReader();

    //   // This fires after the blob has been read/loaded.
    //   reader.addEventListener('loadend', (e: ProgressEvent) => {
    //     this.stateService.setObject('video', e.srcElement['result']).then(()=>{
    //     this.stateService.getVideoObject('video').then(async (data)=>{
    //       videoTag['src'] = data;
    //       videoTag['muted'] =true;
    //       await videoTag.play();
    //       this.loaded = true;
    //     });
    //   });

    //     // console.log(e.srcElement['result'].split('base64,')[1]);
    //     // videoTag['src']="data:video/mp4;base64," + e.srcElement['result'].split('base64,')[1];
    //     // videoTag.play();
    //   });

    //   // Start reading the blob as text.
    //   reader.readAsDataURL(response);

    // });
  }

  ionViewDidLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }

  getVideos() {
    let diagnose_id = 39;
    this.apiService.getVideos(39).subscribe((resp) => {
      let b = resp;
      this.size = b.size;
      this.formattedSize = b.formatted_size;
      this.ids = b.ids;
    });
  }

  downloadVideos(idx: number = 0) {
    if (idx < this.ids.length) {
      this.apiService.donloadVideo(this.ids[idx].id).subscribe((resp) => {
        let video = resp;
        this.apiService.donloadVideoData(this.ids[idx].id).subscribe((resp) => {

          const reader = new FileReader();

          // This fires after the blob has been read/loaded.
          reader.addEventListener('loadend', (e: ProgressEvent) => {
            this.stateService.setObject(resp.video.name, e.srcElement['result']).then(() => {
              this.stateService.getVideoObject(resp.video.name).then(async (data) => {
                console.log(video);
                console.log(resp);
                this.downloaded += this.ids[idx].size;
                this.downloadVideos(idx + 1);
                console.log(data);
                // videoTag['src'] = data;
                // videoTag['muted'] = true;
                // await videoTag.play();
                // this.loaded = true;
              });
            });
          });

          // this.stateService.getVideoObject('video').then(async (data)=>{
          //   videoTag['src'] = data;
          //   videoTag['muted'] =true;
          //   await videoTag.play();
          //   this.loaded = true;
          // });

          // console.log(e.srcElement['result'].split('base64,')[1]);
          // videoTag['src']="data:video/mp4;base64," + e.srcElement['result'].split('base64,')[1];
          // videoTag.play();


          // Start reading the blob as text.
          reader.readAsDataURL(video);
        });
      });
    }
  }
}