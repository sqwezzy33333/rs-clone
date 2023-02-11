import { BaseComponent } from "../../../../templates/basecomponent";
import { getTracks } from "../../../../api/api";
import { storeTracks } from "../../../../api/api";
import { Player } from "../../../../components/player/player";

export class PlayTrack extends BaseComponent {
  constructor(id: string) {
    super("img", "song__btn_play");
    this.element.id = id;
    let src: string = "../../assets/images/play-track.svg";
    this.element.setAttribute("src", src);
    this.element.addEventListener("click", function () {
      PlayTrack.click(id);
      let el = this.getAttribute("src");
      if (el === "../../assets/images/play-track.svg") {
        this.setAttribute("src", "../../assets/images/Pause_Button.svg");
      } else {
        this.setAttribute("src", "../../assets/images/play-track.svg");
      }
    });
  }

  render() {
    return this.element;
  }

  static async click(id: string) {
    console.log(id);
    storeTracks.trackId = Number(id);
    let dataForPlay = await getTracks([storeTracks.trackId]);
    console.log(dataForPlay);
    Player.startTrack(dataForPlay.results, id);
    localStorage.setItem("currentTrackUrl", storeTracks.audio);
  }
}
