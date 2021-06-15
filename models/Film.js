const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({

   /*  id: {
        type:Number,
        required: true,
        unique: true
        
    }, */
    Title: {
        type: String,
        required: true,
        unique: true
    },
    Released: {
        type: String
         
    },
    Year: {
        type: Number,
        required: true
    },
    Plot: {
        type: String,
        require: true

    },
    Genre: {
        type: String,
        require: true

    },
    Poster: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://') === 0;
            },
            message: 'La url debe empezar por https://'
        }
    },
    Runtime: {
        type: Number,
        // required: true
    },
    Director: {
        type: String,
        // required: true
    },
    imdbRating: {
        type: Number,
        default: 0
        
    },
    Actors:{
        type: String,
        default: 'N/A'

    },
    Country:{
        type: String
    },
    Language:{
        type: String
    },
    Awards:{
        type: String

    },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});


const Film = mongoose.model("Film", filmSchema);
module.exports = Film;




