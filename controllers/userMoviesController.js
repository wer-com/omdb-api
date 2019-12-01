const User = require('../models/user');
const Movie = require('../models/movie');

exports.postUserMovies = async (req, res, next) => {
    const {userId} = req;
    const {body} = req;
    const movie = new Movie({ 
        ...body,User:userId
     });

    try{
        await movie.save();

        const user = await User.findById(userId);
        await user.movies.push(movie);
        await user.save();

        return res.status(201).send({movie: movie});
    }
    catch(error){
            if(!error.statusCode){
                error.statusCode = 500;
            }
            return res.status(error.statusCode).send({ error: error.message });
    }   
}

exports.getUserMovies = async (req,res,next) => {
    const {userId} = req;
    
    const movies = await Movie.find({ User: userId });

    if(!movies){
        return res.status(404).send({ error: "Couldn't find any movies" });
    }

    return res.status(200).send({ movies });
}

exports.getUserMovie = async (req,res,next) => {
    const {userId} = req;
    const {id} = req.params;

    const movie = await Movie.findOne({ User: userId, _id:id });

    if(!movie){
        return res.status(404).send({ error: "Couldn't find movie" });
    }

    return res.status(200).send({ movie });
}

exports.deleteUserMovie = async (req,res,next) => {
    const {userId} = req;
    const {id} = req.params;
    try{
        const movie = await Movie.findById(id)
        if(!movie){
            return res.status(404).send({ error: "Couldn't find movie" });
        }
        if(movie.User.toString() !== userId){
            return res.status(403).send({ error: "Not authorized! " });
        }
        await Movie.deleteOne({_id: id});
        const user = await User.findById(userId);
        await user.movies.pull(id);
        await user.save();
        return res.status(202).send({message:'Success',movie: {id: id}});
    }
    catch(error){
            if(!error.statusCode){
                error.statusCode = 500;
            }
            return res.status(error.statusCode).send({ error: error.message });
    }  
}
