const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-category`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    createOrder: {
        url: `${backendDomain}/api/create-order`,
        method: 'post'
    },
    allOrders: {
        url: `${backendDomain}/api/orders`,
        method: 'get'
    },
    updateOrderStatus: {
        url: `${backendDomain}/api/order-status`,
        method: 'put'
    },
    deleteOrder: {
        url: `${backendDomain}/api/order`,
        method: 'delete'
    },
    getMonthlyRevenue: {
        url: `${backendDomain}/api/stats/revenue`,
        method: 'GET'
    },
}

export default SummaryApi;