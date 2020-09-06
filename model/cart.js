var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    productDetail:{
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    userId:{
        type: String, 
        required: true
    },
    quantity:{
        type: Number,
        required: true
    }, 
    actualPrice:{
        type: Number,
        required: true
    }, 
    discountedPrice:{
        type: Number,
        required: true
    },
    discountedPercent:{
        type: Number,
        required: true
    }, 
    promoApplied:{
        type: String
    },
    isActive:{
        type:Boolean,
        default: true
    }
}, { versionKey: false });

var Cart = module.exports = mongoose.model('cart', cartSchema);
module.exports.get = function (callback, limit) {
    Cart.find(callback).limit(limit);
}