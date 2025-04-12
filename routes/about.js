var express = require('express');
var session = require('express-session');
var router = express.Router();
const Review = require('../models/review');

router.get('/about', function(req, res){
    const ctx = {
        title: 'Cozybar',
        user: req.session.user
    }
    res.render('product/about', ctx);
});

router.get('/about', async function(req, res){
    const reviews = await Review.find()
        .populate('user', 'username')
        .sort({ createdAt: -1 });

    res.render('product/about', {
        reviews, 
        user: req.session.user
    });
});

module.exports = router;