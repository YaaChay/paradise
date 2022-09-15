import { EventUtil } from "./utils/EventUtil.js";
import { CookieUtil } from "./utils/CookieUtil.js";
import { setMode } from "./config/config.js";

var logoWhite = document.getElementById("logoWhite");
var logoBlack = document.getElementById("logoBlack");

EventUtil.addHandler(window, "load", setMode());
if (CookieUtil.getCookie("brightness")) {
    logoWhite.style.display = "none";
    logoBlack.style.display = "block";
}
setInterval(function () {
    window.open("./pages/home.html", "_self")
}, 6000);