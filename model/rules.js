var mongoose = require('mongoose');

var rulesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actualprice: {
        type: Number,
        required: true
    },
    discountprice: {
        type: Number,
        required: true
    },
    minQuantity: {
        type: Number,
        required: true, 
        default: 0
    },
    additionalDiscount:{
        type: Number,
        required: false
    },
    additionalDiscountMinCartValue:{
        type: Number,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    isActive:{
        type: Boolean,
        required: true, 
        default: true
    },
    productId:{
        type: String,
        required: true
    }
});

var rules = module.exports = mongoose.model('rules', rulesSchema);
module.exports.get = function (callback, limit) {
    rules.find(callback).limit(limit);
}