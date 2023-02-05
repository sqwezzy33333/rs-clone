export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tagName: keyof HTMLElementTagNameMap = 'div',className: string, innerText?: string) {
    this.element = document.createElement(tagName);
    this.element.className = className;
    if (innerText) {
      this.element.innerText = innerText;
    }
  }
}
