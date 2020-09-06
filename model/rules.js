var mongoose = require('mongoose');

var rulesSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    discountpercentage: {
        type: Number,
        required: false
    },
    minQuantity: {
        type: Number,
        required: false
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
        required: false
    }
});

var Rules = module.exports = mongoose.model('rules', rulesSchema);
module.exports.get = function (callback, limit) {
    Rules.find(callback).limit(limit);
}