const Film = require('../models/Film')
const fetch = require('node-fetch')

const admin = {
    // método que renderiza la vista 
    getCreateMovie: (req, res) => {
        try {
            res.status(200).render('createmovie')
        } catch (error) {
            res.status(404).json({ message: `pagina no encontrada ${error.message}` })
        }
    },
    // método que se utiliza para crear las peliculas nuevas en la base de datos de mongo
    postCreateMovie: async (req, res) => {

        const film = new Film(req.body)
        
        const existInOmdb = await fetch(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${film.Title}`);
        const filmOmd = await existInOmdb.json()

        if (filmOmd.Response == "False" || (filmOmd.Response == 'True' && film.Title.toLowerCase().replace(/ \s+/g, "") != filmOmd.Title.toLowerCase())) {
            console.log(`film: ${film.Title.toLowerCase().replace(/\s+/, "")}`)
            try {
                film.save((err, data) => {
                    if (err) {
                        console.log(data)
                        res.status(400).json(/* 'createMovie', */{ message: `La película ya existe ${err.message}`, popup: false })
                    } else {
                        console.log(data)
                        res.status(200).json(/* 'createMovie', */{ message: `Pelicula guardada correctamente`, popup: true, data })
                    }
                })
            } catch (error) {
                res.status(500).json(error.message)
            }
        } else
            res.status(400).json({ message: `La pelicula ya existe` })
        console.log(`filmOmd: ${filmOmd.Response}`)
    },

    //Funcion que se utiliza para borrar la pelicula seleccionada titulo
    deleteMovie: async (req, res) => {
        let titlepush = req.params.title
        try {
            Film.deleteOne({ Title: `${titlepush}` })
        } catch (err) {

        }
    },

    //Funcion que se utiliza para renderizar la vista con la película
    getUpdMovie: async (req, res) => {
        let id = req.params.id
        
        try {
            let data = await Film.findOne({_id:`${id}`})//cambiar por id autoincremento!!!!!!!
            
            res.status(200).render('createmovie',{data})
        } catch (error) {
            res.status(404).json({ message: `pagina no encontrada ${error.message}` })
        }
    },

    // Funcion que obtiene los documentos de la coleccion de la bbdd
    getListMovies: async (req, res) => {
        let status;
        let data;
        //let role;//Extraera la informacion de la cookie
        /* if (role == "user") {

        } else { */
        try {
            data = await Film.find()
            status = 200;
        } catch (err) {
            status = 500;
            data = err.mesagge
        } finally {
            console.log(data)
            res.status(status).json(data)
        }
    },
    //funcion que renderiza el dashboard del user o del admin
    getMovie: async(req, res) => {
        //let role;//Extraera la informacion de la cookie
        /* if (role == "user") {

        } else {} */
        try {
            let data = await Film.find()
            res.status(200).render('dashboardAdmin',{data})
        } catch (error) {
            res.status(404).json({ message: `pagina no encontrada ${error.message}` })
        }
    },
    editMovie: async(req, res)=>{
        const data = req.body
        const id = req.params.id
        try {
            let result = await Film.findOne({_id:`${id}`})
        
            if(data.Title.toLowerCase().replace(/ \s+/g, "")!=result.Title.toLowerCase().replace(/ \s+/g, "")){
                await Film.updateOne({_id:`${id}`},{$set: data},(err,data)=>{
                    if (err)
                    {   
                        console.log(err.message)
                        res.status(401).json({message:`error ${err.message}`}) 
                    }
                    res.status(200).json({message: `actualizado correctamente`, data})
                })
                 
            }
           
        } catch (err) {
            
        }
    }
}

module.exports = admin;