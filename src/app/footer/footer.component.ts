import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
  }

  public onPlayPause() {
    this.play_pause = !this.play_pause;
    if (this.play_pause)
      console.log("Play");
    else
      console.log("Paused")
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

  public onVolume(){
    this.volume_button = !this.volume_button;
    console.log("Volume button")
  }
}
