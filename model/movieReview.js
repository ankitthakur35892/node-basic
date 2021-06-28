const { text } = require('body-parser');
const mongoose = require('mongoose');
const movieReviewSchema = new mongoose.Schema({
    movieId: { type: mongoose.Types.ObjectId, ref: 'movies' },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' },
    rating: { type: Number },
    review: { type: String }
})
module.exports = mongoose.model('movieReview', movieReviewSchema);