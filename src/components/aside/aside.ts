import { Component } from "../../templates/components";
import { BaseComponent } from "../../templates/basecomponent";
import { PageIds } from "../../templates/pages";

const Buttons = [
  {
    id: PageIds.MainPage,
    text: "Home",
  },
  {
    id: PageIds.Favorite,
    text: "Favorite",
  },
  {
    id: PageIds.Playlist,
    text: "Playlist",
  },
  {
    id: PageIds.Profile,
    text: "Profile"
  },
  {
    id: PageIds.Categories,
    text: "Categories",
  },
];

export class Aside extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
    const appTitle = new BaseComponent('h1', 'aside__title', 'RS Music');
    this.container.append(appTitle.element);
  }

  renderPageBtns() {
    const navBlock = document.createElement("div");
    navBlock.className = 'nav__wrapper';
    Buttons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`
      btn.innerText = el.text;
      navBlock.append(btn);
    });
    this.container.append(navBlock);
  }

  render(): HTMLElement {
    this.renderPageBtns();
    return this.container;
  }
}
