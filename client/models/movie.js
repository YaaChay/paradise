function Movie( movieName, webPosterURL, mobilePosterURL, movieContent, trailerURL, starring, director, producer, distributor, entranceFee, dateTime) {
    this.movieName = movieName;
    this.webPosterURL = webPosterURL;
    this.mobilePosterURL = mobilePosterURL;
    this.movieContent = movieContent;
    this.trailerURL = trailerURL;
    this.starring = starring;
    this.director = director;
    this.producer = producer;
    this.distributor = distributor;
    this.entranceFee = entranceFee;
    this.dateTime = dateTime;
}

export { Movie };