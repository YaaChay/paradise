import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";

var loginBtn = document.getElementById("loginBtn");

window.onload = () => {
    checkState();
}

function checkState() {
    if (sessionStorageUtil.getItem("an")) {
        if (sessionStorageUtil.getItem("an") == "paradise" && sessionStorageUtil.getItem("pw") == "password") {
            window.open("./home.html", "_self");
        } else {
            adminName.value = "";
            password.value = "";
        }
    };
}

function saveLoginInfog() {
    sessionStorageUtil.setItem("an", adminName.value);
    sessionStorageUtil.setItem("pw", password.value);
}
loginBtn.onclick = () => {
    var adminName = document.getElementById("adminName");
    var password = document.getElementById("password");
    if (adminName.value == "paradise" && password.value == "password") {
        saveLoginInfog();
        window.open("./home.html", "_self");
    } else {
        alert("Login Failed");
    }
}