import { CookieUtil } from "../utils/CookieUtil.js";

function setMode() {
    if (CookieUtil.getCookie("brightness") == "light") {
        document.body.setAttribute("yc-brightness", "light");
        document.documentElement.style.setProperty("--yc-background-color", "255, 255, 255");
        document.documentElement.style.setProperty("--text-color", "0, 0, 0");
    } else {
        document.body.setAttribute("yc-brightness", "dark");
        document.documentElement.style.setProperty("--yc-background-color", "32, 33, 34");
        document.documentElement.style.setProperty("--text-color", "255, 255, 255");
    }
}

export { setMode };