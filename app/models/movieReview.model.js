module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        review: {
            type: Sequelize.STRING
        },
        rating: {
            type: Sequelize.INTEGER
        },
        comments: {
            type: Sequelize.STRING
        }
       
    });
    return Review;
}