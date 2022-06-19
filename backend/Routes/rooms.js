const router = require('express').Router();

const isLoggedIn = require('../Middleware/isLoggedIn');

const {
    createRoom,
    getRooms,
    singleRoom,
} = require('../Controllers/roomsController');

router.route('/room/create').post(isLoggedIn, createRoom);
router.route('/room/rooms').get(isLoggedIn, getRooms);
router.route('/room/single/:roomId').get(isLoggedIn, singleRoom);

module.exports = router;
