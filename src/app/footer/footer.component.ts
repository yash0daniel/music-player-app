import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  play_pause: boolean = true;

  ngOnInit(): void {
  }

  public onPlayPause(){
    this.play_pause = !this.play_pause;
    console.log("toggle");
  }

}
