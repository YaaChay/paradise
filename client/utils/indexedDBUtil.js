let db = null;

function createTicket(ticket) {
    const request = window.indexedDB.open("bookingHistory");
    request.onerror = (event) => {
        alert("Error Code: " + request.target.error);
    }
    request.onupgradeneeded = (event) => {
        db = event.target.result;
        const store = db.createObjectStore("tickets", { keyPath: 'orderTime' });
        store.transaction.oncomplete = (event) => {
        }
    }
    request.onsuccess = (event) => {
        db = event.target.result;
        const insertTransaction = db.transaction("tickets", "readwrite");
        const store = insertTransaction.objectStore("tickets");

        insertTransaction.onerror = () => {
            alert("Error Code: " + request.target.error);
        }
        insertTransaction.oncomplete = () => {
            console.log("Ticket store successful completed.");
        }
        let request = store.add(ticket);
        request.onerror = () => {
            alert("Error Code: " + request.target.error);
        }
        request.onsuccess = () => {
            // alert("Booking Successed.");
        }
    }
}

export { createTicket }