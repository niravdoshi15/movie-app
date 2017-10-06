
const express = require('express');
var multer = require('multer');
var path = require('path');

var MoviesSchema = require('../models/movie-schema');

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(__dirname, '../uploads'))
    },
    filename: function (req, file, callback) {
        var ext=path.extname(file.originalname);
        callback(null, req.body.title+ext);
    }
});

//Get all movies
//GET /api/movies
router.get('/', (req, res) => {
    MoviesSchema.find((err, docs) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve movies data', error: err })
        }
        else {
            res.json(docs);
        }
    });
});

//Get a single movie object by Id
//GET /api/movies/:id
router.get('/:id', (req, res) => {
    MoviesSchema.findById({ _id: req.params.id }, (err, doc) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Unable to retrieve movie object', error: err });
        } else {
            res.json(doc);
        }
    });
});

//Add a new movie
//POST /api/movies
router.post('/',(req,res)=>{
    //var upload = multer({ storage: storage }).array('files');
    var upload = multer({ storage: storage }).fields([{ name: 'poster', maxCount: 1 }, { name: 'trailer', maxCount: 1 }]);
    upload(req, res, function (err) {
        if (err) {
          res.json({message:"Failed to upload file", error: err});
        }

        //If upload success save movie details
        var movie = new MoviesSchema(req.body);
        movie.actors=(movie.actors.length>0)?movie.actors[0].split(','):movie.actors;
        movie.directors=(movie.directors.length>0)?movie.directors[0].split(','):movie.directors;
        movie.writers=(movie.writers.length>0)?movie.writers[0].split(','):movie.writers;
        movie.music=(movie.music.length>0)?movie.music[0].split(','):movie.music;
        movie.singers=(movie.singers.length>0)?movie.singers[0].split(','):movie.singers;
        movie.genre=(movie.genre.length>0)?movie.genre[0].split(','):movie.genre;
        movie.language=(movie.language.length>0)?movie.language[0].split(','):movie.language;
        movie.awards=(movie.awards.length>0)?movie.awards[0].split(','):movie.awards;        
        if(req.files.poster.length>0){
            movie.poster=`http://${req.get('host')}/uploads/${req.files.poster[0].filename}`;
        }
        if(req.files.trailer.length>0){
            movie.trailer=`http://${req.get('host')}/uploads/${req.files.trailer[0].filename}`;
        }
        movie.save((err, doc) => {
            if (err) {
                res.json({ message: "Error in adding movie details", error: err });
            }
            else {
                res.json({ message: 'Movie details added successfully', movie: doc, location: `/api/movies/${doc._id}` });
            }
        });
    });
});

//Update the movie object
//PUT /:id
router.put("/:id", (req, res) => {
    var upload = multer({ storage: storage }).fields([{ name: 'poster', maxCount: 1 }, { name: 'trailer', maxCount: 1 }]);
    upload(req, res, function (err) {
        if (err) {
          res.json({message:"Failed to upload file", error: err});
        }

        //If upload success save movie details
        var movie = new MoviesSchema(req.body);
        movie.id=req.params.id;
        movie.actors=(movie.actors.length>0)?movie.actors[0].split(','):movie.actors;
        movie.directors=(movie.directors.length>0)?movie.directors[0].split(','):movie.directors;
        movie.writers=(movie.writers.length>0)?movie.writers[0].split(','):movie.writers;
        movie.music=(movie.music.length>0)?movie.music[0].split(','):movie.music;
        movie.singers=(movie.singers.length>0)?movie.singers[0].split(','):movie.singers;
        movie.genre=(movie.genre.length>0)?movie.genre[0].split(','):movie.genre;
        movie.language=(movie.language.length>0)?movie.language[0].split(','):movie.language;
        movie.awards=(movie.awards.length>0)?movie.awards[0].split(','):movie.awards;        
        if(req.files.poster.length>0){
            movie.poster=`http://${req.get('host')}/uploads/${req.files.poster[0].filename}`;
        }
        if(req.files.trailer.length>0){
            movie.trailer=`http://${req.get('host')}/uploads/${req.files.trailer[0].filename}`;
        }

        MoviesSchema.findByIdAndUpdate({ _id: req.params.id }, movie, (err, doc) => {
            if (err) {
                res.json({ message: "Error in updating movie", error: err })
            } else {
                res.json({ message: "Movie updated successfully", location: `/api/movies/${doc._id}` })
            }
        });
    });
});

//Delete movie by Id
//DELETE /:id
router.delete("/:id", (req, res) => {
    MoviesSchema.findByIdAndRemove({ _id: req.params.id }, (err, doc) => {
        if (err) {
            res.json({ message: "Error in deleting movie", error: err })
        } else {
            res.json({ message: "Movie deleted successfully", movie: doc })
        }
    });
});

//List all reviews and comments for a movie
//GET /:id/reviews
router.get("/:id/reviews", (req, res) => {
    MoviesSchema.findById({ _id: req.params.id }, 'reviews', (err, reviews) => {
        if (err) {
            res.json({ message: 'Unable to retrieve reviews information for movie' });
        } else {
            res.json(reviews);
        }
    });
});

//Return the list of top n movies based on reviews
//GET /top/:count
router.get('/top/:count', function (req, res) {
    var count = parseInt(req.params.count);
    var aggregate_options = [
        { $unwind: '$reviews' },
        { $group: { _id: '$_id', average_rating: { $avg: '$reviews.rating' } } },
        { $sort: { 'average_rating': -1 } },
        { $limit: count }
    ];
    MoviesSchema.aggregate(aggregate_options, function (err, docs) {
        if (err) {
            res.json({ message: "Unable to get top movie list" });
        } else {
            res.json(docs);
        }
    })
});

//Add a new review for a movie
//POST /:id/reviews
router.post('/:id/reviews', function (req, res) {
    var query = { $addToSet: { reviews: req.body } }
    MoviesSchema.findByIdAndUpdate(req.params.id, query, (err, doc) => {
        if (err) {
            res.json({ message: "No movie found with mentioned id", error: err });
        }
        else {
            res.json({ message: 'New review added to the movie' });
        }
    })
});


module.exports = router;