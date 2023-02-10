import { SongCard } from "./song-card";
import { BaseComponent } from "../../../../templates/basecomponent";

export class RecomendCategorie extends BaseComponent {
    private cards: SongCard[] = [];
    
    constructor() {
      super('div', 'recomend__cotegorie_container');
    }
  
    clear() {
      this.cards;
      this.element.innerHTML = '';
    }
  
    addCards(cards: SongCard[]) {
      this.cards = cards;
      this.cards.forEach((card) => this.element.append(card.element))
    }
  }