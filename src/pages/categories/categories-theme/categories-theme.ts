import { Page } from '../../../templates/pages';
import { Aside } from '../../../components/Aside/aside';

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
    
    return this.container;
  }
}
