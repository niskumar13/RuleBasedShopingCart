
let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to cyrbilla rules interface!',
    });
});

var rulesController = require('../controller/rulesController');


router.route('/rules')
    .get(rulesController.index)
    .post(rulesController.new);

router.route('/rules/:rulesId')
    .get(rulesController.view)
    .patch(rulesController.update)
    .put(rulesController.update)
    .delete(rulesController.delete);

module.exports = router;