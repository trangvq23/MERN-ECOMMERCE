const productModel = require("../../models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function uploadProductController (req,res) {
    try {
        const sessionUserId = req.userId

        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("Permission denied.")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            message: "Tải lên sản phẩm thành công.",
            error: false,
            success: true,
            data: saveProduct
        })
    }catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = uploadProductController