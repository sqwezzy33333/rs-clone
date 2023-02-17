import { getPlaylist, storeTracks } from "../../api/api";
import { BaseComponent } from "../../templates/basecomponent";
import { PlaylistImg } from "./playlist-image";
import { RecomendPlaylist } from "./recomend-playlist";
import { PlaylistCard } from "./playlist-card";

export class BlockPlaylist extends BaseComponent {
    private readonly recomendPlaylistContainer: RecomendPlaylist;
  constructor() {
    super("div", "playlist__container");
    this.recomendPlaylistContainer = new RecomendPlaylist();
  }


  render() {
    for (let i = 0; i < PlaylistImg.playlists.length; i++) {
    this.getRecomendationPlaylist(`${PlaylistImg.playlistIds[i]}`, `${PlaylistImg.playlists[i]}`);
    }
    this.element.append(this.recomendPlaylistContainer.element);
    return this.element;
  }

  async getRecomendationPlaylist(id: string, src: string) {
    const data = await getPlaylist(id);
    this.newRecomendation(id, src);
  }

  newRecomendation(id: string, src: string) {
    let tracks = storeTracks.playlist;
    // Player.getArray(tracks);
    let name = ""; 
    tracks.map((el) => name = el.name);
    let count = 0; 
    tracks.map((el) => count = el.tracks.length);
    
    const card = new PlaylistCard(id, src, name, count);
    // this.recomendPlaylistContainer.clear();
    this.recomendPlaylistContainer.addPlaylist(card);
  }
}
