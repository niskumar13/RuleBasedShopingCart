
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
 
var product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    product.find(callback).limit(limit);
}