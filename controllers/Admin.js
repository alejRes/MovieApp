const { render } = require('pug')
const Product = require('../models/Film')

const adminFilms ={
    
    //Funcion que se utiliza para crear peliculas que no están en la bbdd
    createMovie : async ()=>{
        
        

    },
    //Funcion que se utiliza para borrar la pelicula seleccionada
    deleteMovie : async (title)=>{
       
    },
    //Funcion que se utiliza para actulizar algún dato de la pelicula, recibira
    updateMovie : async (id) =>{
        
    },
    // Funcion que obtiene los documentos de la coleccion de la bbdd
    getMovie : async (res,req)=>{
        try{
            const data = await Product.find()
            res.status(200).render('dashboardAdmin',data)
            
        }catch{

        }
        

        
    }
}