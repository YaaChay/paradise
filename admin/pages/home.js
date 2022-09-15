import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";

var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tab3 = document.getElementById("tab3");
var pageView = document.getElementById("pageView");
var currentTab = sessionStorageUtil.getItem("currentTab");
var currentScreen = sessionStorageUtil.getItem("currentScreen");

window.onload = () => {
    checkState();
    if (currentTab) {
        if (currentTab == 1) {
            showDashboard();
            if(currentScreen == 3){
                pageView.setAttribute("src", "./addmovie.html");
            } else if(currentScreen == 4){
                pageView.setAttribute("src", "./movieview.html");
            }
        }
        else if (currentTab == 2) {
            showCustomer();
        } else {
            showRanking();
        }
    } else {
        showDashboard();
    }
};

function checkState() {
    if (sessionStorageUtil.getItem("an")) {
        if (sessionStorageUtil.getItem("an") == "paradise" && sessionStorageUtil.getItem("pw") == "password") {
            return;
        } else {
            window.open("./login.html", "_self");
        }
    } else {
        window.open("./login.html", "_self");
    }
}

function showDashboard() {
    if (!tab1.classList.contains("actived")) {
        tab1.classList.add("actived");
        tab2.classList.remove("actived");
        tab3.classList.remove("actived");
        pageView.setAttribute("src", "./screens/dashboard.html");
        sessionStorageUtil.setItem("currentTab", 1);
        sessionStorageUtil.setItem("currentScreen", 1);
    }
}

function showCustomer() {
    if (!tab2.classList.contains("actived")) {
        tab1.classList.remove("actived");
        tab2.classList.add("actived");
        tab3.classList.remove("actived");
        pageView.setAttribute("src", "./screens/customer.html");
        sessionStorageUtil.setItem("currentTab", 2);
        sessionStorageUtil.setItem("currentScreen", 2);
    }
}

function showRanking() {
    if (!tab3.classList.contains("actived")) {
        tab1.classList.remove("actived");
        tab2.classList.remove("actived");
        tab3.classList.add("actived");
        pageView.setAttribute("src", "./screens/ranking.html");
        sessionStorageUtil.setItem("currentTab", 3);
        sessionStorageUtil.setItem("currentScreen", 3);
    }
}
tab1.addEventListener("click", showDashboard);
tab2.addEventListener("click", showCustomer);
tab3.addEventListener("click", showRanking);