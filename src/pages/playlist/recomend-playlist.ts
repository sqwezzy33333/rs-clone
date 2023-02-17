import { BaseComponent } from "../../templates/basecomponent";
import { PlaylistCard } from "./playlist-card";
import { PlaylistImg } from "./playlist-image";

export class RecomendPlaylist extends BaseComponent {
    private cards: PlaylistImg[] = [];

    
    constructor() {
      super('div', 'playlist__container');
    }
  
    clear() {
      this.cards;
      this.element.innerHTML = '';
    }
  
    addCards() {
    //   this.cards = cards;
    //   let titleCategorie = ""
    //   categ.map((el) => titleCategorie = titleCategorie + " • "+ el);
    //    this.element.innerHTML = `<div class="title__categorie">${titleCategorie} •</div>`;
    //   this.cards.forEach((card) => this.element.append(card.element))
    }

    addPlaylist(card: PlaylistCard) {
      this.element.append(card.element); 
    }
  }