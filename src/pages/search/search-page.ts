import { Page } from "../../templates/pages";
import { SearchContainer } from "./search-container";
import { Player } from "../../components/player/player";
import { storeTrackSearch } from "../../api/api";
import { SongCard } from "../categories/components-categories/song-card/song-card";
// import { Header } from "../../components/header/header";

export class SearchPage extends Page {
  static TextObject = {
    MainTitle: "SearchPage",
  };
   searchContainer: SearchContainer;
  // private header: Header;

  constructor(id: string) {
    super(id);

   this.searchContainer = new SearchContainer();
    // this.header = new Header();
  }

  public static renderTracks() {
    let tracks = storeTrackSearch.tracks;
    console.log(tracks)
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
    const searchContainer = new SearchContainer();
    searchContainer.addCards(cards);
    console.log(searchContainer)
      // this.searchContainer.addCards(cards);
return searchContainer.addCards(cards);
  // this.container.append(searchContainer);
  }
  
  render(): HTMLElement {
    const title = this.createHeaderTitle(SearchPage.TextObject.MainTitle);
    this.container.append(title);
    // this.container.append(SearchPage.renderTracks);
    // this.renderTracks();
    return this.container;
  }
}