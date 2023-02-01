import { Page } from "../../templates/pages";

export class FavoritePage extends Page {
  static TextObject = {
    MainTitle: "Favorive Page",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(FavoritePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
