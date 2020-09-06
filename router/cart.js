
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to cyrbilla cart!',
    });
});

var cartController = require('../controller/cartController');


router.route('/cart')
    .get(cartController.index)
    .post(cartController.new);

router.route('/cart/:user_id')
    .get(cartController.view)
    .patch(cartController.update)
    .put(cartController.update)
    .delete(cartController.delete);

module.exports = router;