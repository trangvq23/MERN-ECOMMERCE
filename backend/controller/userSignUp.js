const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res) {
    try {
        const {username, password, name} = req.body

        const user = await userModel.findOne({username})

        console.log("user", user)

        if (user) {
            throw new Error("Người dùng tồn tại.")
        }

        if (!username) {
            throw new Error("Vui lòng cung cấp tên tài khoản.")
        }

        if (!password) {
            throw new Error("Vui lòng cung cấp mật khẩu.")
        }

        if (!name) {
            throw new Error("Vui lòng cung cấp tên.")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Có gì sai kìa.")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "Tạo tài khoản thành công !"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}

module.exports = userSignUpController