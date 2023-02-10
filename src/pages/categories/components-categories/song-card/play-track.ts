import { BaseComponent } from "../../../../templates/basecomponent";

export class PlayTrack extends BaseComponent {
  constructor() {
    super("img", "song__btn_play");
    let src: string = "../../assets/images/play-track.svg";
    this.element.setAttribute("src", src);
    this.element.addEventListener("click", function() {
        PlayTrack.click()
       let el = this.getAttribute("src")
        if(el === "../../assets/images/play-track.svg") {
            this.setAttribute("src", "../../assets/images/Pause_Button.svg");
        } else {
            this.setAttribute("src", "../../assets/images/play-track.svg");
        }
    });
  }

  render() {
    return this.element;
  }

  static click() {
    console.log("Play");
  }
}