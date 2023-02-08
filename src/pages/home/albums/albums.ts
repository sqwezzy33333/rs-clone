import { AlbumCard } from "./card-album";
import { BaseComponent } from "../../../templates/basecomponent";

export class Album extends BaseComponent {
  private cards: AlbumCard[] = [];
  
  constructor() {
    super('div', 'albums__container');
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }
 
  addCards(cards: AlbumCard[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.append(card.element))
  }
}