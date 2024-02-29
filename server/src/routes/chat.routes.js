const express = require('express');
const router = express.Router();
const controllers = require('../controllers/chat.controller');
const auth = require('../middlewares/auth');

router.get("/index", (req, res) => {
    res.send({
        success: true,
        messsge: "chat routes working fine ❤",
    })
});

router.post('/accessChat', auth, controllers.accessChat);
router.get('/fetchChats', auth, controllers.fetchChats);
router.get('/fetchChat/:chatId', auth, controllers.fetchChat)
router.post('/createGroupChat', auth, controllers.createGroupChat);
router.put('/renameGroupChat', auth, controllers.renameGroupChat);
router.put('/addToGroupChat', auth, controllers.addGroupChat);
router.put('/removeFromGroupChat', auth, controllers.removeGroupChat);

module.exports = router;