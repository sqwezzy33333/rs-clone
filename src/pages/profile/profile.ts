import { Page } from "../../templates/pages";

export class ProfilePage extends Page {
  static TextObject = {
    MainTitle: "Profile Page",
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(ProfilePage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
