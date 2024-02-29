const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json')
const services = require('../services/message.service')

//@description     Create New Message
//@route           POST /api/Message/sendMessage
//@access          Protected
exports.sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: 'chatId or content not found'
            })
        }

        let newMessage = {
            sender: req.userId,
            content: content,
            chat: chatId
        }

        const sendMessage = await services.sendMessage(newMessage)

        if (sendMessage) {
            return res.send({
                ...sendMessage
            })
        }
    } catch (error) {
        return res.send({
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        })
    }
}

exports.allMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        if (!chatId) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: 'chatId not provided with request',
            })
        }
        const messages = await services.allMessages(chatId);
        if (messages) {
            return res.send({
                ...messages
            })
        }
    } catch (error) {
        return res.send({
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        })
    }
}