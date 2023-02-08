import { BaseComponent } from "../../../templates/basecomponent";

export class AlbumCard extends BaseComponent {
  constructor(image: string, albumName: string) {
    super('div', 'album') 
    this.element.innerHTML = `
    <div class="album__container">
    <img class="album__image" src=${image} alt="album_image">
    <div class="album__title">${albumName}</div>
    </div>
    `
  }
}