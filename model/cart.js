
var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    productDetail:{
        type: Object,
        required: true
    },
    discountDetail:{
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

var Cart = module.exports = mongoose.model('cart', cartSchema);
module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
}