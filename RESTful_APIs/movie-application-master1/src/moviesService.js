// Import the axios library
const axios = require('axios')
const moviesList = require("../data/movies.json").movies;

const getMovies = (done) => {
  return JSON.stringify(moviesList);
}

const getMoviesById = (movieId, done) => {
  let movie = moviesList.find((m) => m.id === movieId);
  if(!movie) return done("Requested movie doesn't exist..!", null);
  return done(null, JSON.stringify(movie));
}

const saveMovie = function (newMovie, done) {
  let movie = moviesList.find((m) => m.id === newMovie.id);
  if(movie) return done("Movie already exists..!", null);
  moviesList.push(newMovie);
  return done(null, JSON.stringify(moviesList));
}

const updateMovie = function (movieId, updateData, done) {
  let i = moviesList.findIndex((m) => m.id === movieId);
  if(i === -1) return done("Requested movie doesn't exist..!", null);
  if(updateData.movieName) moviesList[i].movieName = updateData.movieName;
  if(updateData.director) moviesList[i].director = updateData.director;
  if(updateData.rating) moviesList[i].rating = updateData.rating;
  return done(null, JSON.stringify(moviesList));
}

const deleteMovieById = function (movieId, done) {
  let i = moviesList.findIndex((m) => m.id === movieId);
  if(i === -1) return done("Requested movie doesn't exist..!", null);
  moviesList.splice(i, 1);
  return done(null, JSON.stringify(moviesList));
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
