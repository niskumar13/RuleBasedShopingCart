var Product = require('../model/product');
var Rules = require('../model/rules');
var config = require('../config/config.json');


function getNewCartObject(reqData, callback){
    Product.findById(reqData.productId, function(err, productData){
        if(err){
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
    var productIdList = [];
    var priceWithoutDiscount = 0;
    cartData.forEach(element=>{
        productIdList.push(element.productDetail._id.toString().replace('"', ''));
        priceWithoutDiscount = priceWithoutDiscount + (element.productDetail.price*element.quantity);
    })
    let uniqueItems = [...new Set(productIdList)];

    var totalPrice = 0;
    
    Rules.find({"ruleTypeCode": config.ruleTypeCode.onProduct, "isActive": true}, function(err, ruleData){
  
        uniqueItems.forEach(element=>{
            var totalQuantity = 0;
            var unitPrice = 0;
            cartData.forEach(element2=>{
                if(element == element2.productDetail._id){
                    totalQuantity = totalQuantity + element2.quantity;
                    unitPrice = element2.actualPrice;
                }
            });
            var discountedPrice = 0;
            ruleData.forEach(element2=>{
                if(element == element2.productId){
                    if(totalQuantity >= element2.minQuantity){
                        var price = totalQuantity*unitPrice;
                        
                        discountedPrice = parseInt(price -  parseInt(parseInt(price * element2.discountpercentage)/100));
                    }else{
                        var price = totalQuantity*unitPrice;
                        
                        discountedPrice = price;
                    }
                }
                if(ruleData.some(ruleData => ruleData.productId == element)){
                    // do nothing
                }else{
                    var price = totalQuantity*unitPrice;
                    
                    discountedPrice = price;
                }
            });
            totalPrice= totalPrice + discountedPrice;
        });
        data.cartData = cartData;
        data.totalCartValue = totalPrice;


        Rules.find({"ruleTypeCode": config.ruleTypeCode.onCartValue, "isActive": true}, function(err, rulesData){
            if(err){
                
                callback(err);
            }else{
                if(data.totalCartValue>=rulesData[0].minPurchase){
                    
                    data.cartValueAfterDiscount = parseInt(data.totalCartValue - rulesData[0].discountValue);
                    
                    data.totalDiscount = priceWithoutDiscount - data.cartValueAfterDiscount;
                    callback(data);
                }else{
                    data.cartValueAfterDiscount = data.totalCartValue;
                    data.totalDiscount = priceWithoutDiscount - data.cartValueAfterDiscount;
                    callback(data);
                }
                
            }  
        });
    });
}

module.exports = {
    getNewCartObject: getNewCartObject,
    getCartvalue: getCartvalue
}