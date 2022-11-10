import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { StreamState } from "../interfaces/stream-state";

@Injectable({
  providedIn: 'root'
})

export class AudioService {

  constructor() { }

  private stop$ = new Subject();
  // audioObj = new Audio(this.newUrl);
  audioObj = new Audio();

  songsList = [
    "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Imagine_Dragons_-_Thunder%5BListenVid.com%5D.mp3"
    , "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Camila_Cabello_-_Havana_Audio_ft_Young_Thug%5BListenVid.com%5D.mp3"
    , "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/G-Eazy_-_No_Limit_Audio_ft_AAP_Rocky_Cardi_B%5BListenVid.com%5D.mp3"
    , "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Post_Malone_-_rockstar_ft_21_Savage_Official_Audio%5BListenVid.com%5D.mp3"
  ]

  count: any = 0;

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private streamObservable(url: any) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      // this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }

  private addEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: 0,
    currentTime: 0,
    canplay: false,
    error: false,
    progressBar: "0"
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
    // console.log(this.state)
    switch (event.type) {
      case 'canplay':
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case 'playing':
        this.state.playing = true;
        break;
      case 'pause':
        this.state.playing = false;
        break;
      case 'timeupdate':
        this.state.currentTime = this.audioObj.currentTime;
        this.state.progressBar = String(this.progressbar())
        // console.log(this.state.progressBar)
        // console.log(typeof(this.state.progressBar))
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: 0,
      currentTime: 0,
      canplay: false,
      error: false,
      progressBar: "0"
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  playStream(url: any) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop(track: any) {
    // if (track) {
    //   this.count++
    //   console.log(this.count)
    //   this.stop$.next(this.songsList[this.count]);
    // }
    // else {
    //   this.count++
    //   console.log(this.count)
    //   this.stop$.next(this.songsList[this.count]);
    // }
    this.stop$.next();
  }

  volumeFunction(volume: any) {
    this.audioObj.volume = volume;
  }

  repeatFuntion(repeat: any) {
    this.audioObj.loop = repeat
  }

  progressbar() {
    let pB = this.state.currentTime / this.state.duration * 100;
    return pB;
  }

  seekTo(seconds: any) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}
