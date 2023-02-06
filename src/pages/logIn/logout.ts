import { BaseComponent } from "../../templates/basecomponent";

export class LogOut extends BaseComponent{
  constructor() {
    super('div', 'button__logout');
    this.element.innerHTML = `<input type="submit" value="Log Out" id="logOut-form-btn">`
  }
  
  render() {
    return this.element;
  }
}