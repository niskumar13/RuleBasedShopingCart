
var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    productId: {
        type: String,
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