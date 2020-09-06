
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
    imageUrl:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });
 
var Product = module.exports = mongoose.model('product', productSchema);
module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}