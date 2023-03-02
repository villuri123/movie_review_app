const db = require("../models");
const { movie } = require("../models");
const movieReview = require("../models/movieReview.model");
const Review = db.movieReview;
const Movie = db.movie;
const Op = db.Sequelize.Op;

//create and save a new movie
exports.createMovieReview = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Body can not be empty"
        });
        return;
    }

    console.log("movie id is: ", req.movieId);
    const movieId = req.movieId;
    //create a movie
    const review = {
        review: req.body.review,
        rating: req.body.rating,
        comments: req.body.comments,
      
    };
    
    //Save the movie in the database
    Review.create(review, {through: {movieId: movieId}}).then( movieReview => {

        movieReview.createMovie(movieId).then( () => {
            res.send(review);
        });
        
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the tutorial"
        })
    })

};

//retrieve all movie from the database created by the user
exports.getAllMovieReviews = (req, res) => {
   // const movieId = req.movieId;

    // Review.findOne({ where :{ id: movieId} , include : Movie})
    // .then(result => {
    //     //console.log(result.movies);
    //     res.send(result);
    // }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Cannot find the user"
    //     });
    // });
    Review.findAll()
    .then(data => {
        res.send(data);
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving tutorials"
        })
    })
 };

//find a single movie  review with an id
exports.getMovieReviewById = (req, res) => {
    const movieId = req.params.id;
    Review.findByPk(movieId)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving Tutorial with id=" + id
        });
    });
};

//update a movie review by the id in the request
exports.updateMovieReviewById = (req, res) => {
    const movieId = req.params.id;

    Review.update(req.body, {where : {id: movieId}})
    .then(num => {
        if(num == 1){
            res.send({message: "Movie was updated successfully."});
        }else{
            res.send({
                message: `Cannot update Movie with id=${id}. Movie was not found or req.body was empty`
            });
        }
    });
};

//delete a movie review with the specified id in the request
exports.deleteMovieReview = (req, res) => {
    const movieId = req.params.id;

    Review.destroy({
        where: { id: movieId}
    })
    .then( num => {
        console.log(num);
        if(num == 1){
            res.send({
                message: "Movie was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Movie with id=${id}. Maybe Tutorial was not found`
            });
        }
    })
};

// exports.deleteAll = (req, res) => {
//     const userId = req.userId;
//     //find the id that need to be deleted
//     let movieIds = [];
//     User.findOne({ where :{ id: userId} , include : Movie})
//     .then(result => {
//         result.movies.forEach( movie => {
//             movieIds.push(movie.id);
//         });
//         console.log("The movie id is: ", movieIds);
//         Movie.destroy({ 
//             where: { id: movieIds}
//         })
//         .then(nums => {
//             res.send({message: `${nums} movies were deleted successfully `})
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all tutorials"
//             });
//         });
        
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Cannot find the user"
//         });
//     });
// };