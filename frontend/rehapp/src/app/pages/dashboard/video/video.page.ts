import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { APIService } from 'src/app/services/apiservice.service';
import { StateService } from 'src/app/services/state.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding, Filesystem } from '@capacitor/core';

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
  actualVideo = 0;

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
    let diagnose_id = 59;
    this.apiService.getVideos(diagnose_id).subscribe((resp) => {
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
            this.fileWrite(resp.video.name, e.srcElement['result']).then(() => {
              this.downloaded += this.ids[idx].size;
              this.videos.push(resp.video);
              this.downloadVideos(idx + 1);
              // this.fileRead(resp.video.name).then((data) => {
              //   this.downloaded += this.ids[idx].size;
              //   this.downloadVideos(idx + 1);

              // });
            });
            // this.stateService.setObject(resp.video.name, e.srcElement['result']).then(() => {
            //   this.stateService.getVideoObject(resp.video.name).then(async (data) => {
            //     console.log(video);
            //     console.log(resp);
            //     this.downloaded += this.ids[idx].size;
            //     this.downloadVideos(idx + 1);
            //     console.log(data);
            //     // videoTag['src'] = data;
            //     // videoTag['muted'] = true;
            //     // await videoTag.play();
            //     // this.loaded = true;
            //   });
            // });
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
      console.error('Unable to write file', e);
    }
  }

  async fileRead(path) {
    let contents = await Filesystem.readFile({
      path: path,
      directory: FilesystemDirectory.Data,
      encoding: FilesystemEncoding.UTF8
    });
    return contents;
  }

  play() {
    console.log(this.videos);
    let actual = this.videos[0];
    const videoTag: HTMLVideoElement = this.player.nativeElement;

    this.fileRead(actual.name).then(async (data) => {
      videoTag['src'] = data.data;
      videoTag['muted'] = true;
      await videoTag.play();
      this.loaded = true;
    });
  }

  prev() {
    if (this.actualVideo - 1 >= 0) {
      this.actualVideo -= 1;
      let actual = this.videos[this.actualVideo];
      const videoTag: HTMLVideoElement = this.player.nativeElement;
      this.fileRead(actual.name).then(async (data) => {
        videoTag['src'] = data.data;
        videoTag['muted'] = true;
        await videoTag.play();
        this.loaded = true;
      });
    }
  }

  next() {
    if (this.actualVideo + 1 < this.videos.length) {
      this.actualVideo += 1;
      let actual = this.videos[this.actualVideo];
      const videoTag: HTMLVideoElement = this.player.nativeElement;
      this.fileRead(actual.name).then(async (data) => {
        videoTag['src'] = data.data;
        videoTag['muted'] = true;
        await videoTag.play();
        this.loaded = true;
      });
    }
  }

}