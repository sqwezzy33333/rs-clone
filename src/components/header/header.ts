import { BaseComponent } from "../../templates/basecomponent";
import { Search } from "./search/search";
import { LogOut } from "../logout/logout";
import { getSearchTracks } from "../../api/api";
import { SearchPage } from "../../pages/search/search-page";
import { Menu } from "./menu/menu";


export class Header extends BaseComponent {
  private search: Search;
  private logout: LogOut;
  private searchPage: SearchPage;
  private menu: Menu;

  constructor() {
    super("div", "header");

    this.search = new Search();
    this.logout = new LogOut();
    this.searchPage = new SearchPage('search');
    this.menu = new Menu();
  }
  
  getSearchTrack() {
    const searchTrack = this.search.element.querySelector('.search__input') as HTMLInputElement;
    console.log(searchTrack);
    searchTrack.addEventListener('keyup', async (event) => {
      const target = event.target as HTMLSelectElement;
      const searchString = target.value.toLowerCase();
      await getSearchTracks(searchString);
      this.searchPage.renderTracks();
    })
  }

  // stickyNav() {
  //   const sticky = this.element.offsetTop;
  //   const test = this.element;

  //   window.onscroll = function() {
  //     if (window.pageYOffset >= sticky) {
  //       test.classList.add('sticky')
  //     } else {
  //       test.classList.remove('sticky');
  //     }
  //   };
  // }
  
  render() {
    this.element.append(this.menu.element, this.search.element, this.logout.element);
    this.logout.logOut();
    this.menu.openNavMenu();
    this.getSearchTrack();

    return this.element;
  }
}