const router = require('express').Router();

const {
    checkEmail,
    checkMobile,
    authenticateUser,
} = require('../Controllers/userController');

router.route('/verify/email').post(checkEmail);
router.route('/verify/mobile').post(checkMobile);
router.route('/user/authenticate').post(authenticateUser);

module.exports = router;
