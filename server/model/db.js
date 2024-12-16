const Pool = require("pg").Pool



const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "capstone_blog",
    password: "malongar12",
    port: 5432,

});

module.exports = pool;
