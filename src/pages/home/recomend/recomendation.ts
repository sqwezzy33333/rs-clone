import { CardTrack } from "./card-track";
import { BaseComponent } from "../../../templates/basecomponent";
import { getArtistAlbums, getArtistTracks } from "../../../api/api";

export class Recomend extends BaseComponent {
  private cards: CardTrack[] = [];
  
  constructor() {
    super('div', 'recomend__container');
  }


  addCardsTracks(cards: CardTrack[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }


}