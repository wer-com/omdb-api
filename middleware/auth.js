const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).send({error: 'Not authenticated'});
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, config.secret);
    }
    catch(error){
        return res.status(401).send({ error: 'Not authenticated' });
    }
    if(!decodedToken){
        return res.status(401).send({error: 'Not authenticated'});
    }
    req.userId = decodedToken.userId;
    next();
}