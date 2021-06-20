const fetch = require('node-fetch');
const User = require('../models/User')

const user = {
    search: (req, res) => {
        const rol = false
        res.status(200).render("search", { rol });
    },
    searchQuery: async (req, res) => {
        const rol = false
        const filmToSearch = req.body.filmSearch;

        let rsp = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&s=${filmToSearch}&type=movie`)
        let data = await rsp.json()
        let arrayFilms = data.Search
        let completeFilms = [];
        let message = data.Error
        // console.log(data)
        if(data.Response =='True'){
            for (let i = 0; i < arrayFilms.length; i++) {
                let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${arrayFilms[i].imdbID}`);
                let data = await response.json();
                completeFilms.push(data)
            }
            res.status(200).render('search', { completeFilms, rol })
        }else{
            res.status(404).render('search',{message,rol})
        }
    },
    searchTitle: async (req, res) => {

        let titulo = req.params.title;
        let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&t=${titulo}`);
        let film = await response.json()
        console.log(film);
        res.status(200).render('searchTitle', { film });

    },
    dashboard: (req, res) => {
        let rol = false
        res.status(200).render('dashboardUser', { rol })
    },

    addRemoveFavorite: async (req, res) => {
        let users = { //Cambbiar res.cookie
            user1: 'micorreo@prueba.com',
            user2: 'micorreo@prueba2.com'
        }
        let id = req.body.id;
        let state = req.body.state;
        console.log(id + " " + state)
        // if state == heartFull Delete
        if (state == 'heartFull')
            await User.deleteFavoriteFilm(id,users.user1)
        // else insert
        else 
            await User.insertFaVoriteFilm(id,users.user1)
    },

    getFavorites: async(req,res)=>{
        let users = {
            user1: 'micorreo@prueba.com',
            user2: 'micorreo@prueba2.com'
        }
        let rol = false
        let myFavorites= []
        let favorites = await User.getFavoritesFilms(users.user1)
        if(favorites){
            for (let index = 0; index <favorites.length; index++) {
                const element = favorites[index];
            
                if(/^tt/.test(element.idFilm)){
                    let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${element.idFilm}`)
                    let data = await response.json()
                    myFavorites.push(data)                   
                } 
                else{
                    //cuando este mergeado en develop model Admin de mongo requerirlo y utilizarlo
                }             
            };
            res.status(200).render('moviesUser',{myFavorites,rol})                    

        }else{
            console.log('no tienes favoritos')
        }
    }

}

module.exports = user;








