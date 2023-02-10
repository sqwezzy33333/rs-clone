import { BaseComponent } from "../../../../templates/basecomponent";
import { BlockButtonTrack } from "./block-button-track";

export class SongCard extends BaseComponent {
  constructor(
    image: string,
    artistName: string,
    songName: string,
    releaseDate: string
  ) {
    super("div", "song");
    this.element.innerHTML = `
      <div class="song__image" style="background-image: url(${image})"></div>
      <div class="song__info">
      <div class="song__name_artist">${artistName}</div>
      <div class="song__name_track">${songName}</div>
      <div class="song__releasedate">${releaseDate}</div>
      </div>
    `;
    this.element.append((new BlockButtonTrack()).render());
  }
}
