import { Tag } from "../../../components/tag/tag";

export class TagsCategories {
  protected container: HTMLElement;
  constructor(id: string, className: string) {
    this.container = document.createElement("div");
    this.container.id = id;
    this.container.className = className;
  }

  render(categorie: string) {
    if (categorie === "genre") {
      this.renderTags("genre");
    } else if (categorie === "mood") {
      this.renderTags("mood");
    } else if (categorie === "theme") {
      this.renderTags("theme");
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
}
