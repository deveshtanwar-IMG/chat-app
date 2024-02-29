const { Schema, Types, model } = require('mongoose')

const messageSchema = Schema({
    sender: {
        type: Types.ObjectId,
        ref: 'user'
    },
    content: {
        type: String,
    },
    chat: {
        type: Types.ObjectId,
        ref: 'chat'
    },
    readBy: {
        type: Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true, versionKey: false })

module.exports = model('message', messageSchema)