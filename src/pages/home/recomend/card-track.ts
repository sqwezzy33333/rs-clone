import { BaseComponent } from "../../../templates/basecomponent";

export class CardTrack extends BaseComponent {

  constructor(image: string, artistName: string, trackName: string, tags: string[]) {
    super('div', 'recomend__track');
    const tag = tags.map((value) => `<span class="track__tag">${value}</span>`);
    this.element.innerHTML = `
    <div class="track__container">
      <div class="track__image" style="background-image: url(${image})"></div>
      <div class="artist__title">${artistName}</div>
      <div class="track__title">${trackName}</div>
      <div class="track__tags">${tag.join('\n')}</div>
    </div>`
  }
}