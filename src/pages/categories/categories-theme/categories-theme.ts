import { Page } from "../../../templates/pages";
import { Aside } from "../../../components/Aside/aside";
import { TagsCategories } from "../components-categories/tag-categories";
import { SongCard } from "../components-categories/song-card/song-card";
import { RecomendCategorie } from "../components-categories/song-card/recomend-categories";
import { getTracksByTag } from "../../../api/api";
import { storeTrackCategorie } from "../../../api/api";

export class CategoriesThemePage extends Page {
  private readonly recomendCategorieContainer: RecomendCategorie;
  tagsCateg: TagsCategories;

  static TextObject = {
    MainTitle: "THEME",
  };

  constructor(id: string) {
    super(id);
    this.recomendCategorieContainer = new RecomendCategorie();
    this.tagsCateg = new TagsCategories("tags_theme", "tags__categories");
    this.container.addEventListener("click", (e) => {
      TagsCategories.changeColorBorderTag("theme");
      if ((<HTMLInputElement>e.target).classList.contains("tag")) {
        (<HTMLInputElement>e.target).style.border = `2px solid black`;
        let arrGenre = [];
        arrGenre.push((<HTMLInputElement>e.target).innerText);
        this.getRecomendationGenre(arrGenre);
      }
    });
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesThemePage.TextObject.MainTitle
    );
    this.container.append(title);
    this.container.append(this.tagsCateg.render("theme"));
    this.getRecomendationGenre(["Music for Vlog"]);
    this.container.append(this.recomendCategorieContainer.element);
    return this.container;
  }

  async getRecomendationGenre(categ: string[]) {
    const data = await getTracksByTag(categ, 12);
    this.newRecomendation(categ);
  }

  newRecomendation(categ: string[]) {
    let tracks = storeTrackCategorie.tracks;
    const cards = tracks.map(
      (el) =>
        new SongCard(el.id, el.image, el.artist_name, el.name, el.releasedate)
    );
    this.recomendCategorieContainer.clear();
    this.recomendCategorieContainer.addCards(cards, categ);
  }
}
