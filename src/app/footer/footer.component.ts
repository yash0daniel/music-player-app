import { Component, OnInit } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { SongsService } from "../services/songs.service";
import { StreamState } from '../interfaces/stream-state';
// import { songs } from "../../assets/songs"

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  state!: StreamState;

  constructor(public audioService: AudioService, public songsService: SongsService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  newUrl = 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3'
  // newUrl: this.songsService.list[1]
  isPlaying = false;
  volume: any = 0.2;

  play_pause: boolean = true;
  next_tract: boolean = true;
  prev_tract: boolean = false;
  shuffle_tract: boolean = true;
  volume_button: boolean = true;
  repeat_button: boolean = false;

  ngOnInit(): void {
    this.audioService.playStream(this.newUrl).subscribe();  
    // var nreUrl1: any = songs[1]
    // console.log(nreUrl1)
    // console.log(songs)
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")
  }

  public onPlayPause() {
    this.play_pause = !this.play_pause;
    if (!this.play_pause) {
      this.audioService.play()
    }
    else {
      this.audioService.pause()
    }
  }

  public onNext() {
    this.next_tract = !this.next_tract;
    this.audioService.stop(true)
    console.log("Next_tract");
  }

  public onPrev() {
    this.prev_tract = !this.prev_tract;
    this.audioService.stop(false)
    console.log("Prev_tract");
  }

  public onShuffle() {
    this.shuffle_tract = !this.shuffle_tract;
    if (this.shuffle_tract) {
      console.log("shuffle_tract ON");
    } else
      console.log("shuffle_tract OFF")
  }

  public onRepeat() {
    this.repeat_button = !this.repeat_button
    this.audioService.repeatFuntion(this.repeat_button)
  }

  public changeVolume(event: any) {
    this.volume = event.value;
    this.audioService.volumeFunction(this.volume)
  }

  public onVolume() {
    this.volume_button = !this.volume_button;
    if (!this.volume_button) {
      this.audioService.volumeFunction(0.0)
    } else {
      this.audioService.volumeFunction(this.volume)
    }
  }
}
