const jwt = require('jsonwebtoken')

const jwt_secret = process.env.JWT_SECRET;


exports.generateToken = async (userDetails) => {
    return jwt.sign({ id: userDetails }, jwt_secret)
}