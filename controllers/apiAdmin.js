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
                        res.status(400).render('createmovie')
                    } else {
                        console.log(data)
                        res.redirect(307,'/movies')
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
        const id = Number(req.params.id)
        console.log('*************')
        console.log(data)

        try {
            let result = await Film.findOne({filmId:0})
            console.log(result)
            if(data.Title.toLowerCase().replace(/ \s+/g, "")==result.Title.toLowerCase().replace(/ \s+/g, "")){
                
                await Film.updateOne({filmId:`${id}`},{$set: data},(err,data)=>{
                    if (err)
                    {   
                        console.log(err.message)
                        res.status(401).render({message:`error ${err.message}`}) 
                    }
                    
                    res.status(200).render('createmovie',{message: `actualizado correctamente`, data})
                })
                 
            }else
                
                res.status(204).render('createmovie',{message: 'no se puede modificar el titulo', data})
           
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