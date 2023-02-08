import { Component } from "../../templates/components";
import { BaseComponent } from "../../templates/basecomponent";
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
    text: "Playlist",
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

const CategoriesButtons = [
  {
    id: PageIds.CategoriesGenre,
    text: "genre",
  },
  {
    id: PageIds.CategoriesMood,
    text: "mood",
  },
  {
    id: PageIds.CategoriesTheme,
    text: "theme",
  },
];

export class Aside extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
    const appTitle = new BaseComponent("h1", "aside__title", "RS Music");
    this.container.append(appTitle.element);
  }

  renderPageBtns() {
    const navBlock = document.createElement("div");
    const navCategoriesBlock = document.createElement("div");
    navCategoriesBlock.id = "nav__categories";
    navBlock.className = "nav__wrapper";
    Buttons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`;
      btn.id = `aside-${el.text}`;
      btn.innerText = el.text;
      navBlock.append(btn);
    });
    CategoriesButtons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = `#${el.id}`;
      btn.id = `aside-${el.text}`;
      btn.innerText = `• ${el.text}`;
      btn.className = "categorie_name";
      navCategoriesBlock.append(btn);
    });
    navBlock.append(navCategoriesBlock);
    this.container.append(navBlock);
  }

  render(): HTMLElement {
    this.renderPageBtns();
    return this.container;
  }

  static renderCategoriesBtns(flag: boolean) {
    const navCategories = document.getElementById("nav__categories");

    if (flag) {
      navCategories!.style.display = "flex";
    } else {
      navCategories!.style.display = "none";
    }
  }
}
