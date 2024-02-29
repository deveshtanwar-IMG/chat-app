const jwt = require("jsonwebtoken");
const { statusCode: { UNAUTHORIZED } } = require('../config/default.json');

module.exports = async (req, res, next) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        console.log(req.url, "<<---------req.url");
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(" ").pop();
            const { id } = jwt.verify(token, JWT_SECRET);
            req.userId = id
            next();
        } else {
            res.status(UNAUTHORIZED).send({
                status: false,
                message: "token not found",
                data: []
            });
        };
    } catch (err) {
        res.status(UNAUTHORIZED).send({
            status: false,
            message: "invalid token",
            data: []
        });
    };
};