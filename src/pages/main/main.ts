import { Page } from "../../templates/pages";

export class MainPage extends Page {
  static TextObject = {
    MainTitle: "Main Page",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
