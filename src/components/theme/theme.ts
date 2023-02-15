import { Component } from "../../templates/components";
import { App } from "../../app/app";
import { Player } from "../player/player";

export class Theme extends Component {
  switchTheme: HTMLElement;
  static textSpan = document.createElement("span");
  constructor() {
    super("div", "switch__wrapper");
    this.switchTheme = document.createElement("div");
    this.switchTheme.className = "box-switch";
    Theme.textSpan.className = "light";
    Theme.textSpan.innerHTML = "Light";
  }

  private switching() {
    this.switchTheme.addEventListener("click", () => {
      this.container.classList.toggle("light");
      if (this.container.classList.contains("light")) {
        this.makeDark();
      } else {
        this.makeLigth();
      }
    });
  }

  private makeDark() {
    localStorage.setItem("theme", "dark");
    const aside = App.mainWrapper.previousSibling as HTMLElement;
    const player = Player.playerContainer.element.children[0] as HTMLElement;
    Theme.textSpan.innerHTML = `Dark`;
    document.body.style.background = "black";
    App.mainWrapper.classList.toggle("dark");
    if (aside) aside.classList.toggle("dark");
    player.classList.toggle("dark-player");
    Theme.textSpan.style.border = "1px solid white";
  }

  private makeLigth() {
    localStorage.setItem("theme", "ligth");
    const aside = App.mainWrapper.previousSibling as HTMLElement;
    const player = Player.playerContainer.element.children[0] as HTMLElement;
    Theme.textSpan.innerHTML = `Light`;
    document.body.style.background = "none";
    App.mainWrapper.classList.toggle("dark");
    if (aside) aside.classList.toggle("dark");
    player.classList.toggle("dark-player");
    Theme.textSpan.style.border = "1px solid black";
  }

  public render() {
    this.switching();
    this.switchTheme.innerHTML = `<div class="switch"></div>`;
    this.container.append(this.switchTheme);
    this.container.append(Theme.textSpan);
    return this.container;
  }
}
