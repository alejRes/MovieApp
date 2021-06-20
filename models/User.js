const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    connectionLimit: 5,
    database: 'movieApp'
});

const userRegistrer ={

    // devuelve todos los ids de favoriteFilms correspondientes al user registrado
    getFavoritesFilms: async(email)=>{
        let conn, result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = "SELECT idFilm FROM favoritefilms INNER JOIN users On favoritefilms.UserID = users.UserID WHERE users.email =?"
            result = await conn.query(sqlQuery,[email]) 
            return result
        } catch (error) {
            
        }
    },
    //inserta en la tabla favoriteFilms el registro de la pelicula  marcada como favorito
    insertFaVoriteFilm: async(id, email) =>{
        
        let conn, result;
        try {
            conn = await pool.getConnection();
            let sqlQuery = "INSERT INTO favoriteFilms (idFilm, UserID) VALUES (?, (SELECT UserID FROM users WHERE email = ?))"
            result = await conn.query(sqlQuery,[id,email])
        } catch (error) {
            
        }
    },

    deleteFavoriteFilm: async(id,email)=>{
        let conn, result
        try {
            conn = await pool.getConnection()
            let sqlQuery = " DELETE FROM `favoritefilms` WHERE idFilm = ? AND UserID = (SELECT UserID FROM users WHERE email = ?)"
            result = await conn.query(sqlQuery,[id,email])
        } catch (error) {
            
        }
       
    }
}

module.exports=userRegistrer;