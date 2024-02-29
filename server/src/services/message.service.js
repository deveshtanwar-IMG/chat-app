const messageModel = require('../models/message.model');
const userModel = require('../models/user.model');
const chatModel = require('../models/chat.model');
const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json');

exports.sendMessage = async (newMessage) => {
    try {
        const createMessage = await messageModel.create(newMessage)

        let message = await messageModel.findById(createMessage._id)
            .populate('sender', 'username image')
            .populate("chat")
        message = await userModel.populate(message, {
            path: "chat.users",
            select: "username image email",
        });

        await chatModel.findByIdAndUpdate(newMessage.chatId, { latestMessage: message });
        if (message) {
            return {
                statusCode: OK,
                success: true,
                message: 'message saved successfully !',
                message
            }
        }
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.allMessages = async (chatId) => {
    try {
        const allMessage = await messageModel.find({ chat: chatId })
            .populate('sender', "username email image")
            .populate('chat')

        return {
            statusCode: OK,
            success: true,
            message: 'all messages fetched successfully',
            allMessage
        }
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}