import { getArtistTracks, getMusicInfo, getPlaylist } from "../../api/api";
import { Page } from "../../templates/pages";
import { CardTrack } from "./recomend/card-track";
import { Recomend } from "./recomend/recomendation";
import { storeTracks } from "../../api/api";
import { getRandomArtist } from "../../api/random";


export class HomePage extends Page {
  private readonly recomendContainer: Recomend;

  static TextObject = {
    recomendTitle: "Recomended for you",
    albumsTitle: "New Albums"
  };

  constructor(id: string) {
    super(id);
    const recTitle = this.createHeaderTitle(HomePage.TextObject.recomendTitle);
    recTitle.className = 'recomend__title';
    this.recomendContainer = new Recomend();
    const albumsTitle = this.createHeaderTitle(HomePage.TextObject.albumsTitle);
    albumsTitle.className = 'albums__title';
    this.container.append(recTitle, this.recomendContainer.element, albumsTitle);
  }

  async getInfo() {
    for(let i = 0; i < 3; i++) {
    storeTracks.artistName = getRandomArtist();
    const data = await getArtistTracks('byName');
    const tag = await getMusicInfo();
    this.newRecomendation();
    }
  }

  newRecomendation() {
      let tracks= storeTracks.tracks;
      const randomTrack= [tracks[Math.floor(Math.random() * tracks.length)]];
      const cards = randomTrack.map(({name,image}) => new CardTrack(
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
