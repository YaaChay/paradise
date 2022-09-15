import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { format3 } from "../utils/timeUtil.js";

var movieName = document.getElementById("movieName");
var poster = document.getElementById("poster");
var bgImg = document.getElementById("bgImg");
var entranceFee = document.getElementById("entranceFee");
var dateTime = document.getElementById("dateTime");
var movieContent = document.getElementById("movieContent");
var starring = document.getElementById("starring");
var director = document.getElementById("director");
var producer = document.getElementById("producer");
var distributor = document.getElementById("distributor");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var video = document.getElementById("video");
var source = document.createElement("source");

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
    checkState();
    sessionStorageUtil.setItem("currentScreen", 4);
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

getMovie();

async function getMovie() {
    var movieId = sessionStorageUtil.getItem("movieId");
    var coll = doc(db, "Movies", movieId);
    const docSnap = await getDoc(coll);
    if (docSnap.exists()) {
        console.log(docSnap.data());
        movieName.innerText = docSnap.data().movieName;
        poster.setAttribute("src", docSnap.data().mobilePoster);
        bgImg.setAttribute("src", docSnap.data().webPoster);
        entranceFee.innerText = docSnap.data().entranceFee + "$ ";
        dateTime.innerText = " | " + format3(docSnap.data().dateTime);
        movieContent.innerText = docSnap.data().movieContent;
        starring.innerText = docSnap.data().starring;
        director.innerText = docSnap.data().director;
        producer.innerText = docSnap.data().producer;
        distributor.innerText = docSnap.data().distributor;
        source.setAttribute("src", docSnap.data().trailer);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
    }
}

editBtn.onclick = () => {
    sessionStorageUtil.setItem("editId", sessionStorageUtil.getItem("movieId"));
    window.open("./addmovie.html", "_self");
}

deleteBtn.onclick = async () => {
    var movieId = sessionStorageUtil.getItem("movieId");
    const coll = doc(db, "Movies", movieId);
    if (confirm("Are you sure to delete this movie?")) {
        await deleteDoc(coll).then(() => {
            alert("Movied with Id:" + movieId + " is successfully deleted.");
            window.open("./screens/dashboard.html", "_self");
        }).catch((error) => {
            alert("Unsuccessful deletion, error: " + error);
        })
    }
}