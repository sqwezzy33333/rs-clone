import { Page } from "../../templates/pages";
import { UserInfo } from "../../templates/types";
const Parse = require("parse");

export class ProfilePage extends Page {
  mainBlock = document.createElement("div") as HTMLElement;
  errorBlock = document.createElement("div") as HTMLElement;
  title = document.createElement("div") as HTMLElement;
  form = document.createElement("form") as HTMLFormElement;
  logOutBtn = document.createElement("div") as HTMLElement;
  

  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper";

    this.title.className = "userBlock__title-wrap";
    this.title.innerHTML =
      '<h2 class="userBlock__h2" id="spoiler-settings-wrap">Settings <span id="spoiler-settings">∨</span></h2>';

    this.form.className = "form";
    this.form.id = "settings-form";
  }

  public render(): HTMLElement {
    const block = this.drawUserBlock();
    this.container.append(block);
    this.addEventForm();
    this.addEventSettings();
    return this.container;
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

  protected createUserInfo(): HTMLElement {
    const userBlock = document.createElement("div");
    const userInfo: UserInfo | undefined = this.getUserFromLocalStorage();
    console.log(userInfo)

    userBlock.className = "userBlock__wrapper";
    userBlock.innerHTML = `
    <div class="userBlock__user-title"><h2 class="userBlock__h2">Profile</h2></div>
    <div id="profile-flex">
      <div id="profile-img"><img src="assets/images/user.svg"></div>
      <div class="userBlock">
        <div class="userBlock__user-name"><h2>${userInfo?.username}</h2></div>
        <div class="userBlock__user-email"><h2>${userInfo?.email}</h2></div>
        <div class="userBlock__user-tel"><h2>${userInfo?.phone}</h2></div>
      </div>
    </div>
      `;
    return userBlock;
  }

  private addEventForm() {
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

  private addEventSettings() {
    const settingsBtn = this.title.children[0] as HTMLElement;
    const spoiler = settingsBtn.children[0] as HTMLElement;
    settingsBtn.addEventListener("click", () => {
      if (spoiler.textContent === `∨`) {
        this.form.style.display = "flex";
        spoiler.textContent = "∧";
      } else {
        this.form.style.display = "none";
        spoiler.textContent = "∨";
      }
    });
  }
  // private addErrorSpan(error: { message: string }) {
  //   const spanError = document.createElement("span");
  //   this.errorBlock.innerHTML = "";
  //   spanError.innerHTML = `<span class="error-span">${error.message}</span>`;
  //   this.errorBlock.append(spanError);
  // }
}
