const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

router.get("/index", (req, res) => {
    res.send({
        success: true,
        messsge: "user routes working fine ❤",
    })
});

router.post('/register', controllers.register);
router.post('/verify', controllers.verify);
router.get('/getUsers', auth, controllers.getUsers);
router.get('/searchUsers', auth, controllers.searchUsers);

module.exports = router;