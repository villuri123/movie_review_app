const db = require("../models");
const { movie } = require("../models");
const Movie = db.movie;
const User = db.user;
const Op = db.Sequelize.Op;

// //create and save a new movie
// exports.create = (req, res) => {
//     //validate request
//     if(!req.body){
//         res.status(400).send({
//             message: "Body can not be empty"
//         });
//         return;
//     }

//     // console.log("user id is: ", req.userId);
//     // const userId = req.userId;
//     //create a movie
//     const movie = {
//         title: req.body.title,
//         year: req.body.year,
//         genre: req.body.genre,
//         nowPlaying: req.body.nowPlaying,
//         image: req.body.image 
//     };
    
//     //Save the movie in the database
//     Movie.create(movie, movie => {
//             res.send(movie);
//     }).catch( err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the tutorial"
//         })
//     })

// };

// //retrieve all movie from the database created by the user
// exports.findAll = (req, res) => {
//     const userId = req.userId;

//     User.findOne({ where :{ id: userId} , include : Movie})
//     .then(result => {
//         //console.log(result.movies);
//         res.send(result.movies);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Cannot find the user"
//         });
//     });
//     // Movie.findAll({where : {id: userId}, include: User})
//     // .then(data => {
//     //     res.send(data);
//     // }).catch( err => {
//     //     res.status(500).send({
//     //         message: err.message || "Some error occured while retrieving tutorials"
//     //     })
//     // })
// };

// //find a single movie with an id
// exports.findOne = (req, res) => {
//     const movieId = req.params.id;
//     Movie.findByPk(movieId)
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Error retrieving Tutorial with id=" + id
//         });
//     });
// };

// //update a movie by the id in the request
// exports.update = (req, res) => {
//     const movieId = req.params.id;

//     Movie.update(req.body, {where : {id: movieId}})
//     .then(num => {
//         if(num == 1){
//             res.send({message: "Movie was updated successfully."});
//         }else{
//             res.send({
//                 message: `Cannot update Movie with id=${id}. Movie was not found or req.body was empty`
//             });
//         }
//     });
// };

// //delete a movie with the specified id in the request
// exports.delete = (req, res) => {
//     const movieId = req.params.id;

//     Movie.destroy({
//         where: { id: movieId}
//     })
//     .then( num => {
//         console.log(num);
//         if(num == 1){
//             res.send({
//                 message: "Movie was deleted successfully!"
//             });
//         } else {
//             res.send({
//                 message: `Cannot delete Movie with id=${id}. Maybe Tutorial was not found`
//             });
//         }
//     })
// };

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




// // Create a new movie
// async function createMovie(movieData) {
//     const movie = await Movie.create(movieData);
//     return movie;
//   }
  
//   // Get all movies
//   async function getAllMovies() {
//     const movies = await Movie.findAll({ include: [{ model: Review, as: 'reviews' }] });
//     return movies;
//   }
  
//   // Get a movie by ID
//   async function getMovieById(id) {
//     const movie = await Movie.findByPk(id, { include: [{ model: Review, as: 'reviews' }] });
//     return movie;
//   }
  
//   // Update a movie
//   async function updateMovie(id, movieData) {
//     const [updatedCount, updatedMovies] = await Movie.update(movieData, { where: { id } });
//     return updatedCount;
//   }
  
//   // Delete a movie
//   async function deleteMovie(id) {
//     const deletedCount = await Movie.destroy({ where: { id } });
//     return deletedCount;
//   }
  



// Create a movie
exports.createMovie = (req, res) => {
    Movie.create({
    title: req.body.title,
    year: req.body.year,
    genre:req.body.genre,
    nowPlaying:req.body.nowPlaying,
    image:req.body.image
    })
    .then((movie) => res.status(201).send(movie))
    .catch((error) => res.status(400).send(error));
    };
    
    // Get all movies
    exports.getMovies = (req, res) => {
    Movie.findAll()
    .then((movies) => res.status(200).send(movies))
    .catch((error) => res.status(400).send(error));
    };
    
    // Get movie by id
    exports.getMovieById = (req, res) => {
    Movie.findByPk(req.params.id)
    .then((movie) => {
    if (!movie) {
    return res.status(404).send({
    message: 'Movie Not Found'
    });
    }
    return res.status(200).send(movie);
    })
    .catch((error) => res.status(400).send(error));
    };
    
    // Update a movie
    exports.updateMovie = (req, res) => {
    Movie.findByPk(req.params.id)
    .then((movie) => {
    if (!movie) {
    return res.status(404).send({
    message: 'Movie Not Found'
    });
    }
    return movie
    .update({
        title: req.body.title,
        year: req.body.year,
        genre:req.body.genre,
        nowPlaying:req.body.nowPlaying,
        image:req.body.image
    })
    .then(() => res.status(200).send(movie))
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};


 // Update a movie
    exports.updateMovie = (req, res) => {
    Movie.findByPk(req.params.id)
    .then((movie) => {
    if (!movie) {
    return res.status(404).send({
    message: 'Movie Not Found'
    });
    }
    return movie
    .update({
        title: req.body.title,
        year: req.body.year,
        genre:req.body.genre,
        nowPlaying:req.body.nowPlaying,
        image:req.body.image
    })
    .then(() => res.status(200).send(movie))
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};
    
    
 // delete a movie
 exports.deleteMovie = (req, res) => {
    Movie.findByPk(req.params.id)
    .then((movie) => {
    if (!movie) {
    return res.status(404).send({
    message: 'Movie Not Found'
    });
    }
    return movie
    .destroy({
    })
    .then(() => res.status(200).send({message:"movie deleted succesfully"}))
    .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
};
    
    
    