const express = require('express');
const moviesController = require('../controllers/moviesController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,moviesController.getMovies);
router.get('/:id',auth,moviesController.getMovie);

module.exports = router;