const chatModel = require('../models/chat.model');
const userModel = require('../models/user.model');
const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json');

exports.accessChat = async (userId, chatBuddyId) => {
    try {
        let isChat = await chatModel.find({
            isGroupChat: false,
            users: { $all: [userId, chatBuddyId] }
        })
            .populate("users", "-password -authToken")
            .populate("latestMessage")

        isChat = await userModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "username image email",
        });

        if (isChat.length > 0) {
            return {
                statusCode: OK,
                success: true,
                message: "chat fetched successfully",
                isChat
            };
        }

        const getName = await userModel.findById(chatBuddyId)
        delete getName._doc.password;
        delete getName._doc.authToken;

        // create chat
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [chatBuddyId, userId]
        };

        const createdChat = await chatModel.create(chatData);
        const fullChat = await chatModel.findOne({ _id: createdChat._id }).populate("users", "-password")

        return {
            statusCode: OK,
            success: true,
            message: "chat created successfully ",
            fullChat
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}


exports.fetchChats = async (userId) => {
    try {
        let isChat = await chatModel.find({
            users: { $all: [userId] }
        })
            .populate('users', '-password -authToken')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })

        isChat = await userModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "username, image, email"
        });

        if (isChat.length > 0) {
            return {
                statusCode: OK,
                success: true,
                message: "all chats fetched successfully",
                totalChats: isChat.length,
                chats: isChat
            };
        }

        return {
            statusCode: OK,
            success: true,
            message: "no chats available",
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.fetchChat = async (chatId) => {
    try {
        let isChat = await chatModel.findById({ _id: chatId })
            .populate('users', '-password -authToken')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')

        isChat = await userModel.populate(isChat, {
            path: "latestMessage.sender",
            select: "username, image, email"
        });

        if (isChat) {
            return {
                statusCode: OK,
                success: true,
                message: "chat fetched successfully",
                isChat
            };
        }

        return {
            statusCode: OK,
            success: true,
            message: "no chats available",
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.createGroupChat = async (chatData) => {
    try {
        const groupChat = await chatModel.create(chatData)
        const finalGroupChat = await chatModel.find({ _id: groupChat._id })
            .populate('users', '-password -createdAt -updatedAt -authToken')
            .populate('groupAdmin', '-password -createdAt -updatedAt -authToken')
        if (!finalGroupChat) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "group chat not created",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "Group chat created successfully !",
            finalGroupChat
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.renameGroupChat = async (chatId, chatName) => {
    try {
        const renameGroupChat = await chatModel.findByIdAndUpdate({ _id: chatId }, { chatName: chatName }, { new: true })
            .populate('users', '-password -createdAt -updatedAt -authToken')
            .populate('groupAdmin', '-password -createdAt -updatedAt -authToken')
        if (!renameGroupChat) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "group chat not found",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "Group chat renamed successfully !",
            renameGroupChat
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.addGroupChat = async (chatId, userId) => {
    try {
        const userInGroupChat = await chatModel.findById({ _id: chatId });
        if (userInGroupChat.users && userInGroupChat.users.includes(userId)) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "user already available in group",
            };
        }

        const addGroupChat = await chatModel.findByIdAndUpdate({ _id: chatId }, { $push: { users: userId } }, { new: true })
            .populate('users', '-password -createdAt -updatedAt -authToken')
            .populate('groupAdmin', '-password -createdAt -updatedAt -authToken')
        if (!addGroupChat) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "user not added to group",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "user added successfully in group!",
            addGroupChat
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.removeGroupChat = async (chatId, userId) => {
    try {
        const removeGroupChat = await chatModel.findByIdAndUpdate({ _id: chatId }, { $pull: { users: userId } }, { new: true })
            .populate('users', '-password -createdAt -updatedAt -authToken')
            .populate('groupAdmin', '-password -createdAt -updatedAt -authToken')
        if (!removeGroupChat) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "user not removed from group",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "user removed successfully from group!",
            removeGroupChat
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}