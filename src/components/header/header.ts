import { BaseComponent } from "../../templates/basecomponent";
import { Search } from "./search/search";
import { LogOut } from "../../pages/logIn/logout";

export class Header extends BaseComponent {
  private search: Search;
  private logout: LogOut;
  constructor() {
    super('div', 'header')

    this.search = new Search();
    this.logout = new LogOut();
  }

  render() {
    this.element.append(this.search.element, this.logout.element);
    return this.element;
  }

}