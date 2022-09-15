function ticketContainer(customerName, movieName, seatS, entranceFee, phoneNo, paymentMethod, totalCost, dateTime, orderTime) {
    var div = document.createElement("div");
    var ordertime = document.createElement("p");
    var ticket = document.createElement("div");
    var moviename = document.createElement("p");
    var customername = document.createElement("p");
    var seats = document.createElement("p");
    var ticketfooter = document.createElement("div");
    var footerleft = document.createElement("div");
    var entrancefee = document.createElement("p");
    var phoneno = document.createElement("p");
    var datetime = document.createElement("p");
    var footerright = document.createElement("div");
    var totalcost = document.createElement("p");
    var payment = document.createElement("p");
    var logo = document.createElement("p");

    ordertime.classList.add("order-time");
    ordertime.id = "orderTime";
    ordertime.innerText = orderTime;

    ticket.classList.add("ticket");

    customername.setAttribute("id", "customerName");
    customername.innerText = customerName;

    moviename.classList.add("movie-name");
    moviename.id = "movieName";
    moviename.innerText = movieName;

    seats.classList.add("seats");
    seats.setAttribute("id", "seats");
    seats.innerText = seatS;

    ticketfooter.classList.add("ticket-footer");
    footerleft.classList.add("footer-left");

    entrancefee.setAttribute("id", "entranceFee");
    entrancefee.innerText = "Prices: " + entranceFee + "$";

    phoneno.setAttribute("id", "phoneNo");
    phoneno.innerText = phoneNo;

    datetime.setAttribute("id", "dateTime");
    datetime.innerText = dateTime;

    footerright.classList.add("footer-right");

    totalcost.setAttribute("id", "totalCost");
    totalcost.innerText = "Total Cost: " + totalCost + "$";

    payment.setAttribute("id", "payment");
    payment.innerText = paymentMethod;

    logo.classList.add("yc-stroked-text");
    logo.innerText = "Paradise";

    footerleft.appendChild(entrancefee);
    footerleft.appendChild(phoneno);
    footerleft.appendChild(datetime);

    footerright.appendChild(totalcost);
    footerright.appendChild(payment);
    footerright.appendChild(logo);

    ticketfooter.appendChild(footerleft);
    ticketfooter.appendChild(footerright);

    ticket.appendChild(customername);
    ticket.appendChild(moviename);
    ticket.appendChild(seats);
    ticket.appendChild(ticketfooter);

    div.appendChild(ordertime);
    div.appendChild(ticket);
    console.log("ticket Created")
    return div;

}

export { ticketContainer };

/*
<div>
    <p class="order-time" id="orderTime">Sep 8, 2022 3:00 PM</p>
    <div class="ticket">
        <p id="customerName">SMILE</p>
        <p class="movie-name" id="movieName">HARRP POTTER</p>
        <p class="seats" id="seats">4, 5</p>
        <div class="ticket-footer">
            <div class="footer-left">
                <p id="entrancefee">ANN</p>
                <p id="phoneNo">09405999313</p>
                <p id="dateTime">Sep 9, 2022, 3:00 PM</p>
            </div>
            <div class="footer-right">
                <p id="totalCost">4111123578645432</p>
                <p id="payment">VISA</p>
                <p class="yc-stroked-text">Paradise</p>
            </div>
        </div>
    </div>
</div>
*/