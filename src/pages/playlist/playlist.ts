import { Page } from "../../templates/pages";

export class PlaylistPage extends Page {
  static TextObject = {
    MainTitle: "Playlist Page",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(PlaylistPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
