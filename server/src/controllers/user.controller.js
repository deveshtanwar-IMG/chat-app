const { statusCode: { OK, BAD_REQUEST } } = require('../config/default.json')
const services = require('../services/user.service')
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/tokenGenerator')

exports.register = async (req, res) => {
    try {
        const findUser = await services.findUser(req)
        if (findUser.data) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: "email already registered",
            })
        }
        const createUser = await services.createUser(req)
        if (createUser) {
            res.send({
                statusCode: OK,
                success: true,
                message: "Registered Successfully",
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

exports.verify = async (req, res) => {
    try {
        const findUser = await services.findUser(req)
        if (!findUser.data) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: "user not registered",
            })
        }
        const isverify = await bcrypt.compare(req.body.password, findUser.data.password)
        if (!isverify) {
            return res.send({
                statusCode: BAD_REQUEST,
                success: false,
                message: "Invalid credentials",
            })
        }

        // adding authToken to findUser obj
        findUser.data._doc.authToken = await generateToken(findUser.data._id)

        // update token in the db
        const updateData = await services.verifyUser(findUser.data)
        if (updateData) {
            delete updateData.data._doc.password;
            res.send({
                statusCode: OK,
                success: true,
                message: "login successfull",
                data: updateData.data
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

exports.getUsers = async (req, res) => {
    try {
        const getUser = await services.getUsers();
        if (getUser.success) {
            return res.send({
                statusCode: OK,
                success: true,
                message: "users fetched successfully",
                data: getUser.data
            })
        }
        return res.send({
            getUser
        })
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}

// search users api
exports.searchUsers = async (req, res) => {
    try {
        const getUser = await services.searchUsers(req);
        if (getUser.success) {
            return res.send({
                statusCode: OK,
                success: true,
                message: "users fetched successfully",
                data: getUser.data
            })
        }
        return res.send({
            getUser
        })
    } catch (error) {
        return {
            statusCode: BAD_REQUEST,
            success: false,
            message: error.message,
        };
    }
}