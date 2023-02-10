import { BaseComponent } from "../../../../templates/basecomponent";
import { CategoriesGenrePage } from "../../categories-genre/categories-genre";

export class DownloadTrack extends BaseComponent {
  constructor() {
    super("img", "song__btn_play");
    let src: string = "../../assets/images/download-track.svg";
    this.element.setAttribute("src", src);
    this.element.addEventListener("click", function() {
        DownloadTrack.click()
    });
}

  render() {
    return this.element;
  }

  static click() {
    console.log("Download");
  }
}