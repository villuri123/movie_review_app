// module.exports = app => {
//     const movieReview = require("../controllers/movieReview.controllers.js");
  
//     let router = require("express").Router();
  
//     // Create a new movies
//     router.post("/",  movieReview.createMovieReview);
  
//     // Retrieve all movies
//     router.get("/all", movieReview.getAllMovieReviews);
  
//     // Retrieve a single movie given the movieId
//     router.get("/:id", movieReview.getMovieReviewById);
  
//     // Update a movie given the movieId
//     router.put("/:id", movieReview.updateMovieReviewById);
  
//     // Delete a movie with id
//     router.delete("/:id", movieReview.deleteMovieReview);
  
//     // delete all movie by the current users
//    // router.delete("/",  movieReview.deleteAll);
  
//     app.use('/api/movieReviews', router);
    
//   };