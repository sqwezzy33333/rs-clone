import { Page } from "../../templates/pages";
import { Recomend } from "./recomend/recomendation";

export class HomePage extends Page {
  private readonly recomendContainer: Recomend;

  static TextObject = {
    MainTitle: "Home",
  };

  constructor(id: string) {
    super(id);
    const title = this.createHeaderTitle(HomePage.TextObject.MainTitle);
    //инстанс рекомендаций будет не здесь
    this.recomendContainer = new Recomend();
    this.container.append(title, this.recomendContainer.element);
  }

  renderRecomendContainer(images: string[]) {
      //дописать логику рендера картинок
  }

  render(): HTMLElement {
    return this.container;
  }
}
