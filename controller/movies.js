const movies = require('../model/movies');
const User = require('../model/user');
const Review = require('../model/movieReview');
const jwt = require('jsonwebtoken');
// create movie
exports.createMovie = async(req, res) => {

        // 
        let verifyToken = jwt.verify(req.headers.token, 'secret');
        if (!verifyToken) {
            return res.json({ msg: "Invalid token" })
        }
        // 
        req.body.userId = verifyToken.id;
        const createMovie = await movies.create(req.body);
        res.json({
            message: 'movie created',
            movies: createMovie
        })
    }
    // search movie
exports.searchMovie = async(req, res) => {
    // let date = req.query.date;
    // let name = req.query.name;
    // let budget = req.query.budget;
    // let earning = req.query.earning;
    // let rating = req.query.rating;

    let { date, name, budget, earning, rating, from, upto } = req.query;
    let query = {}
    if (date) {
        query = {
            releaseDate: date
        }
    } else if (from && upto) {
        query = {
            $and: [
                { releaseDate: { $gt: new Date(from) } },
                { releaseDate: { $lt: new Date(upto) } },
            ]
        }
    } else if (name) {
        query = {
            name: name
        }
    } else if (budget) {
        query = {
            budget: budget
        }
    } else if (earning) {
        query = {
            earning: earning
        }
    } else {
        query = {
            rating: rating
        }
    }
    const searchMovie = await movies.find({}).populate("userId", "name email");
    res.json({
        message: 'you are searching for:',
        movies: searchMovie
    })
}

//create user
exports.user = async(req, res) => {
        const isExist = await User.findOne({ email: req.body.email });
        if (isExist) {

            return res.json({ msg: 'User existed ' })
        }
        const createUser = await User.create(req.body);
        res.json({
            message: 'user created',
            user: createUser
        })
    }
    // review
exports.movieReview = async(req, res) => {
    const isRated = await Review.findOne({ userId: req.body.userId, movieId: req.body.movieId });
    if (isRated) {
        return res.json({
            message: 'rated already'
        })
    }
    const review = await Review.create(req.body);
    const avgRating = await Review.find({});
    const count = await Review.countDocuments();
    let avg;
    if (avgRating) {
        let sum = 0;
        avgRating.map(m => {
            sum += m.rating;

        })
        avg = parseInt(sum / count)
    }

    await movies.findByIdAndUpdate(req.body.movieId, {
        $set: {
            rating: avg
        }
    })

    res.json({
        message: 'review added',
        movieReview: review,
        avg,
        avgRating
    })
}

exports.tokenUser = async(req, res) => {
    const user = await User.findOne(req.body.name);
    let token;
    if (user) {
        token = jwt.sign({ id: user._id }, 'secret', { expiresIn: "2h" })
    }
    res.json({
        message: 'token generated',
        token
    })
}

exports.verifyTokens = async(req, res) => {
        const token = req.body.token;
        let verifyToken = jwt.verify(token, 'secret');
        console.log({ verifyToken });
        if (!verifyToken) {
            return res.json({ msg: "Invalid token" })
        }
        res.json({
            message: 'token verified',
        })
    }
    // verify user and then send token
exports.login = async(req, res) => {
    const userName = await User.findOne({ name: req.body.name, password: req.body.password });
    if (!userName) {
        return res.json({
            msg: 'user not found'
        })
    }
    let token = jwt.sign({ id: User._id }, 'secret', { expiresIn: "2h" })
    res.json({
        msg: 'token sent',
        token
    })
}




















// let user = await User.findById(verifyToken.id);
// if (!user) {
//     return res.json({ msg: "Invalid token" })
// }






// let movie = movies.findByIdAndUpdate(req.body.movieId, { rating: avg })