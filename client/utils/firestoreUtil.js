import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

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

async function createCustomer(customer) {
    var coll = doc(db, "Customers", customer.orderTime);

    await setDoc(
        coll, {
        customerName: customer.customerName,
        phoneNo: customer.phoneNo,
        movieName: customer.movieName,
        entranceFee: customer.entranceFee,
        seats: customer.seats,
        totalCost: customer.totalCost,
        payment: customer.payment,
        movieDate: customer.movieDate,
        orderTime: customer.orderTime,
        arrived: customer.arrived,
    }).then(() => {
        alert("Booking Successfued.");
    }).catch((error) => {
        alert("Booking Failed, error: " + error);
    })
}

export { createCustomer };