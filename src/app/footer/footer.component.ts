import { Component, OnInit } from '@angular/core';
import { AudioService } from "../services/audio.service";
import { StreamState } from '../interfaces/stream-state';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  state!: StreamState;

  constructor(public audioService: AudioService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  newUrl = 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3'
  // newUrl = '../assets/songs/Wo_Noor.mp3'
  isPlaying = false;
  volume: any = 30;
  // songTime: any = "0"

  play_pause: boolean = true;
  next_tract: boolean = true;
  prev_tract: boolean = true;
  shuffle_tract: boolean = true;
  volume_button: boolean = true;

  ngOnInit(): void {
    this.audioService.playStream(this.newUrl).subscribe();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")
  }

  public onPlayPause() {
    this.play_pause = !this.play_pause;
    if (!this.play_pause) {
      this.audioService.play()
      // this.playStream()
    }
    else {
      this.audioService.pause()
    }
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

  public changeVolume(event: any) {
    // console.log(this.volume)
    this.volume = event.value;
    console.log(this.volume)
  }

  public onVolume() {
    this.volume_button = !this.volume_button;
    if(!this.volume_button)
      this.volume = 0;
    else 
      this.volume = 30;
    console.log("Volume button")
  }
}
