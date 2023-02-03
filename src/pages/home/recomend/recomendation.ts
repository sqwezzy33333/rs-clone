import { CardTrack } from "./card-track";
import { BaseComponent } from "../../../templates/basecomponent";

export class Recomend extends CardTrack {
  private cards: CardTrack[] = [];
  
  constructor() {
    super('div', 'Songs Name', ['pop', 'jazz', 'rock'])
    //вынести тайтл их конструктора
    const recTitle = new BaseComponent('h1', 'recomend__title', 'Recomended for you');
    this.element.append(recTitle.element);
  }

  addCardsTracks(cards: CardTrack[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }


}