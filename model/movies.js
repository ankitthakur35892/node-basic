const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name: { type: String },
    releaseDate: { type: Date },
    budget: { type: Number },
    earning: { type: Number },
    rating: { type: Number },
    userId: { type: mongoose.Types.ObjectId, ref: 'user' }
});
module.exports = mongoose.model('movies', movieSchema);