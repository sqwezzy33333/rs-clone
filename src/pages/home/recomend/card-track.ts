import { BaseComponent } from "../../../templates/basecomponent";

export class CardTrack extends BaseComponent {

  constructor(readonly image: string, name: string, tags: string[]) {
    super('div', 'recomend__container');
    const tag = tags.map((value) => `<span class="track__tag">${value}</span>`);
    this.element.innerHTML = `
    <div class="track__container">
      <div class="track__image" style="background-color: url(${image})">
      <div class="track__title">${name}</div>
      <div class="track__tags">${tag.join('\n')}</div>
      </div>
    </div>`
  }
}