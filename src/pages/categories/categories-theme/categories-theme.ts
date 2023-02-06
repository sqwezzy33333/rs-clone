import { Page } from '../../../templates/pages';
import { Aside } from '../../../components/Aside/aside';
import { TagsCategories } from '../components-categories/tag-categories';

export class CategoriesThemePage extends Page {
  static TextObject = {
    MainTitle: 'THEME',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesThemePage.TextObject.MainTitle
    );
    this.container.append(title);
    this.container.append(
      new TagsCategories('tags_genre', 'tags__categories').render('theme')
    );
    return this.container;
  }
}
