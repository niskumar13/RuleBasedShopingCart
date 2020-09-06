
cart = require('../model/cartModel');

exports.index = function (req, res) {
    cart.get(function (err, carts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "carts retrieved successfully",
            data: carts
        });
    });
};

exports.new = function (req, res) {
    var cart = new cart();
    cart.name = req.body.name ? req.body.name : cart.name;
    cart.gender = req.body.gender;
    cart.email = req.body.email;
    cart.phone = req.body.phone;
// save the cart and check for errors
    cart.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New cart created!',
                data: cart
            });
    });
};

exports.view = function (req, res) {
    cart.findById(req.params.cart_id, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
            message: 'cart details loading..',
            data: cart
        });
    });
};

exports.update = function (req, res) {
    cart.findById(req.params.cart_id, function (err, cart) {
        if (err)
            res.send(err);
        cart.name = req.body.name ? req.body.name : cart.name;
        cart.gender = req.body.gender;
        cart.email = req.body.email;
        cart.phone = req.body.phone;
// save the cart and check for errors
        cart.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'cart Info updated',
                data: cart
            });
        });
    });
};

exports.delete = function (req, res) {
    cart.remove({_id: req.params.cart_id}, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'cart deleted'
        });
    });
};
