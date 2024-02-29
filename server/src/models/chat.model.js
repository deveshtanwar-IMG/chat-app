const { Schema, Types, model } = require('mongoose');

const chatSchema = Schema({
    chatName: {
        type: Schema.Types.Mixed
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [
        {
            type: Types.ObjectId,
            ref: 'user'
        }
    ],
    latestMessage: {
        type: Types.ObjectId,
        ref: 'message'
    },
    groupAdmin: {
        type: Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true, versionKey: false })

module.exports = model('chat', chatSchema)