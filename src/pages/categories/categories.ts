import { Page } from "../../templates/pages";
import { CategoriesGenrePage } from "./categories-genre/categories-genre";

export class CategoriesPage extends Page {

  static TextObject = {
    MainTitle: "Categories Page",
  };

  constructor(id: string) {
    super(id);
  }


  render(): HTMLElement {
    // const title = this.createHeaderTitle(CategoriesPage.TextObject.MainTitle);
    // this.container.append(title);
    this.container.append((new CategoriesGenrePage("genre")).render());
    return this.container;
  }
}
