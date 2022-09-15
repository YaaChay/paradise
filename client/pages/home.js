import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { CookieUtil } from "../utils/CookieUtil.js";
import { ThemeUtil } from "../utils/ThemeUtil.js";
import { EventUtil } from "../utils/EventUtil.js";
import { setMode } from "../config/config.js";
import { Movie } from "../views/movie.js";
import { MovieContainer } from "../views/movieContainer.js";
import { getTime } from "../utils/timeUtil.js";

var menuBtn = document.getElementById("menuBtn");
var modeBtn = document.getElementById("modeBtn");
var historyBtn = document.getElementById("historyBtn");
var drawerModeBtn = document.getElementById("drawerModeBtn");
var drawer = document.getElementById("drawer");
var container = document.getElementById("container");
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var menu3 = document.getElementById("menu3");
var menu4 = document.getElementById("menu4");
var movieBox1 = document.getElementById("movieBox1");
var movieBox2 = document.getElementById("movieBox2");
var movieContainer = document.getElementById("movieContainer");
var movies = [];

var drawerShow = false;

EventUtil.addHandler(window, "load", setMode());


const firebaseConfig = {
    apiKey: "AIzaSyDmbMp1PzpwAml5Y6hsDthn9UB1zbSxmzM",
    authDomain: "paradise-cinema6.firebaseapp.com",
    projectId: "paradise-cinema6",
    storageBucket: "paradise-cinema6.appspot.com",
    messagingSenderId: "257835920517",
    appId: "1:257835920517:web:22524f843abfb608a00dec",
    measurementId: "G-GG7JS0QC78"
};

initializeApp(firebaseConfig);

const db = getFirestore();

fetchAllMovies();
async function fetchAllMovies() {
    const coll = collection(db, "Movies");

    onSnapshot(coll, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            movies.push(doc.data());
        });
        for (var i = movies.length - 8; i < movies.length - 4; i++) {
            var movie = new MovieContainer(movies[i].dateTime, movies[i].mobilePoster, getTime(movies[i].dateTime));
            movieBox1.appendChild(movie);
        }
        for (var i = movies.length - 4; i < movies.length; i++) {
            var movie = new MovieContainer(movies[i].dateTime, movies[i].mobilePoster, getTime(movies[i].dateTime));
            movieBox2.appendChild(movie);
        }
        for (var i = 0 ; i < 14; i++) {
            var movie = new Movie(movies[i].dateTime, movies[i].mobilePoster);
            movieContainer.appendChild(movie);
        }
        return movies;
    })
}

menuBtn.onclick = () => {
    if (!drawerShow) {
        drawerShow = true;
        drawer.style.display = "block";
        container.style.display = "none";
    } else {
        drawerShow = false;
        drawer.style.display = "none";
        container.style.display = "block";
    }
};

menu1.onclick = hideDrawer;
menu2.onclick = hideDrawer;
menu3.onclick = hideDrawer;
menu4.onclick = hideDrawer;

function hideDrawer() {
    drawerShow = false;
    drawer.style.display = "none";
    container.style.display = "block";
}

modeBtn.onclick = () => {
    if (!CookieUtil.getCookie("brightness")) {
        ThemeUtil.lightTheme();
        setMode();
        hideDrawer();
    } else {
        ThemeUtil.darkTheme();
        setMode();
        hideDrawer();
    }
}

historyBtn.onclick = () => {
    window.open("./tickethistory.html", "_self");
}

drawerModeBtn.onclick = () => {
    if (!CookieUtil.getCookie("brightness")) {
        ThemeUtil.lightTheme();
        setMode();
        hideDrawer();
    } else {
        ThemeUtil.darkTheme();
        setMode();
        hideDrawer();
    }
}