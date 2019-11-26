const express = require('express');
const bodyParser = require('body-parser');
const moviesRoutes = require('./routes/moviesRoutes');
const userMoviesRoutes = require('./routes/userMoviesRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const config = require('./config/config');

const PORT = 4000;
const app = express();

app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type Authorization");
    res.setHeader( "Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    next();
})


app.use('/movies',moviesRoutes);
app.use('/auth',authRoutes);
app.use('/user/movies',userMoviesRoutes);


mongoose.connect(config.urlMongo, {useUnifiedTopology: true, useNewUrlParser: true })
.then(result =>{
    app.listen(PORT);
})
.catch(err => console.log(err));

