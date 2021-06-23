const fetch = require('node-fetch');
const User = require('../models/User')
const Film = require('../models/Film')
const {scrapSensa, scrapFilmAffinity} = require('../utils/scrapping')
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
        if (data.Response == 'True') {
            for (let i = 0; i < arrayFilms.length; i++) {
                let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${arrayFilms[i].imdbID}`);
                let data = await response.json();
                completeFilms.push(data)
            }
            res.status(200).render('search', { completeFilms, rol })
        } else {
            console.log('********3********')
            console.log(filmToSearch)
            let result = await Film.find({Title:filmToSearch})
            result.forEach(element => {
                completeFilms.push(element)
            });
            
            res.status(200).render('search', {completeFilms, message, rol })
        }
    },
    searchTitle: async (req, res) => {
        let rol =false
        let titulo = req.params.title;
        let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&t=${titulo}`);
        let film = await response.json()
        let scrapSens = await scrapSensa(titulo)
        let scrapFilm = await scrapFilmAffinity(titulo)

        console.log('********************')
        console.log(scrapSens)
        console.log(scrapFilm)
        let pepe = 'pepe'
        if(film.Response == 'True'){
           res.status(200).render('searchTitle', { film, scrapFilm, scrapSens, pepe}); 
        }else{
            let pelimongo = await Film.find({Title:titulo})
            film =(pelimongo[0])
            res.status(200).render('searchTitle', {film} )
        }
        

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
        try {
            if (state == 'heartFull') {
                console.log('ESTAMOS EN DELETE')
                console.log(id)
                await User.deleteFavoriteFilm(id, users.user1)

                // res.json({redirect:'/favorites'})
                res.status(200)
            }
            else {
                console.log('ESTAMOS EN INSERT')
                console.log(id)
                await User.insertFaVoriteFilm(id, users.user1)
                res.status(200)
            }
        } catch (error) {
            console.log(error)
        }


    },

    getFavorites: async (req, res) => {
        let users = {
            user1: 'micorreo@prueba.com',
            user2: 'micorreo@prueba2.com'
        }
        let rol = false
        let myFavorites = []
        let favorites = await User.getFavoritesFilms(users.user1)
        
        if (favorites) {
            for (let index = 0; index < favorites.length; index++) {
                const element = favorites[index];
                console.log(element)
                if (/^tt/.test(element.idFilm)) {
                    let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${element.idFilm}`)
                    let data = await response.json()
                    myFavorites.push(data)
                }
                else {
                    let result = await Film.findOne({ filmId: element.idFilm })
                    myFavorites.push(result)
                }
            };
            res.status(200).render('moviesUser', { myFavorites, rol })

        } else {
            console.log('no tienes favoritos')
            res.status(200).render('moviesUser', { state: true })
        }
    }

}

module.exports = user;








