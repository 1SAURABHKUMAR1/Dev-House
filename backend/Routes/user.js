const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const {
    checkEmail,
    checkMobile,
    authenticateUser,
    getAccessToken,
    checkUsername,
    activateUser,
} = require('../Controllers/userController');

router.route('/verify/email').post(checkEmail);
router.route('/verify/mobile').post(checkMobile);
router.route('/verify/username').post(checkUsername);
router.route('/user/authenticate').post(authenticateUser);
router.route('/user/activate').post(isLoggedIn, activateUser);

router.route('/refresh').get(getAccessToken);

module.exports = router;
