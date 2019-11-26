const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('Please enter a vaild email.')
        .custom((value, {req}) =>{
            return User.findOne({email:value}).then(userDoc =>{
                if(userDoc){
                    return Promise.reject('E-Mail address already exists');
                }
            });
        })
        .normalizeEmail(),
        body('password').trim().isLength({min:6}),
        body('name').trim().isLength({min:6})
], authController.signup);

router.post('/login', authController.login);

module.exports = router;