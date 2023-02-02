import { Page } from "../../templates/pages";
const Parse = require("parse");

export class LoginPage extends Page {
  mainBlock = document.createElement("div");
  errorBlock = document.createElement("div");
  registrationSpan = document.createElement("span");
  title = document.createElement("div");
  form = document.createElement("form");

  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper";
    this.title.innerHTML = '<h2 class="h2">Login</h2>';
    this.registrationSpan.innerHTML = `<span class="registration-span">don't have an account? please <a href="#registration" style="color: green;">register</a></span>`;
    this.form.className = "form";
    this.form.action = '#';
    this.form.id = "registr-form";
  }

  protected drowSignInBlock(): HTMLElement {
    this.form.innerHTML = `
      <span class="form-span">Username</span>
      <input name="login" type="text" id="signIn-login" class="form-input" placeholder="login">

      <span class="form-span">Password</span>
      <input name="password" type="password" id="signIn-password" class="form-input" placeholder="password">

      <input type="submit" value="Sign in" id="signIn-form-btn">
    `;
    this.mainBlock.append(this.title);
    this.mainBlock.append(this.form);
    this.mainBlock.append(this.errorBlock)
    this.mainBlock.append(this.registrationSpan);
    return this.mainBlock;
  }

  public render(): HTMLElement {
    const block = this.drowSignInBlock();
    this.container.append(block);

    this.addEvent();
    
    return this.container;
  }

  private async logIn(login?: string, password?: string) {
    let user = Parse.User.logIn(login, password)
      .then(function (user: any) {
        console.log(user.attributes);
      })
      .catch((error: { code: string; message: string }) => {
        if (error instanceof Error) {
          console.log("Error: " + error.code + " " + error.message);
          this.errorBlock.innerHTML = "";
          const errorSpan = document.createElement("span");
          errorSpan.innerHTML = `<span class="error-span">${error.message}</span>`;
          this.errorBlock.append(errorSpan);
        }
      });
  }

  public addEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      let login = formData.get("login") as FormDataEntryValue;
      let password = formData.get("password") as FormDataEntryValue;
      this.logIn(`${login}`, `${password}`);
    });
  }
}
