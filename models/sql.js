const mariadb = require("mariadb");
const { Error } = require("mongoose");
const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS,
  connectionLimit: 5,
  database: "movieapp",
});

//CRUD

async function getUser(email, password) {
  let conn;
  let res;
  try {
    conn = await pool.getConnection();
    //const rows = await conn.query("SELECT 1 as val");
    //console.log(rows); //[ {val: 1}, meta: ... ]
    //
    let sql_query =
      "SELECT `Email`, `Password` FROM `users` WHERE Email=? AND Password=?";
    //let sql_query = "INSERT INTO `users`( `Email`, `Password`) VALUES (?,(SELECT `idUser` FROM `users` WHERE `Email`= ?)";
    //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    res = await conn.query(sql_query, [email, password]);
  } catch (err) {
    console.log(err);
    res = null;
    throw err;
  } finally {
    conn.end();
    return res;
  }
}

async function getAllUsers() {
  let conn;
  let result;
  try {
    conn = await pool.getConnection();
    let sql_query = "SELECT * FROM users";
    result = await conn.query(sql_query);
    console.log(result);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
  return result;
}

async function getUsersByMail() {
  let conn;
  let result;
  try {
    conn = await pool.getConnection();
    let sql_query =
      "SELECT favorite_films.refFilm, users.Email FROM entradas_blog INNER JOIN users ON favorite_films.idUser = users.idUser WHERE users.Email=?"; //query para sql
    result = await conn.query(sql_query);
    console.log(result);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.end();
  }
  return result;
}

module.exports = {
  getUser,
  getAllUsers,
  getUsersByMail,
};
