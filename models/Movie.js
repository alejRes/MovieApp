const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({

    Title: {
        type: String,
        required: true,
        unique: true
    },
    Year: {
        type: Number,
        required: true
    },
    Runtime: {
        type: Number,
        required: true
    },
    Genre: {
        type: String,
        require: true
    },
    Director: {
        type: String,
        required: true
    },
    Actors:{
        type: String,
        required: true
    },
    Plot: {
        type: String,
        require: true
    },
    Awards:{
        type: String
    },
    Language:{
        type: String
    },
    Country:{
        type: String
    },
    Poster: {
        type: String,
        validate: {
            validator: function(text) {
            return text.indexOf('https://') === 0;
            },
            message: "La URL tiene que comenzar por https://"
        }
    },
    imdbRating: {
        type: Number,
        required: true
    },
    
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});
const Movie = mongoose.model("Film", movieSchema);
module.exports = Movie

// {
//   Title: 'Avatar',
//   Year: '2009',
//   Rated: 'PG-13',
//   Released: '18 Dec 2009',
//   Runtime: '162 min',
//   Genre: 'Action, Adventure, Fantasy, Sci-Fi',
//   Director: 'James Cameron',
//   Writer: 'James Cameron',
//   Actors: 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang',
//   Plot: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
//   Language: 'English, Spanish',
//   Country: 'USA, UK',
//   Awards: 'Won 3 Oscars. Another 86 wins & 130 nominations.',
//   Poster: 'https://m.media-amazon.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg',
//   Ratings: [
//     { Source: 'Internet Movie Database', Value: '7.8/10' },
//     { Source: 'Rotten Tomatoes', Value: '82%' },
//     { Source: 'Metacritic', Value: '83/100' }
//   ],
//   Metascore: '83',
//   imdbRating: '7.8',
//   imdbVotes: '1,134,555',
//   imdbID: 'tt0499549',
//   Type: 'movie',
//   DVD: '10 Feb 2016',
//   BoxOffice: '$760,507,625',
//   Production: 'Dune, Lightstorm Entertainment, Ingenious Film Partners',
//   Website: 'N/A',
//   Response: 'True'
// }