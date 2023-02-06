import { BaseComponent } from "../../templates/basecomponent";

export class LogOut extends BaseComponent{
  constructor() {
    super('div', 'button__logout');
    this.element.innerHTML = `
    <a href="#home"><input type="submit" value="Log Out" id="logOut-form-btn"></a>`
  }

  goToMainPage() {
    this.element.addEventListener('click', () => {
      console.log('logout');
    })
  }
  
  render() {
    this.goToMainPage();
    return this.element;
  }
}