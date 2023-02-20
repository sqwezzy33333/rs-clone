import { BaseComponent } from "../../../templates/basecomponent";

export class PlayPlaylist extends BaseComponent {
    constructor() {
        super("div", "play__playlist");
        this.element.innerHTML = `<img src=${"../../assets/images/play-track.svg"}><span>Play</span>`;
    }
}