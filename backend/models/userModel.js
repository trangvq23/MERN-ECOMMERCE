const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePicture: String,
    role: String,
}, {
    timestamps : true
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel