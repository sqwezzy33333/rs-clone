import { Page } from "../../templates/pages";

export class SearchPage extends Page {
  static TextObject = {
    MainTitle: "SearchPage",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(SearchPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}