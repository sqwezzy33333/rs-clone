import { BaseComponent } from "../../../../templates/basecomponent";

export class LikeTrack extends BaseComponent {
  constructor() {
    super("img", "song__like");
    let src: string = "../../assets/images/noLike.svg";
    this.element.setAttribute("src", src);
    this.element.addEventListener("click", function() {
      LikeTrack.click()
       let el = this.getAttribute("src")
        if(el === "../../assets/images/noLike.svg") {
            this.setAttribute("src", "../../assets/images/like.svg");
        } else {
            this.setAttribute("src", "../../assets/images/noLike.svg");
        }
    });
  }

  render() {
    return this.element;
  }

  static click() {
    console.log("Like")
  }
}
