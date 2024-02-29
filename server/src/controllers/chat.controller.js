const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json')
const services = require('../services/chat.service')

//@description      Create or fetch one to one chat
//@route            Post /api/chat/accessChat
//@access           protected
exports.accessChat = async (req, res) => {
    try {

        const { userId } = req.body
        if (!userId) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: "chatBuddy userId not found",
            })
        }

        const isChat = await services.accessChat(req.userId, userId)

        if (isChat.success) {
            return res.send({
                ...isChat
            })
        }
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}


//@description      fetch all chats for the user
//@route            get /api/chat/fetchChats
//@access           protected
exports.fetchChats = async (req, res) => {
    try {
        const isChat = await services.fetchChats(req.userId)

        if (isChat.success) {
            return res.send(isChat)
        }
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

//@description      fetch single chat with chatId
//@route            get /api/chat/fetchChats/:id
//@access           protected
exports.fetchChat = async (req, res) => {
    try {
        const { chatId } = req.params;
        const isChat = await services.fetchChat(chatId)

        if (isChat.success) {
            return res.send(isChat)
        }
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

//@description      create group chats
//@route            post /api/chat/createGroupChat
//@access           protected
exports.createGroupChat = async (req, res) => {
    try {
        const { users, chatName } = req.body;
        users.push(req.userId)

        if (users.length < 2) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: "Group requires multiple users !",
            })
        }
        const chatData = {
            chatName: chatName,
            isGroupChat: true,
            users: users,
            groupAdmin: req.userId
        }

        const groupChat = await services.createGroupChat(chatData)
        return res.send(groupChat)
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

//@description      rename group chats
//@route            put /api/chat/renameGroupChat
//@access           protected
exports.renameGroupChat = async (req, res) => {
    try {
        const { chatId, chatName } = req.body;
        const renameChat = await services.renameGroupChat(chatId, chatName)
        return res.send(renameChat)
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

//@description      add user to group chats
//@route            put /api/chat/addGroupChat
//@access           protected
exports.addGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        console.log('chatId-------------->', chatId);
        console.log('userId-------------->', userId);
        const addUser = await services.addGroupChat(chatId, userId)
        return res.send(addUser)
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

//@description      remove user from group chats
//@route            put /api/chat/removeGroupChat
//@access           protected
exports.removeGroupChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        const removeUser = await services.removeGroupChat(chatId, userId)
        return res.send(removeUser)
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}