
//import axios module
axios = require('axios');

//After starting the JSOn server check the port on which is running accordingly change
//the port in url given below

//This method will get all movies from json server
const getMovies = (done) => {
  axios.get("http://localhost:3000/movies")
       .then((res) => done(undefined, res))
       .catch((err) => done(err));
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  axios.get(`http://localhost:3000/movies/${movieId}`)
       .then((res) => done(undefined, res))
       .catch((err) => done(err));
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
  axios.post(`http://localhost:3000/movies`, movieDetails)
       .then((res) => done(undefined, res))
       .catch((err) => done(err));
}

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
       .then((res) => done(undefined, res))
       .catch((err) => done(err));
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  axios.delete(`http://localhost:3000/movies/${movieId}`)
       .then((res) => done(undefined, res))
       .catch((err) => done(err));
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
