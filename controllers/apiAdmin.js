const Film = require('../models/Film')
const fetch = require('node-fetch')


const apiAdmin = {
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
                        res.status(400).json({ message: `error ${err.message}`, popup: false })
                    } else {
                        console.log(data)
                        res.status(200).json({ message: `Pelicula guardada correctamente`, popup: true, data })
                    }
                })
            } catch (error) {
                res.status(500).json(error.message)
            }
        } else
            res.status(400).json({ message: `La pelicula ya existe` })
       
    },
    // Funcion que obtiene los documentos de la coleccion de la bbdd
    getListMovies: async (req, res) => {
        let status;
        let data;
        
        try {
            data = await Film.find()
            status = 200;
        } catch (err) {
            status = 500;
            data = err.mesagge
        } finally {

            res.status(status).json(data)
        }
    },
    editMovie: async(req, res)=>{
        const data = req.body
        const id = req.params.id
        try {
            let result = await Film.findOne({_id:`${id}`})
        
            if(data.Title.toLowerCase().replace(/ \s+/g, "")==result.Title.toLowerCase().replace(/ \s+/g, "")){
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
    },
    //Funcion que se utiliza para borrar la pelicula seleccionada titulo
    deleteMovie: async (req, res) => {
        
        let titlepush = req.params.title
        try {
            await Film.deleteOne({Title:`${titlepush}`})
            res.sendStatus(200)
        } catch (err) {
            console.error(err)
        }
    }

}

module.exports = apiAdmin