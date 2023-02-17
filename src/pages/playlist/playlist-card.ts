import { BaseComponent } from "../../templates/basecomponent";
import { PlaylistImg } from "./playlist-image";


export class PlaylistCard extends BaseComponent {
    constructor(id: string, src: string, name: string, count: number) {
        super("div", "playlist__card")
        this.element.append((new PlaylistImg(id, src)).render());
        this.element.append(new BaseComponent("div", "playlist__name", `${name}`).element);
        this.element.append(new BaseComponent("div", "playlist__count", `Tracks ${count}`).element);
        // this.element.innerHTML = `<div>${name}</div><div>${count}</div>`
    }

}