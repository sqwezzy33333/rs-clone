import { getArtistTracks } from "../../api/api";
import { Page } from "../../templates/pages";
import { CardTrack } from "./recomend/card-track";
import { Recomend } from "./recomend/recomendation";

export class HomePage extends Page {
  private readonly recomendContainer: Recomend;

  static TextObject = {
    MainTitle: "Home",
  };

  constructor(id: string) {
    super(id);
    const title = this.createHeaderTitle(HomePage.TextObject.MainTitle);
    const recTitle = this.createHeaderTitle('Recomended for you');
    this.recomendContainer = new Recomend();
    this.container.append(title,recTitle, this.recomendContainer.element);
  }

  async getInfo() {
    const data = await getArtistTracks('LITTLE SUSPICIONS', 'byName');
    const {
      results: [
        {
          id,
          name: artistName,
          image,
          tracks,
        },
      ],
    } = data;
    console.log(image);
    this.newRecomendation([image, image, image]);
  }

  newRecomendation(images: string[]) {
      //дописать логику рендера картинок
      const cards = images.map((url) => new CardTrack(url,'Artist Name', 'Track Name',['tag','tag','tag']));
      this.recomendContainer.addCardsTracks(cards);
  }

  render(): HTMLElement {
    this.getInfo();
    return this.container;
  }
}
