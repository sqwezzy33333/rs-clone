import { Page } from "../../../templates/pages";


export class PlaylistTrack extends Page {
    static TextObject = {
        MainTitle: "Playlist Tracks",
      };

      constructor(id: string) {
        super(id);
      }

      render(){
        const title = this.createHeaderTitle(PlaylistTrack.TextObject.MainTitle);
    this.container.append(title);
          return this.container;
      }
}