
var Product = require('../model/product');

exports.index = function (req, res) {
    Product.get(function (err, product) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "product retrieved successfully",
            data: product
        });
    });
};

exports.new = function (req, res) {
    var product = new Product();
    if(req.body.name && req.body.price){
        product.name = req.body.name;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl || null;
        product.createdAt = new Date();

        product.save(function (err) {
            if (err)
                res.json(err);
            else
                res.json({
                    message: 'New product created!',
                    data: product
                });
        });
    }
    else
    {
        res.json({
            message: 'ERROR: name and price are required ',
            data: req.body
        })

    }
};

exports.view = function (req, res) {
    Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'product details loading..',
            data: product
        });
    });
};

exports.update = function (req, res) {
    Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err);
        
        product.name = req.body.name || product.imageUrl;
        product.price = req.body.price || product.price;
        product.imageUrl = req.body.imageUrl || product.imageUrl;
        

        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'product Info updated',
                data: product
            });
        });
    });
};

exports.delete = function (req, res) {
    Product.remove({_id: req.params.productId}, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'product deleted'
        });
    });
};
