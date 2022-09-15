function Ticket(customerName, phoneNo, movieName, entranceFee, seats, totalCost, payment,movieDate, orderTime ) {
    this.customerName = customerName;
    this.phoneNo = phoneNo;
    this.movieName = movieName;
    this.entranceFee = entranceFee;
    this.seats = seats;
    this.totalCost = totalCost;
    this.payment = payment;
    this.movieDate = movieDate;
    this.orderTime = orderTime;
}

export { Ticket }