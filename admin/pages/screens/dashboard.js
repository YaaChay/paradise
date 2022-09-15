import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { Movie } from "../../views/movie.js";
import { sessionStorageUtil } from "../../utils/sessionStorageUtil.js";

var addBtn = document.getElementById("addBtn");
var totalMovies = document.getElementById("totalMovies");
var totalViews = document.getElementById("totalViews");
var movieContainer1 = document.getElementById("movieContainer1");
var movieContainer2 = document.getElementById("movieContainer2");
var searchQuery = document.getElementById("searchQuery");
var movies = [];
var totalview = [];
var matchMovies = [];

window.onload = () => {
    fetchAllMovies();
    sessionStorageUtil.setItem("currentScreen", 1);
}

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

async function fetchAllMovies() {
    const coll = collection(db, "Movies");

    onSnapshot(coll, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            movies.push(doc.data());
            totalMovies.innerHTML = movies.length;
            movieContainer1.innerHTML = "";
            movieContainer2.innerHTML = "";
        });
        movies.forEach((e) => {
            var movie = new Movie(e.dateTime, e.mobilePoster);
            movieContainer2.appendChild(movie);
            console.log(e.unavailableSeats);
            if (e.unavailableSeats != "") {
                totalview.concat(e.unavailableSeats);
            }
            totalview.concat(totalview);
            console.log(totalview);
            totalViews.innerText = totalview.length;
        })
        for (var i = movies.length - 8; i < movies.length; i++) {
            var movie = new Movie(movies[i].dateTime, movies[i].mobilePoster);
            movieContainer1.appendChild(movie);
        }
        movies = [];
    })
}
searchQuery.onkeyup = () => { searchMovie(); };

async function searchMovie() {
    const coll = collection(db, "Movies");

    onSnapshot(coll, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            matchMovies.push(doc.data());
        });
        matchMovies.forEach((e) => {
            if ((searchQuery.value).toLowerCase() == (e.movieName).toLowerCase()) {
                movieContainer2.innerHTML = "";
                var movie = new Movie(e.dateTime, e.mobilePoster);
                movieContainer2.appendChild(movie);
            }
        });
        matchMovies = [];
        if ((searchQuery.value) == "") {
            fetchAllMovies();
        }
    })
}

addBtn.onclick = () =>{
    sessionStorageUtil.removeItem("editId");
    window.open("../addmovie.html", "_self")
}
