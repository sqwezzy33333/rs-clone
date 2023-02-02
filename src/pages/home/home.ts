import { Page } from "../../templates/pages";

export class HomePage extends Page {
  static TextObject = {
    MainTitle: "Home",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(HomePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
