import { BaseComponent } from "../../templates/basecomponent";

export class Search extends BaseComponent {
  constructor() {
    super('div', 'search__container')
    this.element.innerHTML = `
    <div class="search">
      <input type="checkbox" id="trigger" class="search__checkbox" />
      <label class="search__label-init" for="trigger"></label>
      <label class="search__label-active" for="trigger"></label>
      <div class="search__border"></div>
      <input type="text" class="search__input" />
      <div class="search__close"></div>
  </div>`
  }
  
  render() {
    return this.element;
  }
}