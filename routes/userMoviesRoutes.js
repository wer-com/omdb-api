const express = require('express');
const userMoviesController = require('../controllers/userMoviesController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,userMoviesController.getMovies);
router.get('/:id',auth,userMoviesController.getMovie);
router.post('/',auth,userMoviesController.postMovies);
router.delete('/:id',auth,userMoviesController.deleteMovie);

module.exports = router;