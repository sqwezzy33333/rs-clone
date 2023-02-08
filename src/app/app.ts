import { HomePage } from "../pages/home/home";
import { Page } from "../templates/pages";
import { PageIds } from "../templates/pages";
import { Aside } from "../components/Aside/aside";
import { FavoritePage } from "../pages/favorite/favorite";
import { CategoriesPage } from "../pages/categories/categories";
import { PlaylistPage } from "../pages/playlist/playlist";
import { LoginPage } from "../pages/logIn/logIn";
import { RegistrationPage } from "../pages/registration/registrations";
import { ProfilePage } from "../pages/profile/profile";
import { Header } from "../components/header/header";

export class App {
  static container: HTMLElement = document.createElement("div");
  private mainWrapper: HTMLElement = document.createElement("section");
  private homePage: HomePage;
  private aside: Aside;
  private favoritePage: FavoritePage;
  private categoriesPage: CategoriesPage;
  private playlistPage: PlaylistPage;
  private loginPage: LoginPage;
  private registrationPage: RegistrationPage;
  private profilePage: ProfilePage;
  private header: Header;
  private currentUser: string =
    "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser";

  constructor() {
    this.homePage = new HomePage("home-page");
    this.aside = new Aside("aside", "aside");
    this.favoritePage = new FavoritePage("favorite");
    this.categoriesPage = new CategoriesPage("categories");
    this.playlistPage = new PlaylistPage("playlist");
    this.loginPage = new LoginPage("login");
    this.registrationPage = new RegistrationPage("registration");
    this.profilePage = new ProfilePage("profile");
    this.header = new Header();
  }

  fillMainWrapper() {
    if (window.location.hash) {
      this.renderNewPage(window.location.hash.slice(1));
    } else {
      this.mainWrapper.append(this.loginPage.render());
    }
  }

  renderNewPage(idPage: string) {
    this.mainWrapper.innerHTML = "";

    let page: Page | null = null;

    if (idPage === PageIds.MainPage) {
      page = new HomePage(idPage);
    } else if (idPage === PageIds.Favorite) {
      page = new FavoritePage(idPage);
    } else if (idPage === PageIds.Categories) {
      page = new CategoriesPage(idPage);
    } else if (idPage === PageIds.Playlist) {
      page = new PlaylistPage(idPage);
    } else if (idPage === PageIds.Login) {
      page = new LoginPage(idPage);
    } else if (idPage === PageIds.Registration) {
      page = new RegistrationPage(idPage);
    } else if (idPage === PageIds.Profile) {
      page = new ProfilePage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      const header = this.header.render();
      this.mainWrapper.append(header, pageHTML);
    }
  }

  private enableRouteChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash;

      if (location.hash) {
        history.replaceState({}, "", hash);
      }

      this.renderNewPage(hash.slice(1));
    });
  }

  run() {
    App.container.className = "container";

    document.body.append(App.container);
    
    App.container.append(this.aside.render());
    
    this.fillMainWrapper();
    
    this.mainWrapper.className = "main-wrapper";
    
    App.container.append(this.mainWrapper);
    
    this.enableRouteChange();
  }
}
