var express = require('express');
var session = require('express-session');

Product = require('../models/product');

var router = express.Router();

router.get('/cart', async function(req, res) {
    if (req.session.user){
        cartItems = [];
        totalPrice = 0;

        for (itemId of req.session.cart) {
            product = await Product.findOne({_id: itemId});
            cartItems.push(await product);
            totalPrice = totalPrice + product.price;
        }

        const ctx = {
            title: 'Cozybar',
            cartItems: cartItems,
            user: req.session.user,
            totalPrice: totalPrice
        }
        res.render('order/cart', ctx);
    }
    else {
        res.redirect('/authentication')
    }
});

router.get('/cart/add/:id', async function(req, res){
    if (req.session.user){
        id = req.params.id;
        req.session.cart.push(id);
        res.redirect('/order/cart');
    }
    else {
        res.redirect('/authentication')
    }
});

router.get('/cart/delete/:id', async function(req, res){
    if (req.session.user){
        id = req.params.id;

        newCart = [];
        for (itemId of req.session.cart) {
            if (itemId != id) {
                newCart.push(itemId);
            }
        }
        req.session.cart = newCart;
        res.redirect('/order/cart');
    }
    else {
        res.redirect('/authentication')
    }
});

module.exports = router;