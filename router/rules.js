
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to cyrbilla!',
    });
});

var rulesController = require('../controller/rulesController');


// list product
// add item product to cart
// return product present in cart

router.route('/rules')
    .get(rulesController.index)
    .post(rulesController.new);

router.route('/rules/:rules_id')
    .get(rulesController.view)
    .patch(rulesController.update)
    .put(rulesController.update)
    .delete(rulesController.delete);

module.exports = router;