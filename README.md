Requirement:
1) NODE : version 14.8.0
2) mongoDB: version 4.4.0


TO RUN APPLICATION:
1) npm install
2) node index.js

Note: 
1) MONGODB server must be running 
2) follow this order in order to add product 

	add product | add rules | add product to cart |	fetch cart for user

#######################################################################################
									API LIST
#######################################################################################

METHOD:POST
URL: http://localhost:3000/product/products/
DESCRIPTION: this API will add product in db
REQUEST_BODY: 
{ 
	"name": "A",
	"price": 30,
	"imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
}
RESPONSE_BODY:
{
    "message": "New product created!",
    "data": {
        "_id": "5f5534fdc1758e320c9493c9",
        "createdAt": "2020-09-06T19:14:05.931Z",
        "name": "A",
        "price": 30,
        "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
    }
}
#######################################################################################

METHOD: POST

URL: http://localhost:3000/rules/rules/

DESCRIPTION: this API will create rules for promotion of product. This example request is for 

NOTE: 
	1) only one promotion can be active agsinst a particular product
	2) ruleTypeCode 1 means discount applicable on product with min quantiy
	3) ruleTypeCode 2 means discount applicable on total cart value

EXAMPLE 1: for promo rules based on min number of particular product on cart

	REQUEST_BODY:{ 
		"name": "buy 3 @ 75",                        // promo name
		"discountpercentage": 16.67,                 // discount percentage
		"minQuantity": 3,                            // minimum number of product in cart for promo to apply
		"ruleTypeCode": 1,                           // code for promo based on quantity of product
		"productId": "5f5534fdc1758e320c9493c9"      // product id of product A
	}

	RESPONSE_BODY: {
		"message": "New rules created!",
		"data": {
			"isActive": true,
			"_id": "5f5536efc1758e320c9493cd",
			"createdAt": "2020-09-06T19:22:23.191Z",
			"name": "buy 3 @ 75",
			"discountpercentage": 16.67,
			"minQuantity": 3,
			"ruleTypeCode": "1",
			"productId": "5f5534fdc1758e320c9493c9"
		}
	} 

EXAMPLE 2: for promo rules based on cart value

	REQUEST_BODY:{ 
		"name": "Shop for 150 and pay 20 rupee less",  // promo name
		"discountValue": 20,                           // discount value in terms of rupee 
		"minPurchase": 150,							   // min cart value in order to apply this discount rule
		"ruleTypeCode": 2                              // code for promo based on shopping limit
	}

	RESPONSE_BODY:{
		"message": "New rules created!",
		"data": {
			"isActive": true,
			"_id": "5f553947611715145c244778",
			"createdAt": "2020-09-06T19:32:23.135Z",
			"name": "Shop for 150 and pay 20 rupee less",
			"discountpercentage": 0,
			"discountValue": 20,
			"minQuantity": null,
			"ruleTypeCode": "2",
			"productId": null
		}
	}

#######################################################################################

METHOD: POST

URL: http://localhost:3000/cart/cart/

DESCRIPTION: to add product in cart for a user. here user ID is taken randomly 

REQUEST_BODY:
{ 
    "userId": "123456789",                             // id of user 
    "quantity": 1,                                     // quantity of product
    "productId": "5f5534fdc1758e320c9493c9"            // product id of product which user is adding to cart
}

RESPONSE_BODY:
{
    "message": "New data added to cart!",
    "data": {
        "isActive": true,
        "_id": "5f553bb60d6a9945d4244746",
        "createdAt": "2020-09-06T19:42:46.983Z",
        "productDetail": {
            "_id": "5f5534fdc1758e320c9493c9",
            "createdAt": "2020-09-06T19:14:05.931Z",
            "name": "A",
            "price": 30,
            "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
        },
        "userId": "123456789",
        "quantity": 1,
        "actualPrice": 30,
        "discountedPrice": 30,
        "discountedPercent": 0,
        "promoApplied": null
    }
}

#######################################################################################

URL: http://localhost:3000/cart/cart/:userId

METHOD: GET

DESCRIPTION: for fetching all the product present in cart

RESPONSE_BODY:
{
    "message": "cart data of user",
    "data": {
        "cartData": [
            {
                "isActive": true,
                "_id": "5f553fd8963f584678b7d8f3",
                "createdAt": "2020-09-06T20:00:24.437Z",
                "productDetail": {
                    "_id": "5f553574c1758e320c9493ca",
                    "createdAt": "2020-09-06T19:16:04.733Z",
                    "name": "B",
                    "price": 20,
                    "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
                },
                "userId": "1234567890",
                "quantity": 1,
                "actualPrice": 20,
                "discountedPrice": 20,
                "discountedPercent": 0,
                "promoApplied": null
            },
            {
                "isActive": true,
                "_id": "5f554000963f584678b7d8f4",
                "createdAt": "2020-09-06T20:01:04.266Z",
                "productDetail": {
                    "_id": "5f5534fdc1758e320c9493c9",
                    "createdAt": "2020-09-06T19:14:05.931Z",
                    "name": "A",
                    "price": 30,
                    "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
                },
                "userId": "1234567890",
                "quantity": 1,
                "actualPrice": 30,
                "discountedPrice": 30,
                "discountedPercent": 0,
                "promoApplied": null
            },
            {
                "isActive": true,
                "_id": "5f554017963f584678b7d8f5",
                "createdAt": "2020-09-06T20:01:27.768Z",
                "productDetail": {
                    "_id": "5f553574c1758e320c9493ca",
                    "createdAt": "2020-09-06T19:16:04.733Z",
                    "name": "B",
                    "price": 20,
                    "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
                },
                "userId": "1234567890",
                "quantity": 1,
                "actualPrice": 20,
                "discountedPrice": 20,
                "discountedPercent": 0,
                "promoApplied": null
            },
            {
                "isActive": true,
                "_id": "5f55402d963f584678b7d8f6",
                "createdAt": "2020-09-06T20:01:49.530Z",
                "productDetail": {
                    "_id": "5f5534fdc1758e320c9493c9",
                    "createdAt": "2020-09-06T19:14:05.931Z",
                    "name": "A",
                    "price": 30,
                    "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
                },
                "userId": "1234567890",
                "quantity": 1,
                "actualPrice": 30,
                "discountedPrice": 30,
                "discountedPercent": 0,
                "promoApplied": null
            },
            {
                "isActive": true,
                "_id": "5f55405b963f584678b7d8f7",
                "createdAt": "2020-09-06T20:02:35.127Z",
                "productDetail": {
                    "_id": "5f5534fdc1758e320c9493c9",
                    "createdAt": "2020-09-06T19:14:05.931Z",
                    "name": "A",
                    "price": 30,
                    "imageUrl": "https://m.media-amazon.com/images/I/51o5RmQtroL._AC_UY218_.jpg"
                },
                "userId": "1234567890",
                "quantity": 1,
                "actualPrice": 30,
                "discountedPrice": 30,
                "discountedPercent": 0,
                "promoApplied": null
            }
        ],
        "totalCartValue": 110,
        "cartValueAfterDiscount": 110,
        "totalDiscount": 20
    }
}

#######################################################################################


NOTE: 
1) this is not a production grade project. It require various optimization in different function.
2) other API are also present, feel free to ask @ niskumar12345@gmail.com
