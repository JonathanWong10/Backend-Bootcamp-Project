const express = require('express');
const router = express.Router();
const Review = require('../models/review');

router.post('/submit', async (req, res) => {
    content = req.body.content;
    rating = req.body.rating;

    const newReview = new Review({
        user: req.session.user._id,
        content: req.body.content,
        rating: req.body.rating
    });
    const savedReview = await newReview.save();
    res.redirect('/reviews');
});

router.get('/', async (req, res) => {
    const reviews = await Review.find().populate('user', 'username');
    res.render('product/review', { 
        reviews,
        user: req.session.user
     });
});

module.exports = router;