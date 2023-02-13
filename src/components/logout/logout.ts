import { BaseComponent } from "../../templates/basecomponent";

export class LogOut extends BaseComponent {
  constructor() {
    super("div", "button__logout");
    this.element.innerHTML = `
    <a href="#home"><input type="submit" value="Log Out" id="logOut-form-btn"></a>`;
  }

  render() {
    return this.element;
  }

  public logOut() {
    const asideProfileBtn = document.getElementById(
      "aside-Profile"
    ) as HTMLLinkElement;
    this.element.addEventListener("click", (e) => {
      e.preventDefault();

      window.location.hash = "#login";
      localStorage.removeItem(
        "Parse/fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH/currentUser"
      );
      asideProfileBtn.href = "#login";
    });
  }
}
