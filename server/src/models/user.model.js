const { Schema, model } = require('mongoose')

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'my-account.png'
    },
    authToken: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true, versionKey: false })

module.exports = model('user', userSchema)