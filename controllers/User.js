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
        for (let i = 0; i < arrayFilms.length; i++) {
            let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${arrayFilms[i].imdbID}`);
            let data = await response.json();
            completeFilms.push(data)

        }
        console.log(completeFilms)
        res.status(200).render('search', { completeFilms, rol })
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
        let user = {
            user1: 'micorreo@prueba.com',
            user2: 'micorreo@prueba2.com'
        }
        let id = req.body.id;
        let state = req.body.state;
        console.log(id + " " + state)
        // if state == heartFull Delete
        // else insert
    }

}

module.exports = user;








