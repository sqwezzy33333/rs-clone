import { Page } from "../../templates/pages";
const Parse = require("parse");

export class LoginPage extends Page {
  mainBlock = document.createElement("div");
  errorBlock = document.createElement('div');
  constructor(id: string) {
    super(id);
  }

  protected drowSignInBlock(): HTMLElement {
    this.mainBlock = document.createElement("div");
    this.mainBlock.className = "profile-wrapper";
    this.mainBlock.innerHTML = `
    <h2 id="h2">Login</h2>
    <form class="form" action="#" id="signInForm">
      <span class="form-span">Username</span>
      <input name="login" type="text" id="signIn-login" class="form-input" placeholder="login">

      <span class="form-span">Password</span>
      <input name="password" type="password" id="signIn-password" class="form-input" placeholder="password">

      <input type="submit" value="Sign in" id="signIn-form-btn">
    </form>
    <span class="registration-span">don't have an account? please <a href="#registration" style="color: green;">register</a></span>
    `;
    this.mainBlock.append(this.errorBlock);
    return this.mainBlock;
  }

  render(): HTMLElement {
    const block = this.drowSignInBlock();
    this.container.append(block);
    return this.container;
  }

  async logIn(login?: string, password?: string) {
    let user = Parse.User.logIn(login, password)
      .then(function (user: any) {
        console.log(user.attributes);
      })
      .catch((error: { code: string; message: string }) => {
        if (error instanceof Error) {
          console.log("Error: " + error.code + " " + error.message);
          this.errorBlock.innerHTML = '';
          const errorSpan = document.createElement("span");
          errorSpan.innerHTML = `<span class="error-span">${error.message}</span>`;
          this.errorBlock.append(errorSpan);
        }
      });
  }

  addevent() {
    const form = document.getElementById("signInForm") as HTMLFormElement;
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      let login = formData.get("login") as FormDataEntryValue;
      let password = formData.get("password") as FormDataEntryValue;
      this.logIn(`${login}`, `${password}`);
    });
  }
}
