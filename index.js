const mongoose = require('mongoose');
const express = require('express');
const movieRoutes = require('./routes/movies')
const app = express();
app.use(express.json())
app.use('/api', movieRoutes)
app.listen(4000, () => { console.log('listening on port 8000'); })
mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {
        console.log('connected successfully');
    })
    .catch((err) => {
        console.log(err);
    });






















































// const movieReviews = await movies.find({});
// const count = await movies.countDocuments();
// let avg;
// if (movieReviews) {
//     let sum = 0;
//     movieReviews.map(m => {
//         sum += m.rating;
//     })

//     avg = parseInt(sum / count);
// }








// movieId: req.body.movieId