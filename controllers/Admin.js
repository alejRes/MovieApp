const { db } = require('../models/Film');
const Product = require('../models/Film')

const admin = {
    
    //Funcion que se utiliza para crear peliculas que no están en la bbdd
    getCreateMovie :  (req, res)=>{
        res.status(200).render('')
    },
     /*
    //Funcion que se utiliza para borrar la pelicula seleccionada
    deleteMovie : async (title)=>{
       
    },
    //Funcion que se utiliza para actulizar algún dato de la pelicula, recibira
    updateMovie : async (id) =>{
        
    }, */
    // Funcion que obtiene los documentos de la coleccion de la bbdd
    getMovie :  async (req,res ) => {
        let status;
        let data;
        try{
            // const data = await Product.find()
            // res.json(data)
            status = 200;
        }catch(err){
            status = 500;
            console.log(`no se han obtenido datos ${err.mesagge}`)
        }finally{
            res.status(status).render('dashboardAdmin',data)
        }      
    }
}

module.exports = admin;