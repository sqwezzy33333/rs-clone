import { Page } from '../../../templates/pages';
import { Aside } from '../../../components/Aside/aside';
import { TagsCategories } from '../components-categories/tag-categories';

export class CategoriesMoodPage extends Page {
  static TextObject = {
    MainTitle: 'MOOD',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesMoodPage.TextObject.MainTitle
    );
    this.container.append(title);
    this.container.append(
      new TagsCategories('tags_mood', 'tags__categories').render('mood')
    );
    return this.container;
  }
}
