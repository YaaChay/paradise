import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { EventUtil } from "../utils/EventUtil.js";
import { setMode } from "../config/config.js";
import { Movie } from "../views/movie.js";

var movieContainer = document.getElementById("movieContainer");
var searchQuery = document.getElementById("searchQuery");
var movies = [];
var matchMovies = [];

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
        movies.forEach((e) => {
            var movie = new Movie(e.dateTime, e.mobilePoster);
            movieContainer.appendChild(movie);
        })
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
                movieContainer.innerHTML = "";
                var movie = new Movie(e.dateTime, e.mobilePoster);
                movieContainer.appendChild(movie);
            }
        });
        matchMovies = [];
        if ((searchQuery.value) == "") {
            movieContainer.innerHTML = "";
            fetchAllMovies();
        }
    })
}