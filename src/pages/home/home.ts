import { getArtistTracks, getMusicInfo } from "../../api/api";
import { Page } from "../../templates/pages";
import { CardTrack } from "./recomend/card-track";
import { Recomend } from "./recomend/recomendation";
import { storeTracks } from "../../api/api";


export class HomePage extends Page {
  private readonly recomendContainer: Recomend;

  static TextObject = {
    MainTitle: "Home",
  };

  constructor(id: string) {
    super(id);
    const title = this.createHeaderTitle(HomePage.TextObject.MainTitle);
    const recTitle = this.createHeaderTitle('Recomended for you');
    this.recomendContainer = new Recomend();
    this.container.append(title,recTitle, this.recomendContainer.element);
  }

  async getInfo() {
    const data = await getArtistTracks('byName');
    const tag = await getMusicInfo();
    this.newRecomendation();
  }

  newRecomendation() {
      let props = storeTracks.tracks;
      const cards = props.map(({name,image}) => new CardTrack(
        image,
        storeTracks.artistName,
        name, storeTracks.tags));
      this.recomendContainer.addCardsTracks(cards);
  }

  render(): HTMLElement {
    this.getInfo();
    return this.container;
  }
}
