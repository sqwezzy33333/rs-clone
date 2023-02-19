import { Page } from "../../templates/pages";
import { getPlaylist, storeTracks } from "../../api/api";
import { PlaylistCard } from "./components-playlist/playlist-card";
import { PlaylistImg } from "./components-playlist/playlist-image";
import { BaseComponent } from "../../templates/basecomponent";

export class PlaylistPage extends Page {
  static TextObject = {
    MainTitle: "Playlist Page",
  };
  recomendPlaylistContainer: BaseComponent;

  constructor(id: string) {
    super(id);
    this.recomendPlaylistContainer = new BaseComponent(
      "div",
      "playlist__container"
    );
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(PlaylistPage.TextObject.MainTitle);
    this.container.append(title);
    for (let i = 0; i < PlaylistImg.playlists.length; i++) {
      this.getRecomendationPlaylist(
        `${PlaylistImg.playlistIds[i]}`,
        `${PlaylistImg.playlists[i]}`
      );
    }
    this.container.append(this.recomendPlaylistContainer.element);
    return this.container;
  }

  async getRecomendationPlaylist(id: string, src: string) {
    const data = await getPlaylist(id);
    this.newRecomendation(id, src);
  }

  newRecomendation(id: string, src: string) {
    let tracks = storeTracks.playlist;
    let name = "";
    let count = 0;
    tracks.map((el) => (name = el.name));
    tracks.map((el) => (count = el.tracks.length));
    const card = new PlaylistCard(id, src, name, count);
    this.recomendPlaylistContainer.element.append(card.element);
  }

}
