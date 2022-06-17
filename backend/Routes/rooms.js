const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const { createRoom, getRooms } = require('../Controllers/roomsController');

router.route('/room/create').post(isLoggedIn, createRoom);
router.route('/room/rooms').post(isLoggedIn, getRooms);

module.exports = router;
