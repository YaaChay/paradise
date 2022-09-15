import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js";

function customerTbody(iD, customerName, phoneNo, movieName, seatS, dateTime, orderTime, paymentMethod, totalCost, arrived) {
    var tr = document.createElement("tr");
    var id = document.createElement("td");
    var cname = document.createElement("td");
    var phno = document.createElement("td");
    var mname = document.createElement("td");
    var seats = document.createElement("td");
    var datetime = document.createElement("td");
    var payment = document.createElement("td");
    var totalcost = document.createElement("td");
    var checkbox = document.createElement("td");
    var input = document.createElement("input");

    id.innerHTML = iD;
    cname.innerHTML = customerName;
    phno.innerHTML = phoneNo;
    mname.innerHTML = movieName;
    seats.innerHTML = seatS;
    datetime.innerHTML = dateTime;
    payment.innerHTML = paymentMethod;
    totalcost.innerHTML = totalCost + " $";
    input.setAttribute("type", "checkbox");
    input.checked = arrived;
    input.classList.add("yc-input-checkbox");
    input.id = "checkbox";


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
    input.onclick = async () => {
        var coll = doc(db, "Customers", orderTime);
        if (arrived == true) {
            await updateDoc(coll, {
                arrived: false
            });
        } else {
            await updateDoc(coll, {
                arrived: true
            });
        }

    }
    
    checkbox.appendChild(input);
    tr.appendChild(id);
    tr.appendChild(cname);
    tr.appendChild(phno);
    tr.appendChild(mname);
    tr.appendChild(seats);
    tr.appendChild(datetime);
    tr.appendChild(payment);
    tr.appendChild(totalcost);
    tr.appendChild(checkbox);
    return tr;
}

export { customerTbody }

/*
<tr>
    <td>1</td>
    <td>Smile</td>
    <td>09405999313</td>
    <td>Thor:Love and Thunder</td>
    <td>5,6</td>
    <td>8:00 AM, Sep 9, 2022</td>
    <td>Visa</td>
    <td>18$</td>
    <td><input type="checkbox" class="yc-input-checkbox" name="" id=""></td>
</tr>
*/