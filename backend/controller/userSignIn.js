const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const {username, password} = req.body

        if (!username) {
            throw new Error("Vui lòng cung cấp tên tài khoản.")
        }

        if (!password) {
            throw new Error("Vui lòng cung cấp mật khẩu.")
        }

        const user = await userModel.findOne({username})

        if (!user) {
            throw new Error("Tài khoản không tồn tại.")
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        console.log("checkPassword", checkPassword)

        if (checkPassword) {
            const tokenData = {
                _id : user._id,
                username : user.username,
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60 * 60 * 8});

            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message : "Đăng nhập thành công.",
                data : token,
                success : true,
                error : false
            })
        } else {
            throw new Error("Vui lòng kiểm tra mật khẩu.")
        }


    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignInController