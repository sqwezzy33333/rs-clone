import { Page } from "../../templates/pages";

export class CategoriesPage extends Page {
  static TextObject = {
    MainTitle: "Categories Page",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(CategoriesPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
