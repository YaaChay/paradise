import { CookieUtil } from "../utils/CookieUtil.js";

var ThemeUtil = {
    darkTheme: function () {
        CookieUtil.removeCookie("brightness");
    },
    lightTheme: function () {
        CookieUtil.setCookie("brightness", "light", 30);
    }
}

export { ThemeUtil };