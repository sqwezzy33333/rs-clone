import { Tag } from "../../../components/tag/tag";
import { TextCategories } from "../components-categories/text-categories";

export class TagsCategories {
  protected container: HTMLElement;
  constructor(id: string, className: string) {
    this.container = document.createElement("div");
    this.container.id = id;
    this.container.className = className;
  }

  render(categorie: string) {
    switch (categorie) {
      case "genre":
        this.renderTags("genre");
        this.renderText("genre");
        break;
      case "mood":
        this.renderTags("mood");
        this.renderText("mood");
        break;
      case "theme":
        this.renderTags("theme");
        this.renderText("theme");
        break;
    }
    return this.container;
  }

  renderTags(categorie: string) {
    for (let i = 0; i < 16; i++) {
      this.container.append(
        new Tag(
          `tag_${categorie + i}`,
          "button",
          "tag",
          `${categorie + i}`
        ).render()
      );
    }
  }

  renderText(categorie: string) {
    this.container.append(
      new TextCategories(`text_${categorie}`, "p", "text__categories").render()
    );
  }
}
