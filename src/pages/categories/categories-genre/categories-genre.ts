import { Page } from "../../../templates/pages";
import { Aside } from "../../../components/Aside/aside";
import { TagsCategories } from "../components-categories/tag-categories";

export class CategoriesGenrePage extends Page {
  static TextObject = {
    MainTitle: "GENRE",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesGenrePage.TextObject.MainTitle
    );
    this.container.append(title);
    this.container.append(
      new TagsCategories("tags_genre", "tags__categories").render("genre")
    );
    return this.container;
  }
}
