import { MainPage } from "../main/main";
import { Page } from "../../templates/pages";
import { PageIds } from "../../templates/pages";
import { Aside } from "../../components/Aside/aside";
import { FavoritePage } from "../favorite/favorite";

export class App {
  static container: HTMLElement = document.body;
  private mainWrapper: HTMLElement = document.createElement("section");
  private initialPage: MainPage;
  private aside: Aside;
  private favoritePage: FavoritePage;

  constructor() {
    this.initialPage = new MainPage("main-page");
    this.aside = new Aside("aside", "aside");
    this.favoritePage = new FavoritePage("favorite");
  }

  fillMainWrapper() {
    this.mainWrapper.append(this.initialPage.render());
  }

  renderNewPage(idPage: string) {
    this.mainWrapper.innerHTML = "";
    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.Favorite) {
      page = new FavoritePage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      this.mainWrapper.append(pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPage(hash);
    });
  }

  run() {
    App.container.append(this.aside.render());
    this.fillMainWrapper();
    App.container.append(this.mainWrapper);
    this.enableRouteChange();
  }
}
