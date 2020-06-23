import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StateService } from 'src/app/services/state-service.service';
import { APIService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  fullscreenToggle: boolean = false;

  @HostListener("document:webkitfullscreenchange", ['$event']) 
  fullScreen(e) {
    if(this.fullscreenToggle)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    else
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.fullscreenToggle = !this.fullscreenToggle;
  }

  @ViewChild('player', { static: false }) player: ElementRef;

  constructor(
    private screenOrientation: ScreenOrientation,
    private apiService: APIService,
    private stateService: StateService
  ) {

  }

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    const videoTag: HTMLVideoElement = this.player.nativeElement;
    // this.apiService.checkConnection().subscribe((response) => {      
    //   this.stateService.setObject('video', response['video']).then(()=>{
    //     this.stateService.getVideoObject('video').then((data)=>{
    //       let src = data.value.replace(/['"]+/g, '')
    //       videoTag['src']="data:video/mp4;base64," + src
    //       videoTag.play();
    //     });
    //   });
    // });
  }

  ionViewDidLeave() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-video',
//   templateUrl: './video.page.html',
//   styleUrls: ['./video.page.scss'],
// })
// export class VideoPage implements OnInit {

//   /* 1. Some required variables which will be used by YT API*/
//   public YT: any;
//   public video: any;
//   public player: any;
//   public reframed: Boolean = false;

//   isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//   /* 2. Initialize method for YT IFrame API */
//   init() {
//     // Return if Player is already created
//     if (window['YT']) {
//       this.startVideo();
//       return;
//     }

//     var tag = document.createElement('script');
//     tag.src = 'https://www.youtube.com/iframe_api';
//     var firstScriptTag = document.getElementsByTagName('script')[0];
//     firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//     /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
//     window['onYouTubeIframeAPIReady'] = () => this.startVideo();
//   }

//   ngOnInit() {
//     this.video = 'CDj2Zsnxxng';
//     this.init();
//   }

//   startVideo() {
//     this.reframed = false;
//     this.player = new window['YT'].Player('player', {
//       videoId: this.video,
//       height: '390',
//     width: '640',
//       playerVars: {
//         autoplay: 1,
//         controls: 0,
//         disablekb: 1,
//         enablejsapi: 1,
//         loop: 1,
//         modestbranding: 1,
//         origin: 'http://localhost:8100',
//         playsinline: 1,
//         rel: 0,
//         showinfo: 0,
//         // fs: 0,


//       },
//       events: {
//         'onStateChange': this.onPlayerStateChange.bind(this),
//         'onError': this.onPlayerError.bind(this),
//         'onReady': this.onPlayerReady.bind(this),
//       }
//     });
//   }

//   /* 4. It will be called when the Video Player is ready */
//   onPlayerReady(event) {
//     if (this.isRestricted) {
//       event.target.mute();
//       event.target.playVideo();
//     } else {
//       event.target.playVideo();
//     }
//   }

//   /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
//   onPlayerStateChange(event) {
//     console.log(event)
//     switch (event.data) {
//       case window['YT'].PlayerState.PLAYING:
//         if (this.cleanTime() == 0) {
//           console.log('started ' + this.cleanTime());
//         } else {
//           console.log('playing ' + this.cleanTime())
//         };
//         break;
//       case window['YT'].PlayerState.PAUSED:
//         if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
//           console.log('paused' + ' @ ' + this.cleanTime());
//         };
//         break;
//       case window['YT'].PlayerState.ENDED:
//         console.log('ended ');
//         break;
//     };
//   };

//   cleanTime() {
//     return Math.round(this.player.getCurrentTime())
//   };

//   onPlayerError(event) {
//     switch (event.data) {
//       case 2:
//         console.log('' + this.video)
//         break;
//       case 100:
//         break;
//       case 101 || 150:
//         break;
//     };
//   };

// }