var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/about', function(req, res){
    const ctx = {
        title: 'Cozybar',
        user: req.session.user
    }
    res.render('product/about', ctx);
});

module.exports = router;