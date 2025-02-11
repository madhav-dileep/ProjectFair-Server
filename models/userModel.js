const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: false
    },
    linkedIn: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    }
})

const users = mongoose.model("users", userSchema)

module.exports = users