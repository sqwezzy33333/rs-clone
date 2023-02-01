import { Component } from "../../templates/components";
import { PageIds } from "../../templates/pages";

const Buttons = [
  {
    id: PageIds.MainPage,
    text: "бебра",
  },
  {
    id: PageIds.Favorite,
    text: "favorite",
  },
];

export class Aside extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageBtns() {
    const navBlock = document.createElement("div");
    navBlock.className = 'nav__wrapper';
    Buttons.forEach((el) => {
      const btn = document.createElement("a");
      btn.href = el.id;
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
