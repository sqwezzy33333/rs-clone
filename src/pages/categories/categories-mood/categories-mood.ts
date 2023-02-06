import { Page } from '../../../templates/pages';
import { Aside } from '../../../components/Aside/aside';

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
    
    return this.container;
  }
}
