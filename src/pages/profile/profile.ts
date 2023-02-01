import { Page } from "../../templates/pages";
const Parse = require("parse");

export class ProfilePage extends Page {
  constructor(id: string) {
    super(id);
  }

  protected drowSignInBlock(): HTMLElement {
    const mainBlock = document.createElement("div");
    mainBlock.className = "profile-wrapper";
    mainBlock.innerHTML = `
    <h2 id="h2">Login</h2>
    <form class="form" action="#" id="signInForm">
      <span class="form-span">Username</span>
      <input name="login" type="text" id="login" class="form-input" placeholder="login">
      <span class="form-span">Password</span>
      <input name="password" type="password" id="password" class="form-input" placeholder="password">
      <input type="submit" value="Sign ip" id="form-btn">
    </form>
    <span class="registration-span">don't have an account? please <a href="" style="color: green;">register</a></span>
    `;
    return mainBlock;
  }

  render(): HTMLElement {
    const title = this.drowSignInBlock();
    this.container.append(title);
    return this.container;
  }

  async logIn(login?: string, password?: string) {
    let user = Parse.User.logIn(login, password)
      .then(function (user: any) {
        console.log(user.attributes);
      })
      .catch(function (error: { code: string; message: string }) {
        console.log("Error: " + error.code + " " + error.message);
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
