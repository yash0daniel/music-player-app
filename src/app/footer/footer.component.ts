import { Component, OnInit } from '@angular/core';
// import { StreamState } from '../interfaces/stream-state';
import { takeUntil } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

export interface StreamState {
  playing: boolean;
  readableCurrentTime: string;
  readableDuration: string;
  duration: number | undefined;
  currentTime: number | undefined;
  canplay: boolean;
  error: boolean;
}

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  play_pause: boolean = true;
  next_tract: boolean = true;
  prev_tract: boolean = true;
  shuffle_tract: boolean = true;
  volume_button: boolean = true;

  // url = 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3'
  url = '../assets/songs/Wo_Noor.mp3'
  private stop$ = new Subject();
  audioObj = new Audio(this.url);
  isPlaying = false;
  songTime: any = "80"

  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log("wprkon")
    // this.audioObj.src = this.url;
    // this.audioObj.load();
    // this.audioObj.play();
  }

  private streamObservable() {
    return new Observable(observer => {
      // Play audio
      console.log('streamObservable')
      this.audioObj.src = this.url;
      this.audioObj.load();
      this.audioObj.play();
      console.log('streamObservable')

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

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);

  private updateStateEvents(event: Event): void {
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
        this.state.readableCurrentTime = this.formatTime(this.state.currentTime);
        break;
      case 'error':
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  formatTime(time: number, format: string = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  public onPlayPause() {
    this.play_pause = !this.play_pause;
    if (!this.play_pause) {
      this.play()
      // this.playStream()
    }
    else {
      this.pause()
    }
  }

  playStream() {
    return this.streamObservable().pipe(takeUntil(this.stop$));
  }

  play() {
    console.log('Play audio')
    this.audioObj.play();
  }

  pause() {
    console.log("Paused audio")
    this.audioObj.pause();
  }

  stop() {
    this.stop$.next();
  }

  public onNext() {
    this.next_tract = !this.next_tract;
    console.log("Next_tract");
  }

  public onPrev() {
    this.prev_tract = !this.prev_tract;
    console.log("Prev_tract");
  }

  public onShuffle() {
    this.shuffle_tract = !this.shuffle_tract;
    if (this.shuffle_tract)
      console.log("shuffle_tract ON");
    else
      console.log("shuffle_tract OFF")
  }

  public onVolume() {
    this.volume_button = !this.volume_button;
    console.log("Volume button")
  }
}
