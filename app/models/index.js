const config = require("../config/db.config");
const Sequelize = require("sequelize");
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') 
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
// db.movie = require("./movie.model.js")(sequelize, Sequelize);
// db.movieReview = require("./movieReview.model.js")(sequelize, Sequelize);

// db.user.hasMany(db.movie, {
//     foreignKey: "userId",
//     otherKey: "movieId"
// });



// db.user.hasMany(db.movie,{
//     foreignKey: "userId",
// });
// db.movie.hasMany(db.movieReview,{
//     foreignKey: "movieId",
// });
// db.movieReview.belongsTo(db.movie,{
//     foreignKey: "movieId",
// });

module.exports = db;