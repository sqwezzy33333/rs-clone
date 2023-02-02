import { Page } from "../../templates/pages";
const Parse = require("parse");

export class ProfilePage extends Page {
  mainBlock = document.createElement("div");
  errorBlock = document.createElement("div");
  title = document.createElement("div");
  form = document.createElement("form");
  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper";
    this.title.innerHTML = '<h2 class="h2">Settings</h2>';
    this.form.className = "form";
    this.form.id = "settings-form";
  }

  protected drawUserBlock(): HTMLElement {
    this.mainBlock.append(this.createUserInfo());
    this.mainBlock.append(this.title);
    this.mainBlock.append(this.createForm());

    return this.mainBlock;
  }

  protected createForm(): HTMLElement {
    this.form.innerHTML = `
    <span class="form-span">Change Username</span>
    <input name="username" type="text" id="settings-login" class="form-input" placeholder="Username">

    <span class="form-span">Change Password</span>
    <input name="password" type="password" id="settings-password" class="form-input" placeholder="password">

    <span class="form-span">Confirm Password</span>
    <input name="confirm-password" type="password" id="settings-confirm" class="form-input" placeholder="password">

    <span class="form-span">Change Phone Number</span>
    <input name="phone" type="tel" id="settings-number" class="form-input" placeholder="phone number">

    <input type="submit" value="Update" id="settings-form-btn">
    `;
    return this.form;
  }

  protected createUserInfo(Object?: any): HTMLElement {
    const userBlock = document.createElement("div");
    userBlock.className = "userBlock__wrapper";
    userBlock.innerHTML = `
    <div class="userBlock__user-title"><h2 class="userBlock__h2">Profile</h2></div>
    <div id="profile-flex">
      <div id="profile-img"><img src="assets/images/user.svg"></div>
      <div class="userBlock">
        <div class="userBlock__user-name"><h2>Example</h2></div>
        <div class="userBlock__user-email"><h2>example@mail.ru</h2></div>
        <div class="userBlock__user-tel"><h2>+375295445558877</h2></div>
      </div>
    </div>
      `;
    return userBlock;
  }

  public render(): HTMLElement {
    const block = this.drawUserBlock();
    this.container.append(block);
    this.addEvent();
    return this.container;
  }

  private addErrorSpan(error: { message: string }) {
    const spanError = document.createElement("span");
    this.errorBlock.innerHTML = "";
    spanError.innerHTML = `<span class="error-span">${error.message}</span>`;
    this.errorBlock.append(spanError);
  }

  public addEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(this.form);

      const userObject = {
        email: `${formData.get("email") as FormDataEntryValue}`,
        username: `${formData.get("username") as FormDataEntryValue}`,
        password: `${formData.get("password") as FormDataEntryValue}`,
        confirmPass: `${
          formData.get("confirm-password") as FormDataEntryValue
        }`,
        phone: Number(formData.get("phone") as FormDataEntryValue),
      };
    });
  }
}
