const addToCartModel = require("../../models/cartProduct")

const addToCartController = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId })

        console.log("isProductAvailable",isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Sản phẩm đã tồn tại trong giỏ.",
                success : false,
                error : true
            })
        }

        const payload  = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()


         return res.json({
            data : saveProduct,
            message : "Sản phẩm đã thêm vào giỏ.",
            success : true,
            error : false
        })


    }catch(err){
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = addToCartController