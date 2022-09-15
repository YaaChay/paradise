import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";
import { createMovie } from "../utils/firestoreUtil.js";
import { Movie } from "../models/movie.js";
import { format1 } from "../utils/timeUtil.js";

var movieName = document.getElementById("movieName");
var webPoster = document.getElementById("webPoster");
var mobilePoster = document.getElementById("mobilePoster");
var movieContent = document.getElementById("movieContent");
var trailer = document.getElementById("trailer");
var starring = document.getElementById("starring");
var director = document.getElementById("director");
var producer = document.getElementById("producer");
var distributor = document.getElementById("distributor");
var entranceFee = document.getElementById("entranceFee");
var dateTime = document.getElementById("dateTime");
var addMovie = document.getElementById("addMovie");
var editId = sessionStorageUtil.getItem("editId");
var unavailableseats = [];
var movieDate = 0;

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

window.onload = () => {
    checkMode();
    checkState();
    sessionStorageUtil.setItem("currentScreen", 3);
}

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
function checkMode() {
    if (sessionStorageUtil.getItem("editId")) {
        onEdit();

    } else {
        addMovie.onclick = () => {
            var movie = new Movie(
                movieName.value,
                webPoster.value,
                mobilePoster.value,
                movieContent.value,
                trailer.value,
                starring.value,
                director.value,
                producer.value,
                distributor.value,
                entranceFee.value,
                unavailableseats,
                format1(dateTime.value),
            )
            createMovie(movie);
        }
    }
}

async function onEdit() {
    var coll = doc(db, "Movies", editId);
    const docSnap = await getDoc(coll);
    if (docSnap.exists()) {
        dateTime.setAttribute("disabled", true);
        addMovie.innerText = "Update Movie";
        movieName.value = docSnap.data().movieName;
        webPoster.value = docSnap.data().webPoster;
        mobilePoster.value = docSnap.data().mobilePoster;
        movieContent.value = docSnap.data().movieContent;
        trailer.value = docSnap.data().trailer;
        starring.value = docSnap.data().starring;
        director.value = docSnap.data().director;
        producer.value = docSnap.data().producer;
        distributor.value = docSnap.data().distributor;
        entranceFee.value = docSnap.data().entranceFee;
        movieDate = docSnap.data().dateTime;
        unavailableseats = docSnap.data().unavailableSeats;
        addMovie.onclick = async () => {
            var coll = doc(db, "Movies", editId);

            await setDoc(
                coll, {
                movieName: movieName.value,
                webPoster: webPoster.value,
                mobilePoster: mobilePoster.value,
                movieContent: movieContent.value,
                trailer: trailer.value,
                starring: starring.value,
                director: director.value,
                producer: producer.value,
                distributor: distributor.value,
                entranceFee: entranceFee.value,
                unavailableSeats: unavailableseats,
                dateTime: movieDate,
            }).then(() => {
                alert("Movie ID(" + editId + ") is Updated.");
            }).catch((error) => {
                alert("Unsuccessful operation, error: " + error);
            })
        }
    }
}


