
var Cart = require('../model/cart');
var Helper  = require('../helperFunction/carthelper');

exports.index = function (req, res) {
    Cart.get(function (err, carts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }else{
            res.json({
                status: "success",
                message: "carts retrieved successfully",
                data: carts
            });
        }
    });
}; 

exports.new = function (req, res) { 
    Helper.getNewCartObject(req.body, (responseObject)=>{
        
            var cart = new Cart();
            cart.productDetail = responseObject.productDetail;

            cart.createdAt = new Date();

            cart.userId = req.body.userId;
            cart.quantity = req.body.quantity;
            cart.actualPrice = responseObject.actualPrice;
            cart.discountedPrice = responseObject.discountedPrice;
            cart.discountedPercent = responseObject.discountedPercent;
            cart.promoApplied = responseObject.promoApplied;

            // save the cart and check for errors
            cart.save(function (err) {
                // Check for validation error
                if (err)
                    res.json(err);
                else
                    res.json({
                        message: 'New data added to cart!',
                        data: cart
                    });
            });
        
    });
};

exports.viewCart = function (req, res) {
    Cart.find({"userId":req.params.userId}, function(err, cartData){
        if(err){
            res.send(err);
        }else{
            Helper.getCartvalue(cartData, (finalData)=>{
                res.json({
                    message: 'cart data of user',
                    data: finalData
                })
            });
        }
    })
};

exports.updateCart = function(req, res){
    Cart.find({"userId":req.params.userId, "productId":req.params.productId, "isActive":true}, function (err, cart) {
        if (err)
            res.send(err);
        else{
            var reqData = {};
            reqData.productId = productId;
            reqData.quantity = req.body.quantity || cart[0].quantity;
            Helper.getNewCartObject(reqData, (err, responseObject)=>{
                if(err){
                    res.json(err);
                }else{
                    cart.productDetail = responseObject.productDetail;
                    cart.quantity = responseObject.quantity;
                    cart.actualPrice = responseObject.actualPrice;
                    cart.discountedPrice = responseObject.discountedPrice;
                    cart.discountedPercent = responseObject.discountedPercent;
                    cart.promoApplied = responseObject.promoApplied;

                    cart.save(function (err) {
                        if (err)
                            res.json(err);
                        res.json({
                            message: 'cart Info updated',
                            data: cart
                        });
                    });
                }

                
            })
        }
        
        
    });

    

};

exports.delete = function (req, res) {
    Cart.remove({userId: req.params.userId, productId: req.params.productId}, function (err, cart) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'product deleted from cart'
        });
    });
};
