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

  render() {
    this.element.append(this.search.element, this.logout.element);
    this.logout.logOut();
    return this.element;
  }
}