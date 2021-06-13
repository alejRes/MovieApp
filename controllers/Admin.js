const Film = require('../models/Film')
const fetch = require('node-fetch')

const admin = {

    //Funcion que se utiliza para crear peliculas que no están en la bbdd
    getCreateMovie: (req, res) => {
        try {
            res.status(200).render('createmovie')
        } catch (error) {
            res.status(404).json({ message: `pagina no encontrada ${error.message}` })
        }
    },
    createMovie: async (req, res) => {

        const film = new Film(req.body)

        const existFilm = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${film.Title}`);
        const filmOmd = await existFilm.json()
        
        if (filmOmd.Response == "False" || (filmOmd.Response == 'True' && film.Title.toLowerCase() != filmOmd.Title.toLowerCase())) {
            console.log(`film: ${film}`)
            try {
                // film.save()
            } catch (error) {
                res.status(500).json()
            }
            
        } else
            console.log(`filmOmd: ${filmOmd.Response}`)

    },
    /*
   //Funcion que se utiliza para borrar la pelicula seleccionada titulo
   deleteMovie : async (req, res)=>{
      
   },
   //Funcion que se utiliza para actulizar algún dato de la pelicula, recibira
   updateMovie : async (id) =>{
       
   }, */
    // Funcion que obtiene los documentos de la coleccion de la bbdd
    getMovie: async (req, res) => {
        let status;
        let data;
        //let role;//Extraera la informacion de la cookie
        /* if (role == "user") {

        } else { */
            try {
                data = await Film.find()
                // res.json(data)
                status = 200;
            } catch (err) {
                status = 500;
                (`no se han obtenido datos ${err.mesagge}`)
            } finally {
                res.status(status).render('dashboardAdmin', data)
            }
        // }

    }
}

module.exports = admin;