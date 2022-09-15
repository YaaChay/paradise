import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDocs, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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

async function createMovie(movie) {
    var coll = doc(db, "Movies", movie.dateTime);

    await setDoc(
        coll, {
        movieName: movie.movieName,
        webPoster: movie.webPoster,
        mobilePoster: movie.mobilePoster,
        movieContent: movie.movieContent,
        trailer: movie.trailer,
        starring: movie.starring,
        director: movie.director,
        producer: movie.producer,
        distributor: movie.distributor,
        entranceFee: movie.entranceFee,
        unavailableSeats: movie.unavailableSeats,
        dateTime: movie.dateTime,
    }).then(() => {
        alert("New Movie Added.");
    }).catch((error) => {
        alert("Unsuccessful operation, error: " + error);
    })
}

export { createMovie };