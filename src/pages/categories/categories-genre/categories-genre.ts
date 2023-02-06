import { Page } from '../../../templates/pages';
import { Aside } from '../../../components/Aside/aside';

export class CategoriesGenrePage extends Page {
  static TextObject = {
    MainTitle: 'GENRE',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    Aside.renderCategoriesBtns(true);
    const title = this.createHeaderTitle(
      CategoriesGenrePage.TextObject.MainTitle
    );
    this.container.append(title);
    
    return this.container;
  }
}
