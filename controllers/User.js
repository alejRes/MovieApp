const fetch = require('node-fetch');


const user = {
  search: (req, res) => {
    res.status(200).render("search");
  },
  searchQuery: async (req, res) => {
    const filmToSearch = req.body.filmSearch;
    
    let rsp = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&s=${filmToSearch}&type=movie`)
    let data = await rsp.json()
    let arrayFilms= data.Search
    let completeFilms=[];
    for (let i = 0; i < arrayFilms.length; i++) {
        let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&i=${arrayFilms[i].imdbID}`);
        let data = await response.json();
        completeFilms.push(data)
      
    }
    console.log(completeFilms)
    res.status(200).render('searchData', {completeFilms})
  },
  searchTitle: async (req,res) =>{
    
    let titulo= req.params.title;
    let response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&t=${titulo}`);
    let film = await response.json()
    console.log(film);
    res.status(200).render('searchTitle',{film});

},
//   searchTitle: async(filmToSearch) =>{
//     const response = await fetch(`http://www.omdbapi.com/?apikey=b41b321e&s=${filmToSearch}&type=movie`);
//     const result = await response.json()
//     console.log(result)
//     return result
// }

  }

module.exports = user;

// {
//   Title: 'Cars',
//   Year: '2006',
//   Rated: 'G',
//   Released: '09 Jun 2006',
//   Runtime: '117 min',
//   Genre: 'Animation, Comedy, Family, Sport',
//   Director: 'John Lasseter, Joe Ranft(co-director)',
//   Writer: 'John Lasseter (original story by), Joe Ranft (original story by), Jorgen Klubien (original story by), Dan Fogelman (screenplay by), John Lasseter (screenplay by), Joe Ranft (screenplay by), Kiel Murray (screenplay by), Phil Lorin (screenplay by), Jorgen Klubien (screenplay by)',
//   Actors: 'Owen Wilson, Paul Newman, Bonnie Hunt, Larry the Cable Guy',
//   Plot: 'A hot-shot race-car named Lightning McQueen gets waylaid in Radiator Springs, where he finds the true meaning of friendship and family.',
//   Language: 'English, Italian, Japanese, Yiddish',
//   Country: 'USA',
//   Awards: 'Nominated for 2 Oscars. Another 28 wins & 32 nominations.',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMTg5NzY0MzA2MV5BMl5BanBnXkFtZTYwNDc3NTc2._V1_SX300.jpg',
//   Ratings: [ [Object], [Object], [Object] ],
//   Metascore: '73',
//   imdbRating: '7.1',
//   imdbVotes: '376,437',
//   imdbID: 'tt0317219',
//   Type: 'movie',
//   DVD: '01 Feb 2016',
//   BoxOffice: '$244,082,982',
//   Production: 'Walt Disney Pictures, Pixar Animation Studios',
//   Website: 'N/A',
//   Response: 'True'
// },


// {
//   Title: 'Avatar',
//   Year: '2009',
//   imdbID: 'tt0499549',
//   Type: 'movie',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: The Last Airbender',
//   Year: '2005–2008',
//   imdbID: 'tt0417299',
//   Type: 'series',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: The Last Airbender - The Legend of Aang',
//   Year: '2006',
//   imdbID: 'tt0959552',
//   Type: 'game',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BNjUwNzA5Nzc4N15BMl5BanBnXkFtZTgwNjM1ODY4MDE@._V1_SX300.jpg'
// },
// {
//   Title: "The King's Avatar",
//   Year: '2019',
//   imdbID: 'tt10732794',
//   Type: 'series',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BOGMxZDc1N2ItODI3NS00MDIwLWJkYzAtMTgyMDZlN2FlNGYzXkEyXkFqcGdeQXVyMjQ0OTYxOTc@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: The Game',
//   Year: '2009',
//   imdbID: 'tt1517155',
//   Type: 'game',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMTYxODI2OTI4MF5BMl5BanBnXkFtZTcwNjI1NzMwMw@@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: The Last Airbender - Into the Inferno',
//   Year: '2008',
//   imdbID: 'tt1459460',
//   Type: 'game',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BOWFjYWUwZTMtNjM2Mi00YjU3LWI2NjQtZTNhOTRhM2Q3YmJkXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: The Last Airbender - The Burning Earth',
//   Year: '2007',
//   imdbID: 'tt1459461',
//   Type: 'game',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BM2M5N2FkY2EtMTJmMy00NjdmLWEwYmEtYjljOWI0MjQ1M2MyXkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar Spirits',
//   Year: '2010',
//   imdbID: 'tt1900832',
//   Type: 'movie',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMzQ4MDMxNjExNl5BMl5BanBnXkFtZTgwOTYzODI5NTE@._V1_SX300.jpg'
// },
// {
//   Title: 'Avatar: Creating the World of Pandora',
//   Year: '2010',
//   imdbID: 'tt1599280',
//   Type: 'movie',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BYjk4ZDAxN2MtYjhlNy00MzJhLWI1MGYtYjY5ZGJlY2YwMzNlXkEyXkFqcGdeQXVyNTc0NjY1ODk@._V1_SX300.jpg'
// },
// {
//   Title: "The King's Avatar: For the Glory",
//   Year: '2019',
//   imdbID: 'tt10736726',
//   Type: 'movie',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMzFkZTMzOGUtOGM3NS00YzI2LTllMjgtODk0NDhkNWRiMTMzXkEyXkFqcGdeQXVyNzI1NzMxNzM@._V1_SX300.jpg'
// }
// ],
// totalResults: '68',
// Response: 'True'
// }







