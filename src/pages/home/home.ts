import { getArtistAlbums, getArtistTracks, getMusicInfo, getAlbums, getTracks, getPopularTracks} from "../../api/api";
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
import { Songs } from "./songs/songs";
import { storePopularTracks } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";



export class HomePage extends Page {
  private readonly recomendContainer: Recomend;
  private readonly albumsContainer: Album;
  private readonly songsContainer: Songs;
  private preloader: Preloader;

  static TextObject = {
    recomendTitle: "Recomended for you",
    albumsTitle: "New Albums",
    songsTitle: "Popular Songs"
  };

  constructor(id: string) {
    super(id);
    this.preloader = new Preloader();
    this.container.append(this.preloader.element);
    const recTitle = this.createHeaderTitle(HomePage.TextObject.recomendTitle);
    recTitle.className = 'recomend__title';
    this.recomendContainer = new Recomend();
    const albumsTitle = this.createHeaderTitle(HomePage.TextObject.albumsTitle);
    albumsTitle.className = 'albums__title';
    this.albumsContainer = new Album();
    const songsTitle = this.createHeaderTitle(HomePage.TextObject.songsTitle);
    songsTitle.className = 'songs__title';
    this.songsContainer = new Songs();
    this.container.append(recTitle, this.recomendContainer.element, albumsTitle, this.albumsContainer.element, songsTitle, this.songsContainer.element);
  }

  async getRecomendationTracks() {
    for(let i = 0; i < 3; i++) {
    storeTracks.artistName = getRandomArtist();
    await getArtistTracks('byName');
    await getMusicInfo();
    this.newRecomendation();
    }
    this.windowOnload();
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
    this.windowOnload();
   }

   async getNewSongs() {
    await getPopularTracks();
    this.newSongs();
   }

   newSongs() {
    let tracks = storePopularTracks.tracks;
    Player.getArray(tracks);
    const songs = tracks.map(({id, image, artist_name, name, releasedate, audiodownload}) =>
        new SongCard(
          id,
          image,
          artist_name,
          name,
          releasedate,
          audiodownload
        )
      );
      this.songsContainer.addCards(songs);
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
    this.getNewSongs();
    return this.container;
  }
}
