const fetch = require("node-fetch");
const User = require("../models/User");
const Film = require("../models/Film");
const service = require("../services/index");
const sql = require("../models/sql");
const { scrapSensa, scrapFilmAffinity } = require("../utils/scrapping");
const user = {
  search: (req, res) => {
    const rol = req.locals.rol;
    if (!rol) res.status(200).render("search", { rol });
    else res.status(200).redirect("/movies");
  },
  searchQuery: async (req, res) => {
    const rol = false;
    const filmToSearch = req.body.filmSearch;

    let rsp = await fetch(
      `http://www.omdbapi.com/?apikey=b41b321e&s=${filmToSearch}&type=movie`
    );
    let data = await rsp.json();
    let arrayFilms = data.Search;
    let completeFilms = [];
    let message = data.Error;
    // console.log(data)
    if (data.Response == "True") {
      for (let i = 0; i < arrayFilms.length; i++) {
        let response = await fetch(
          `http://www.omdbapi.com/?apikey=b41b321e&i=${arrayFilms[i].imdbID}`
        );
        let data = await response.json();
        completeFilms.push(data);
      }
      res.status(200).render("search", { completeFilms, rol });
    } else {
      console.log("********3********");
      console.log(filmToSearch);
      let result = await Film.find({ Title: filmToSearch });
      result.forEach((element) => {
        completeFilms.push(element);
      });

      res.status(200).render("search", { completeFilms, message, rol });
    }
  },
  searchTitle: async (req, res) => {
    let rol = req.locals.rol;
    let titulo = req.params.title;
    if (rol) {
      res.status(301).redirect("/movies");
    } else {
      let response = await fetch(
        `http://www.omdbapi.com/?apikey=b41b321e&t=${titulo}`
      );
      let film = await response.json();
      let scrapSens = await scrapSensa(titulo);
      let scrapFilm = await scrapFilmAffinity(titulo);

      console.log("********************");
      console.log(scrapSens);
      console.log(scrapFilm);
      let pepe = "pepe";
      if (film.Response == "True") {
        res
          .status(200)
          .render("searchTitle", { film, scrapFilm, scrapSens, pepe });
      } else {
        let pelimongo = await Film.find({ Title: titulo });
        film = pelimongo[0];
        res.status(200).render("searchTitle", { film, rol });
      }
    }
  },
  dashboard: (req, res) => {
    let rol = false;
    res.status(200).render("dashboardUser", { rol });
  },

  addRemoveFavorite: async (req, res) => {
    let users = req.locals.email;
    let id = req.body.id;
    let state = req.body.state;
    console.log(id + " " + state);
    // if state == heartFull Delete
    try {
      if (state == "heartFull") {
        console.log("ESTAMOS EN DELETE");
        console.log(id);
        await User.deleteFavoriteFilm(id, users);

        // res.json({redirect:'/favorites'})
        res.status(200);
      } else {
        console.log("ESTAMOS EN INSERT");
        console.log(id);
        await User.insertFaVoriteFilm(id, users);
        res.status(200);
      }
    } catch (error) {
      console.log(error);
    }
  },

  getFavorites: async (req, res) => {
    let users = req.locals.email;
    let rol = req.locals.rol;
    let myFavorites = [];
    if (rol) {
      res.status(200).redirect("/movies");
    } else {
      let favorites = await User.getFavoritesFilms(users);

      if (favorites) {
        for (let index = 0; index < favorites.length; index++) {
          const element = favorites[index];
          console.log(element);
          if (/^tt/.test(element.idFilm)) {
            let response = await fetch(
              `http://www.omdbapi.com/?apikey=b41b321e&i=${element.idFilm}`
            );
            let data = await response.json();
            myFavorites.push(data);
          } else {
            let result = await Film.findOne({ filmId: element.idFilm });
            myFavorites.push(result);
          }
        }
        res.status(200).render("moviesUser", { myFavorites, rol });
      } else {
        console.log("no tienes favoritos");
        res.status(200).render("moviesUser", { state: true });
      }
    }
  },
};

async function signUp(req, res) {
  const user = {
    email: req.body.username,
    password: req.body.password,
    password2: req.body.password2,
  };
  let status;
  let login;
  try {
    status = 200;
    login = await sql.createUser(user.email, user.password);
  } catch (e) {
    login = null;
    console.error(e);
    status = 400;
  } finally {
    console.log(login);
    if (login.insertId) {
      res.cookie("session-cookie");
    }
     res.status(status).redirect("/movies");
  }
}

function signUpForm(req, res) {
  res.status(200).render("signup");
}

async function logIn(req, res) {
  let result = await sql.getUser(req.body.username, req.body.password);
  console.log("controllers user", result);
  if (result) {
    res
      .cookie("session-cookie", service.createToken(result), {
        maxAge: 60 * 60 * 24 * 5 * 1000,
        httpOnly: true,
      })
      .status(200)
      .redirect("/movies");
  } else {
    res.status(404).redirect("/singup");
  }
}

function getHome(req, res) {
  //console.log("hola !!!!!")
  res.status(200).render("home");
}

function getDashboard(req, res) {
  console.log(res.locals.rol);
  if (res.locals.rol > 0) {
    res.redirect(302, "/home");
  } else {
    res.redirect(400, "/");
  }
  res.status(200).render("dashboard");
}
function logOut(req, res) {
  res.clearCookie("session-cookie");
  res.redirect("/");
}
module.exports = {
  signUp,
  logIn,
  getHome,
  getDashboard,
  signUpForm,
  logOut,
  user,
};
