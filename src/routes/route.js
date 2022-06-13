const express = require('express');
const router = express.Router();

const productFunction = require('../controllers/productController')

const userFunction = require('../controllers/userController')

const orderFunction = require('../controllers/orderController')

const commonMiddleware = require('../middlewares/commonMiddlewares')






router.post('/createProduct', productFunction.createProduct)

router.post('/createUser', commonMiddleware.mid1, userFunction.createUser)  

router.post('/createOrder', commonMiddleware.mid1, orderFunction.createOrder)  


module.exports = router;  