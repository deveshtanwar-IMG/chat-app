const userModel = require('../models/user.model');
const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json');
const bcrypt = require('bcrypt')

exports.findUser = async ({ body }) => {
    try {
        const data = await userModel.findOne({ email: body.email });
        return {
            statusCode: OK,
            success: true,
            message: "data fetch successfully",
            data
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    };
};

exports.createUser = async ({ body }) => {
    try {
        const hashPassword = await bcrypt.hash(body.password, 13)
        body.password = hashPassword;
        const data = await userModel.create(body);
        return {
            statusCode: OK,
            success: true,
            message: "user Created",
            data
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.verifyUser = async ({ authToken, _id }) => {
    try {
        const data = await userModel.findByIdAndUpdate({ _id: _id }, { authToken: authToken }, { new: true });
        if (!data) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "Token not updated",
                data
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "token updated successfully",
            data
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

exports.getUsers = async () => {
    try {
        const users = await userModel.find({}, { image: 1, _id: 1, username: 1, email: 1, isAdmin: 1 });
        if (!users) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "No users found",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "users fetched successfully",
            data: users
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

// search users

exports.searchUsers = async ({ query }) => {
    try {
        const regex = new RegExp(query.username, 'i');
        const users = await userModel.find({ username: { $regex: regex } }, { image: 1, _id: 1, username: 1, email: 1 });
        if (!users) {
            return {
                statusCode: BAD_REQUEST,
                success: false,
                message: "No users found",
            };
        }
        return {
            statusCode: OK,
            success: true,
            message: "users fetched successfully",
            data: users
        };
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}