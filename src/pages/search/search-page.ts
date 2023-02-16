import { Page } from "../../templates/pages";
import { SearchContainer } from "./search-container";
import { Player } from "../../components/player/player";
import { storeTrackSearch } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";
import { App } from "../../app/app";
// import { Header } from "../../components/header/header";

export class SearchPage extends Page {
  static TextObject = {
    MainTitle: "SearchPage",
  };
  static searchContainer: SearchContainer;
  // private header: Header;
  constructor(id: string) {
    super(id);
    SearchPage.searchContainer = new SearchContainer();
    // this.header = new Header();
  }

  static renderTracks = () => {
    const serachBlock = App.mainWrapper.children[1] as HTMLElement;
    let tracks = storeTrackSearch.tracks;
    Player.getArray(tracks);
    const cards = tracks.map(
      ({ id, image, artist_name, name, releasedate, audiodownload }) =>
        new SongCard(id, image, artist_name, name, releasedate, audiodownload)
    );

    SearchPage.searchContainer.element.innerHTML = "";
    SearchPage.searchContainer.addCards(cards);
    serachBlock.append(SearchPage.searchContainer.element);
  };

  render(): HTMLElement {
    const title = this.createHeaderTitle(SearchPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
