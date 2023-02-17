import { Page } from "../../templates/pages";
import { BlockPlaylist } from "./block-playlist";

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
    this.container.append(new BlockPlaylist().render());
    return this.container;
  }
}
