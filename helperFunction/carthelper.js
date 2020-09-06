var Cart = require('../model/cart');
var Product = require('../model/product');
var Rules = require('../model/rules');
var config = require('../config/config.json');

function getNewCartObject(reqData, callback){
    Product.findById(reqData.productId, function(err, productData){
        if(err){

            console.log("---------------", err);
            callback(err);
        }else{
            var data = {};
            data.productDetail = productData;
            Rules.find({"productId":reqData.productId, "isActive":true}, function(err, rulesData){
                
                if(rulesData.length && reqData.quantity>=rulesData[0].minQuantity){
                    data.quantity = req.quantity;
                    data.promoApplied = rulesData[0].name;
                    data.actualPrice = parseInt(productData.price * reqData.quantity);
                    data.discountedPrice = parseInt(data.actualPrice -  ((data.actualPrice * rulesData[0].discountpercentage)/100));
                    data.discountedPercent = rulesData[0].discountpercentage;
                    callback(data);
                }else{
                    data.quantity = reqData.quantity;
                    data.promoApplied = null;
                    data.actualPrice = parseInt(productData.price * reqData.quantity);
                    data.discountedPrice = parseInt(productData.price * reqData.quantity);
                    data.discountedPercent = 0;
                    callback(data);
                }
            });
        }
    });
}

function getCartvalue(cartData, callback){
    var data={};
    var totalPrice = 0;
    cartData.forEach(element => {
        totalPrice = totalPrice + parseInt(element.discountedPrice)
    });
    data.cartData = cartData;
    data.totalCartValue = totalPrice;

    Rules.find({"ruleTypeCode": config.ruleTypeCode.onCartValue, "isActive": true}, function(err, rulesData){
        console.log(rulesData)
        if(err){
            callback(err);
        }else{
            data.cartValueAfterDiscount = parseInt(data.totalCartValue -  ((data.totalCartValue * rulesData[0].discountpercentage)/100));
            callback(data);
        }
        
    })


}

function getCartValueMultiBuy(cartData, callback){
    var data={};
    var totalPrice = 0;
    cartData.forEach(element => {
        totalPrice = totalPrice + parseInt(element.discountedPrice)
    });
    data.cartData = cartData;
    data.totalCartValue = totalPrice;

    Rules.find({"ruleTypeCode": config.ruleTypeCode.onCartValue, "isActive": true}, function(err, rulesData){
        console.log(rulesData)
        if(err){
            callback(err);
        }else{
            data.cartValueAfterDiscount = parseInt(data.totalCartValue -  ((data.totalCartValue * rulesData[0].discountpercentage)/100));
            callback(data);
        }
        
    })


}


module.exports = {
    getNewCartObject: getNewCartObject,
    getCartvalue: getCartvalue
}