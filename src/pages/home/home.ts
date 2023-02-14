import { getArtistAlbums, getArtistTracks, getMusicInfo, getAlbums, getTracks} from "../../api/api";
import { Page } from "../../templates/pages";
import { CardTrack } from "./recomend/card-track";
import { Recomend } from "./recomend/recomendation";
import { storeTracks, storeAlbums } from "../../api/api";
import { getRandomAlbums, getRandomArtist } from "../../api/random";
import { AlbumCard } from "./albums/card-album";
import { Album } from "./albums/albums";
import { Preloader } from "../../components/preloader/preloader";
import KeenSlider from 'keen-slider/keen-slider';
import { Player } from "../../components/player/player";



export class HomePage extends Page {
  private readonly recomendContainer: Recomend;
  private readonly albumsContainer: Album;
  private preloader: Preloader;

  static TextObject = {
    recomendTitle: "Recomended for you",
    albumsTitle: "New Albums"
  };

  constructor(id: string) {
    super(id);
    this.preloader = new Preloader();
    // this.container.append(this.preloader.element);
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
    // this.windowOnload();
    this.playSong();
  }

  async getNewAlbums() {
    for(let i = 0; i < 12; i++) {
      const random = getRandomAlbums()
      if(storeAlbums.albumName !== random) {
      storeAlbums.albumName = random;
        const albums = await getAlbums();
        this.newAlbums();
      }
    }
    // this.windowOnload();
   }

  newRecomendation() {
      let tracks = storeTracks.tracks;
      const randomTrack = [tracks[Math.floor(Math.random() * tracks.length)]];
      const cards = randomTrack.map(({name,image, id}) => new CardTrack(
        image,
        storeTracks.artistName,
        name, storeTracks.tags, id));
      this.recomendContainer.addCards(cards);
  }

  newAlbums() {
    const albumCards = new AlbumCard(
     storeAlbums.albumImage,
     storeAlbums.albumName);
     this.albumsContainer.addCards([albumCards]);
  }

  windowOnload() {
      document.body.classList.add('loaded_hiding');
      window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
      }, 3000);
      this.slider();
  }

  slider() {
    const slider = new KeenSlider(
      this.albumsContainer.element,
      {
        loop: true,
            mode: "free-snap",
            slides: {
              perView: 5,
              spacing: 0,
            },
        created: () => {
          // console.log('created')
        },
      },
    )
  }

   playSong() {
      const playBtn = document.querySelectorAll('.play-button') as NodeListOf<HTMLElement>;
      playBtn.forEach(btn => btn.addEventListener('click', async () => {
        const parent = btn.closest('.track__container') as HTMLElement;
        const trackName = parent.querySelector('.track__title') as HTMLElement;
        storeTracks.trackId = Number(trackName.id);

        let dataForPlay = await getTracks([storeTracks.trackId]);
        console.log(dataForPlay)
        Player.startTrack(dataForPlay.results, trackName.id);

        localStorage.setItem("currentTrackUrl", storeTracks.audio);
      }))
    }

  render(): HTMLElement {
    this.getRecomendationTracks();
    this.getNewAlbums();
    return this.container;
  }
}
