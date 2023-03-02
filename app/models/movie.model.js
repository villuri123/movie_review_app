module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movies", {
        title: {
            type: Sequelize.STRING
        },
        year: {
            type: Sequelize.INTEGER
        },
        genre: {
            type: Sequelize.STRING
        },
        nowPlaying: {
            type: Sequelize.INTEGER
        },
        image: {
            type: Sequelize.STRING
        }
    });
    return Movie;
}