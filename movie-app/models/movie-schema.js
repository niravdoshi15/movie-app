
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    reviewer_name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date_of_review: { type: Date, required: true },
    comments: { type: String }
});


var movieSchema = new Schema({
    title: { type: String, required: true, unique: true },    
    actors: { type: Array, required: true },
    directors: { type: Array, required: true },
    writers: { type: Array, required: false },
    music: { type: Array, required: false },
    singers: { type: Array, required: false },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: String, required: true },
    genre: { type: Array, required: true },
    language: { type: Array, required: false },
    awards: { type: Array, required: false },
    production: { type: String, required: true },
    category:{type:String, required:true},
    poster: { type: String, required: false },
    trailer: { type: String, required: false },
    reviews: [reviewSchema]
});

module.exports = mongoose.model('Movie', movieSchema);