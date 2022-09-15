import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";
import { customerTbody } from "../../views/customer_tbody.js";


var tbody1 = document.getElementById("tbody1");
var tbody2 = document.getElementById("tbody2");
var notarrivedcustomers = [];
var arrivedcustomers = [];

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
    notarrivedcustomers = [];
    arrivedcustomers = [];
    tbody1.innerHTML = "";
    tbody2.innerHTML = "";
    fetchNotArrivedCustomer();
    fetchArrivedCustomer();
}

async function fetchNotArrivedCustomer() {
    const coll = collection(db, "Customers");

    onSnapshot(coll, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            if (doc.data().arrived == false) {
                tbody1.innerHTML = "";
                notarrivedcustomers.push(doc.data());
                notarrivedcustomers.forEach((e) => {
                    var index1 = tbody1.children.length;
                    var customer = customerTbody(index1 + 1, e.customerName, e.phoneNo, e.movieName, e.seats, e.movieDate, e.orderTime, e.payment, e.totalCost, e.arrived);
                    tbody1.appendChild(customer);
                })
            }
        });
        notarrivedcustomers = [];
    })
}

async function fetchArrivedCustomer() {
    const coll = collection(db, "Customers");

    onSnapshot(coll, (querySnapshot) => {
        querySnapshot.forEach(doc => {
            if (doc.data().arrived == true) {
                tbody2.innerHTML = "";
                arrivedcustomers.push(doc.data());
                arrivedcustomers.forEach((e) => {
                    var index2 = tbody2.children.length;
                    var customer = customerTbody(index2 + 1, e.customerName, e.phoneNo, e.movieName, e.seats, e.movieDate, e.orderTime, e.payment, e.totalCost, e.arrived);
                    tbody2.appendChild(customer);
                })
            }
        });
        arrivedcustomers = [];
    })
}

