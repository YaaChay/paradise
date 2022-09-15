function Movie( movieName, webPoster, mobilePoster, movieContent, trailer, starring, director, producer, distributor, entranceFee, unavailableSeats, dateTime) {
    this.movieName = movieName;
    this.webPoster = webPoster;
    this.mobilePoster = mobilePoster;
    this.movieContent = movieContent;
    this.trailer = trailer;
    this.starring = starring;
    this.director = director;
    this.producer = producer;
    this.distributor = distributor;
    this.entranceFee = entranceFee;
    this.unavailableSeats = unavailableSeats;
    this.dateTime = dateTime;
}

export { Movie };