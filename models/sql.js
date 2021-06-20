const mariadb = require('mariadb');
const { Error } = require('mongoose');
const pool = mariadb.createPool({
host: process.env.DB_HOST || "localhost",
user:process.env.DB_USER || 'root', 
password: process.env.DB_PASS ,
connectionLimit: 5,
database: "movieapp"
});


 async function getUser(email) {
    let conn;
    let res;
    try {
      conn = await pool.getConnection();
      //const rows = await conn.query("SELECT 1 as val");
      //console.log(rows); //[ {val: 1}, meta: ... ]
      //insert
       //const res = await conn.query("INSERT INTO mensajes value (1, 'primer mensaje')");
      //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 } 
     res = await conn.query("SELECT * FROM users WHERE email=?",[email]);
    } catch (err) {
        console.log(err)
        res = null;
      throw err;
    } finally {
      conn.end();
      return res[0];
    }
  } 

  module.exports = {
      getUser
  }