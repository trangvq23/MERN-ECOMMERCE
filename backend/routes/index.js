const express = require("express")

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require("../controller/user/userSignIn")
const userDetailsController = require("../controller/user/userDetails")
const authToken = require("../middleware/authToken")
const userLogout = require("../controller/user/userLogout");
const allUsers = require("../controller/user/allUsers")
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct")
const getProductController = require("../controller/product/getProduct")
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const { createOrder, getAllOrders, updateOrderStatus, deleteOrder } = require('../controller/order/Order');
const { getMonthlyRevenue } = require('../controller/Statistical/StatisticalController');

router.post("/signup", userSignUpController)
router.post("/signin", userSignInController)
router.get("/user-details", authToken, userDetailsController)
router.get("/userLogout", userLogout)

// admin panel
router.get("/all-user", authToken, allUsers)
router.post("/update-user", authToken, updateUser)

// product
router.post("/upload-product", authToken, uploadProductController)
router.get("/get-product", getProductController)
router.post("/update-product", authToken, updateProductController)
router.get("/get-category", getCategoryProduct)
router.post("/category-product", getCategoryWiseProduct)
router.post("/product-details", getProductDetails)
router.get("/search", searchProduct)

// add to cart
router.post("/addtocart", authToken, addToCartController)
router.get("/countAddToCartProduct", authToken, countAddToCartProduct)
router.get("/view-cart-product", authToken, addToCartViewProduct)
router.post("/update-cart-product", authToken, updateAddToCartProduct)
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)


//Order
router.post('/create-order', authToken, createOrder);
router.get('/orders', authToken, getAllOrders);
router.put('/order-status', authToken, updateOrderStatus);
router.delete('/order', authToken, deleteOrder);


//Statistical
// Thống kê doanh thu
router.get('/stats/revenue', authToken, getMonthlyRevenue);

module.exports = router