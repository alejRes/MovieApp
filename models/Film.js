const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const filmSchema = new Schema({

    id: {
        type:Number,
        required: true,
        unique: true
    },
    Title: {
        type: String,
        required: true,
        unique: true
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

    },
    Director: {

    },
    imbRating: {

    },
    Actors:{

    },
    Country:{
        
    },
    Language:{

    },
    Awards:{

    },
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const Film = mongoose.model("Film", filmSchema);
module.exports = Film;




