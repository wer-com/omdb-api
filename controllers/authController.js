const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signup = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).send({ message: 'Validation failed.'});
    }
    const {email,name,password} = req.body;
    bcrypt.hash(password,12)
    .then( pwd => {
        const user = new User({
          email:email,
          name:name,
          password:pwd  
        });
        return user.save();
    })
    .then( result => {
        res.status(201).send({ message: 'User created!', userId: result._id})
    })
    .catch(error => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        return res.status(error.statusCode).send({ error: error.message });
    });
};

exports.login = (req,res,next) => {
    const {email,password} = req.body;
    let loadedUser;
    User.findOne({email:email})
    .then( user => {
        if(!user){
            return res.status(401).send({ message: 'There is no such a user.'});
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then( result => {
        if(!result){
            return res.status(401).send({ error: 'wrong password' });
        }
        const token = jwt.sign({ email: loadedUser.email, userId: loadedUser._id.toString()}, config.secret, {expiresIn: '2h'} );
        res.status(200).send({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(error => {
        if(!error.statusCode){
            error.statusCode = 500;
        }
        return res.status(error.statusCode).send({ error: error.message });
    });
}