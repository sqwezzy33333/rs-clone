import { getArtistAlbums, getArtistTracks, getMusicInfo, getAlbums} from "../../api/api";
import { Page } from "../../templates/pages";
import { CardTrack } from "./recomend/card-track";
import { Recomend } from "./recomend/recomendation";
import { storeTracks, storeAlbums } from "../../api/api";
import { getRandomAlbums, getRandomArtist } from "../../api/random";
import { AlbumCard } from "./albums/card-album";
import { Album } from "./albums/albums";


export class HomePage extends Page {
  private readonly recomendContainer: Recomend;
  private readonly albumsContainer: Album;

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
    this.albumsContainer = new Album();
    this.container.append(recTitle, this.recomendContainer.element, albumsTitle, this.albumsContainer.element);
  }

  async getRecomendationTracks() {
    for(let i = 0; i < 3; i++) {
    storeTracks.artistName = getRandomArtist();
    const data = await getArtistTracks('byName');
    const tag = await getMusicInfo();
    this.newRecomendation();
    }
  }

  async getNewAlbums() {
    this.albumsContainer.clear();
    for(let i = 0; i < 5; i++) {
      storeAlbums.albumName = getRandomAlbums();
      if(storeAlbums.albumName !== getRandomAlbums()) {
        const albums = await getAlbums();
        this.newAlbums();
      }
    }
   }

  newRecomendation() {
      let tracks= storeTracks.tracks;
      const randomTrack = [tracks[Math.floor(Math.random() * tracks.length)]];
      const cards = randomTrack.map(({name,image}) => new CardTrack(
        image,
        storeTracks.artistName,
        name, storeTracks.tags));
      this.recomendContainer.addCards(cards);
  }

  newAlbums() {
    const albumCards = new AlbumCard(
     storeAlbums.albumImage,
     storeAlbums.albumName);
      this.albumsContainer.addCards([albumCards]);
  }

  render(): HTMLElement {
    this.getRecomendationTracks();
    this.getNewAlbums();
    return this.container;
  }
}
