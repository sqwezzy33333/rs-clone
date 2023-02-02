import { Component } from "../../templates/components";
import { PageIds } from "../../templates/pages";

function changeHash() {
  if (
    localStorage.getItem(
      "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
    )
  ) {
    return "profile";
  } else {
    return "login";
  }
}

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
    text: "Playlist"
  },
  {
    id: changeHash(),
    text: "Profile",
  },
  {
    id: PageIds.Categories,
    text: "Categories",
  },
];

export class Aside extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageBtns() {
    const navBlock = document.createElement("div");
    navBlock.className = "nav__wrapper";
    Buttons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`;
      btn.id = `aside-${el.text}`
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
