const Film = require('../models/Film')

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
    
    //Funcion que se utiliza para renderizar la vista con la película
    getUpdMovie: async (req, res) => {
        let id = req.params.id
        
        try {
            let data = await Film.findOne({filmId:`${id}`})//cambiar por id autoincremento!!!!!!!
            
            res.status(200).render('createmovie',{data})
        } catch (error) {
            res.status(404).json({ message: `pagina no encontrada ${error.message}` })
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
            res.status(404).json({ message: `pagina no encontrada ${error.message}`})
        }
    },
    
}

module.exports = admin;