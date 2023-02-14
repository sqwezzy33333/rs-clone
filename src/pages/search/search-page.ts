import { Page } from "../../templates/pages";
import { SearchContainer } from "./search-container";

import { getSearchTracks } from "../../api/api";
import { Player } from "../../components/player/player";
import { storeTrackSearch } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";
// import { Header } from "../../components/header/header";

export class SearchPage extends Page {
  static TextObject = {
    MainTitle: "SearchPage",
  };
  private searchContainer: SearchContainer;
  // private header: Header;

  constructor(id: string) {
    super(id);

    this.searchContainer = new SearchContainer();
    // this.header = new Header();
  }

  renderTracks() {
    let tracks = storeTrackSearch.tracks;
    Player.getArray(tracks);
    const cards = tracks.map(
      ({id, image, artist_name, name, releasedate, audiodownload}) =>
        new SongCard(
          id,
          image,
          artist_name,
          name,
          releasedate,
          audiodownload
        )
    );
    this.searchContainer.clear();
    this.searchContainer.addCards(cards);
    this.container.append(this.searchContainer.element);
  }
  
  render(): HTMLElement {
    const title = this.createHeaderTitle(SearchPage.TextObject.MainTitle);
    this.container.append(title);
    this.renderTracks();
    return this.container;
  }
}