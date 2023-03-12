module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "Darling143@",
    DB: "ecommercedb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};