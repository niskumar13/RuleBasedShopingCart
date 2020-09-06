
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to cyrbilla cart!',
    });
});

var cartController = require('../controller/cartController');
const cart = require('../model/cart');


router.route('/cart')
    .get(cartController.index)
    .post(cartController.new);

router.route('/cart/:userId').get(cartController.viewCart);

router.route('/cart/:userId/:productId')
.patch(cartController.updateCart)
.delete(cartController.delete);

module.exports = router;