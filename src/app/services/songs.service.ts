import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor() { }

  list: any = [{
    "url": "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Imagine_Dragons_-_Thunder%5BListenVid.com%5D.mp3"
  },
  {
    "url": "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Camila_Cabello_-_Havana_Audio_ft_Young_Thug%5BListenVid.com%5D.mp3"
  },
  {
    "url": "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/G-Eazy_-_No_Limit_Audio_ft_AAP_Rocky_Cardi_B%5BListenVid.com%5D.mp3"
  },
  {
    "url": "https://ia601009.us.archive.org/8/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Post_Malone_-_rockstar_ft_21_Savage_Official_Audio%5BListenVid.com%5D.mp3"
  }]

}
