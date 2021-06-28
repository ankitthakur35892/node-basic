const express = require('express');
const router = express.Router();
const movieController = require('../controller/movies');
const user = require('../model/user');

router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.searchMovie);
router.post('/user', movieController.user);
router.post('/movieReview', movieController.movieReview);
router.post('/token', movieController.tokenUser);
router.post('/verify', movieController.verifyTokens);
router.post('/send', movieController.login)
module.exports = router;