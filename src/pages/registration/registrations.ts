import { Page } from "../../templates/pages";
const Parse = require("parse");

export class RegistrationPage extends Page {
  mainBlock = document.createElement("div");
  errorBlock = document.createElement("div");
  registrationSpan = document.createElement("span");
  title = document.createElement("div");
  form = document.createElement("form");
  constructor(id: string) {
    super(id);
    this.mainBlock.className = "profile-wrapper"; 
    this.title.innerHTML = '<h2 class="h2">Registration</h2>'
    this.registrationSpan.innerHTML = `<span class="registration-span">have an account? <a href="#login" style="color: green;">please Login</a></span>`;
    this.form.className = "form";
    this.form.id = "registr-form";
  }

  protected drawRegistrationBlock(): HTMLElement {
    this.form.innerHTML = `
    <span class="form-span">Email</span>
    <input name="email" type="text" id="registr-email" class="form-input" placeholder="login">

    <span class="form-span">Username</span>
    <input name="login" type="text" id="registr-login" class="form-input" placeholder="login">

    <span class="form-span">Password</span>
    <input name="password" type="password" id="registr-password" class="form-input" placeholder="password">

    <span class="form-span">Confirm Password</span>
    <input name="password" type="password" id="registr-confirm" class="form-input" placeholder="password">

    <span class="form-span">Change Phone Number</span>
    <input name="password" type="tel" id="registr-number" class="form-input" placeholder="phone number">

    <input type="submit" value="Sign in" id="regist-form-btn">
    `
    this.mainBlock.append(this.title);
    this.mainBlock.append(this.form)
    this.mainBlock.append(this.registrationSpan);

    return this.mainBlock;
  }

  public render(): HTMLElement {
    const block = this.drawRegistrationBlock();
    this.container.append(block);
    return this.container;
  }

  public addEvent() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(this.form);
      let login = formData.get("login") as FormDataEntryValue;
      let password = formData.get("password") as FormDataEntryValue;
      console.log(login, password)
    });
  }
}
