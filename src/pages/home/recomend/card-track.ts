import { BaseComponent } from "../../../templates/basecomponent";

export class CardTrack extends BaseComponent {

  constructor(image: string, artistName: string, trackName: string, tags: string[]) {
    super('div', 'recomend__track');
    const tag = tags.map((value) => `<span class="track__tag">${value}</span>`);
    this.element.innerHTML = `
    <div class="track__container">
      <div class="hover-button">
        <a href=""><div class="play-button">
        <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>
        </div></a>
        <div class="track__image" style="background-image: url(${image})"></div>
      </div>
      <div class="artist__title">${artistName}</div>
      <div class="track__title">${trackName}</div>
      <div class="track__tags">${tag.join('\n')}</div>
    </div>`
  }
}