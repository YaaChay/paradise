import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, onSnapshot, deleteDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { EventUtil } from "../utils/EventUtil.js";
import { setMode } from "../config/config.js";
import { sessionStorageUtil } from "../utils/sessionStorageUtil.js";
import { localStorageUtil } from "../utils/localStorageUtil.js";
import { createTicket } from "../utils/indexedDBUtil.js";
import { createCustomer } from "../utils/firestoreUtil.js";
import { Ticket } from "../models/ticket.js";
import { Customer } from "../models/customer.js";
import { format3, getCurrentDate } from "../utils/timeUtil.js";

var bgImg = document.getElementById("bgImg");
var poster = document.getElementById("poster");
var movieName = document.getElementById("movieName");
var datetime = document.getElementById("dateTime");
var movieContent = document.getElementById("movieContent");
var starring = document.getElementById("starring");
var director = document.getElementById("director");
var producer = document.getElementById("producer");
var distributor = document.getElementById("distributor");
var video = document.getElementById("video");
var source = document.createElement("source");
var formName = document.getElementById("formName");
var customerName = document.getElementById("customerName");
var phoneNo = document.getElementById("phoneNo");
var seats = document.getElementsByName("seats");
var entranceFee = document.getElementById("entranceFee");
var selectedCount = document.getElementById("selectedCount");
var totalCost = document.getElementById("totalCost");
var cardHolderName = document.getElementById("cardHolderName");
var cardNo = document.getElementById("cardNo");
var expDate = document.getElementById("expDate");
var cvCode = document.getElementById("cvCode");
var bookBtn = document.getElementById("bookBtn");
var input_box = document.querySelectorAll("form input, form textarea");
var total_seats = [];
var payment;
var arrived = false;
var disable_seats = [];
var date1 = getCurrentDate();
var date2 = 0;

const firebaseConfig = {
    apiKey: "AIzaSyDmbMp1PzpwAml5Y6hsDthn9UB1zbSxmzM",
    authDomain: "paradise-cinema6.firebaseapp.com",
    projectId: "paradise-cinema6",
    storageBucket: "paradise-cinema6.appspot.com",
    messagingSenderId: "257835920517",
    appId: "1:257835920517:web:22524f843abfb608a00dec",
    measurementId: "G-GG7JS0QC78"
};

cardNo.onkeyup = function () {
    if (cardNo.value != '') {
        new Cleave(cardNo, {
            creditCard: true,
            delimiter: "-",
            onCreditCardTypeChanged: function (type) {
                if (type == "visa") {
                    document.querySelector(".payment-logo i:nth-child(1)").style.color = '#f96161';
                    payment = "VISA";
                } else if (type == "mastercard") {
                    document.querySelector(".payment-logo i:nth-child(2)").style.color = '#f96161';
                    payment = "Master";
                } else if (type == "jcb") {
                    document.querySelector(".payment-logo i:nth-child(3)").style.color = '#f96161';
                    payment = "JCB";
                } else { };
            }
        });
    } else {
        document.querySelector(".payment-logo i:nth-child(1)").style.color = '';
        document.querySelector(".payment-logo i:nth-child(2)").style.color = '';
        document.querySelector(".payment-logo i:nth-child(3)").style.color = '';
        payment = '';
    }
}

new Cleave(expDate, {
    date: true,
    datePattern: ['m', 'y']
});

initializeApp(firebaseConfig);

const db = getFirestore();

EventUtil.addHandler(window, "load", setMode());

setData();
checkSeats();

function setData() {
    movieName.innerText = sessionStorageUtil.getItem("movieId");
    customerName.value = localStorageUtil.getItem("customerName");
    phoneNo.value = localStorageUtil.getItem("phoneNo");
    entranceFee.innerText = 5;
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
        entranceFee.innerText = docSnap.data().entranceFee;
        datetime.innerText = format3(docSnap.data().dateTime);
        movieContent.innerText = docSnap.data().movieContent;
        starring.innerText = docSnap.data().starring;
        director.innerText = docSnap.data().director;
        producer.innerText = docSnap.data().producer;
        distributor.innerText = docSnap.data().distributor;
        source.setAttribute("src", docSnap.data().trailer);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);
        disable_seats = docSnap.data().unavailableSeats;
        date2 = docSnap.data().dateTime;
        if (Number(date1) > Number(date2)) {
            formName.innerText = "Time Overed";
            input_box.forEach(input => {
                input.setAttribute("disabled", "true");
            })
        }
    }
}

async function upDateMovie() {
    var movieId = sessionStorageUtil.getItem("movieId");
    var coll = doc(db, "Movies", movieId);
    await updateDoc(coll, {
        unavailableSeats: disable_seats.concat(total_seats)
    });
}

setInterval(() => {
    getMovie(); 
    checkSeats();
}, 1000);

function checkSeats() {
    seats.forEach(seat => {
        if (disable_seats != null) {
            for (var i = 0; i < disable_seats.length; i++) {
                if (disable_seats[i] == seat.getAttribute("value")) {
                    seat.setAttribute("disabled", "true");
                    seat.parentElement.classList.add("disabled");
                    var index = total_seats.indexOf(seat.getAttribute("value"));
                    if (index !== -1) {
                        total_seats.splice(index, 1);
                    }
                    selectedCount.innerText = total_seats.length;
                    totalCost.innerText = total_seats.length * entranceFee.innerText;
                }
            }
        }

    })
}

seats.forEach(seat => {
    seat.onclick = function () {
        var div = seat.parentElement;
        div.classList.toggle("checked");
        if (div.classList.contains("checked")) {
            seat.setAttribute("checked", true);
            total_seats.push(seat.getAttribute("value"));
            selectedCount.innerText = total_seats.length;
            totalCost.innerText = total_seats.length * entranceFee.innerText;
        } else {
            seat.removeAttribute("checked", true);
            var filterArr = total_seats.filter(function (num) { return num != seat.getAttribute("value") });
            total_seats = filterArr;
            selectedCount.innerText = total_seats.length;
            totalCost.innerHTML = total_seats.length * entranceFee.innerText;
        }

    };
})

bookBtn.onclick = function () {
    var now = getCurrentDate();
    var seatsNo = total_seats.sort(function (num1, num2) {
        return num1 - num2;
    });
    var ticket = new Ticket(
        customerName.value,
        phoneNo.value,
        movieName.innerText,
        entranceFee.innerText,
        seatsNo,
        totalCost.innerText,
        payment,
        dateTime.innerText,
        format3(now),
    );

    var customer = new Customer(
        customerName.value,
        phoneNo.value,
        movieName.innerText,
        entranceFee.innerText,
        seatsNo,
        totalCost.innerText,
        payment,
        dateTime.innerText,
        now,
        arrived,
    )
    if (customerName.value != "" && phoneNo.value != "" && seatsNo.length != 0 && cardHolderName.value != "" && cardNo.value != "" && expDate.value != "" && cvCode.value != "" && totalCost.innerText != 0) {
        if (cardNo.length < 16) {
            alert("Unavailable Payment Card Number!");
        } else {
            if (payment == "VISA" || payment == "Master" || payment == "JCB") {
                createTicket(ticket);
                createCustomer(customer);
                saveCustomerInfo();
                upDateMovie();
            } else {
                alert("Payment Not Allowed!");
            }
        }
    } else if (seatsNo.length == 0 || totalCost.innerText == 0) {
        alert("Plz pick seat(s) first.");
    } else {
        alert("Plz insert all require info.");
    }
}

function saveCustomerInfo() {
    localStorageUtil.setItem("customerName", customerName.value);
    localStorageUtil.setItem("phoneNo", phoneNo.value);
}
