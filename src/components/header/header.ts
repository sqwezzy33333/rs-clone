import { BaseComponent } from "../../templates/basecomponent";
import { Search } from "./search/search";
import { LogOut } from "../logout/logout";
import { getSearchTracks } from "../../api/api";
import { Menu } from "./menu/menu";
import { SearchPage } from "../../pages/search/search-page";

export class Header extends BaseComponent {
  private search: Search;
  private logout: LogOut;
  private menu: Menu;
  // public searchPage: SearchPage;

  constructor() {
    super("div", "header");

    this.search = new Search();
    this.logout = new LogOut();
    this.menu = new Menu();
    // this.searchPage = new SearchPage();
  }
  
  getSearchTrack() {
    const searchTrack = this.search.element.querySelector('.search__input') as HTMLInputElement;
    // console.log(searchTrack);
    searchTrack.addEventListener('keyup', async (event) => {
      const target = event.target as HTMLSelectElement;
      const searchString = target.value.toLowerCase();
      await getSearchTracks(searchString);
      SearchPage.renderTracks();
      // this.searchPage.renderTracks();
    })
  }
  
  render() {
    this.element.append(this.menu.element, this.search.element, this.logout.element);
    this.logout.logOut();
    this.menu.openNavMenu();
    this.getSearchTrack();

    return this.element;
  }
}