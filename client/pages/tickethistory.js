import { EventUtil } from "../utils/EventUtil.js";
import { setMode } from "../config/config.js";
import { ticketContainer } from "../views/ticketContainer.js";

var ticketHistory = document.getElementById("ticketHistory");
let db = null;

EventUtil.addHandler(window, "load", setMode());

fetchTickets();
function fetchTickets() {
    const request = window.indexedDB.open("bookingHistory");
    request.onerror = (event) => {
        alert("Error Code: " + request.target.error);
    }
    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const store = db.createObjectStore("tickets", { keyPath: 'orderTime' });
        store.transaction.oncomplete = (event) => {
            console.log("Ticket store successful completed.");
        }
    }
    request.onsuccess = (event) => {
        db = event.target.result;
        const transaction = db.transaction('tickets', "readonly");
        const store = transaction.objectStore('tickets');

        store.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                var cursorValue = cursor.value;
                var ticketcontainer = ticketContainer(
                    cursorValue.customerName,
                    cursorValue.movieName,
                    cursorValue.seats,

                    cursorValue.entranceFee,
                    cursorValue.phoneNo,
                    cursorValue.payment,
                    cursorValue.totalCost,
                    cursorValue.movieDate,
                    cursorValue.orderTime
                );
                ticketHistory.appendChild(ticketcontainer);
                cursor.continue();
            }
        };
        transaction.oncomplete = function () {
        };
    }

}