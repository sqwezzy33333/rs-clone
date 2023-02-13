import { BaseComponent } from "../../templates/basecomponent";
import { Search } from "./search/search";
import { LogOut } from "../logout/logout";

export class Header extends BaseComponent {
  private search: Search;
  private logout: LogOut;
  constructor() {
    super("div", "header");

    this.search = new Search();
    this.logout = new LogOut();
  }

  getSearchTrack() {
    const searchTrack = this.search.element.querySelector('.search__input') as HTMLInputElement;
    searchTrack.addEventListener('keyup', (event) => {
      const target = event.target as HTMLSelectElement;
      const searchString = target.value.toLowerCase();
      console.log(searchString);
    })
  }

  render() {
    this.element.append(this.search.element, this.logout.element);
    this.logout.logOut();
    this.getSearchTrack();
    return this.element;
  }
}