
var Rules = require('../model/rules');

exports.index = function (req, res) {
    Rules.get(function (err, rules) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "rules retrieved successfully",
            data: rules
        });
    });
};

exports.new = function (req, res) {
    var rules = new Rules();
    
    rules.name = req.body.name || null;
    rules.discountpercentage = req.body.discountpercentage || 0;
    rules.discountValue = req.body.discountValue || 0;
    rules.minQuantity = req.body.minQuantity || null;
    rules.ruleTypeCode = req.body.ruleTypeCode;
    rules.createdAt = new Date();
    rules.isActive = true;
    rules.productId = req.body.productId || null;

    rules.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New rules created!',
                data: rules
            });
    });
    
};

exports.view = function (req, res) {
    Rules.findById(req.params.rulesId, function (err, rules) {
        if (err)
            res.send(err);
        res.json({
            message: 'rules details loading..',
            data: rules
        });
    });
};

exports.update = function (req, res) {
    Rules.findById(req.params.rulesId, function (err, rules) {
        if (err)
            res.send(err);
        
        rules.name = req.body.name || rules.name;
        rules.discountpercentage = req.body.discountpercentage || rules.discountpercentage;
        rules.discountValue = req.body.discountValue || rules.discountValue;
        rules.minQuantity = req.body.minQuantity || rules.minQuantity;
        rules.ruleTypeCode = req.body.ruleTypeCode || rules.ruleTypeCode;
        rules.createdAt = new Date();
        rules.isActive = true;
        rules.productId = req.body.productId || rules.productId;
        

        rules.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'rules Info updated',
                data: rules
            });
        });
    });
};

exports.delete = function (req, res) {
    Rules.remove({_id: req.params.rulesId}, function (err, rules) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'rules deleted'
        });
    });
};
