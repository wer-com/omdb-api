const express = require('express');
const userMoviesController = require('../controllers/userMoviesController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/',auth,userMoviesController.getUserMovies);
router.get('/:id',auth,userMoviesController.getUserMovie);
router.post('/',auth,userMoviesController.postUserMovies);
router.delete('/:id',auth,userMoviesController.deleteUserMovie);

module.exports = router;