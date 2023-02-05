import "./main.scss";
import { App } from "./app/app";
const Parse = require("parse");

Parse.initialize(
  "fHTtYX3oryuYW1MNXV6nvRxfu2xGoRXPu71vYXWH",
  "9FU5geqK3V3JdIOihqAdnKxdyxiJBiOBI6KdCzuB"
);
Parse.serverURL = "https://parseapi.back4app.com/";

let app = new App();
app.run();




