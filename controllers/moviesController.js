const { key, urlOmdb} = require('../config/config');
const got = require('got');

exports.getMovies = async (req,res,next) =>{
    const { title } = req.query;
    if(!title || title.length<3){
        return res.status(400).send({ error: "Bad params." });
    }
    try {
        const response = await got(`${urlOmdb}?s=${title}&apikey=${key}`);
        return res.status(200).send(response.body);
    } 
    catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        return res.status(error.statusCode).send({ error: error.message });
    }
}

exports.getMovie = async (req,res,next) =>{
    const { id } = req.params;
    try {
        const response = await got(`${urlOmdb}?i=${id}&apikey=${key}`);
        return res.status(200).send(response.body);
    } 
    catch (error) {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        return res.status(error.statusCode).send({ error: error.message });
    }
}