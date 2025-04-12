var express = require('express');
var session = require('express-session');

Product = require('../models/product');
Review = require('../models/review')

// Create router object
var router = express.Router();

router.get('/about', function(req, res){
    const ctx = {
        title: 'Cozybar',
        user: req.session.user
    }
    res.render('product/about');
});

router.get('/', async function(req, res) {
    if (req.session.user){
        product = await Product.find({});
        const ctx = {
            title: 'Cozybar',
            product: product,
            user: req.session.user
        }
        res.render('product/home', ctx);
    }
    else {
        res.redirect('/authentication')
    }
});

router.get('/admin', async function(req, res){
    if (req.session.user) {
        if (req.session.user.type == 'admin') {
            products = await Product.find({});
            ctx = {
                title: 'Cozybar',
                products: products,
                user: req.session.user
            }
            res.render('product/admin', ctx);
        }
        else {
            res.redirect('/');
        }
    }
    else {
        res.redirect('/authentication');
    }

});

router.post('/admin', async function(req, res){
    //read form data
    name = req.body.name;
    price = req.body.price;
    stock = req.body.stock;
    description = req.body.description;
    category = req.body.category;
    imgUrl = req.body.imgUrl;

    //create new product
    new_product = new Product ({
        name: name,
        price: price,
        stock: stock,
        description: description,
        category: category,
        imgUrl: imgUrl
    });

    //save the product
    await new_product.save();
    res.redirect('/product/admin')
});

router.get('/delete/:id', async function(req, res){
    id = req.params.id;
    await Product.deleteOne ({_id: id});
    res.redirect('/product/admin');
})

router.get('/update-product/:id', async function(req, res){
    id = req.params.id;
    product = await Product.findOne({_id: id});
    ctx = {
        title: 'Cozybar',
        product: product
    };
    res.render('product/updateProduct', ctx);
});

router.post('/update-product/:id', async function(req, res){
    data = {
        id: req.params.id,
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        imgUrl: req.body.imgUrl,
    }
  
    product = await Product.findByIdAndUpdate(id, data);
    res.redirect('/product/admin');
});

module.exports = router;