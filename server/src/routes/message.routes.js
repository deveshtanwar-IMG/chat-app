const express = require('express');
const router = express.Router();
const controllers = require('../controllers/message.controller');
const auth = require('../middlewares/auth');

router.get("/index", (req, res) => {
    res.send({
        success: true,
        messsge: "message routes working fine ❤",
    })
});

router.post('/sendMessage', auth, controllers.sendMessage);
router.get('/allMessage/:chatId', auth, controllers.allMessages);

module.exports = router;