const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const User = require('../Models/User');
const Rooms = require('../Models/Rooms');
const { nanoid, random } = require('nanoid');

exports.createRoom = BigPromise(async (req, res, next) => {
    const { name, type } = req.body;
    const { _id } = req.user;

    // qr code

    if (!(name || type))
        return next(CustomError(res, 'All fields are required', 400));

    if (type !== 'OPEN' && type !== 'SOCIAL' && type !== 'PRIVATE')
        return next(CustomError(res, 'Room Type is invalid', 400));

    let room = await Rooms.findOne({ name: name });

    if (room)
        return next(CustomError(res, 'Room already exits with name', 400));

    const randomPassword = nanoid();

    if (type === 'OPEN') {
        room = await Rooms.create({
            name,
            creator: _id,
            type: type,
            speakers: [_id],
        });
    } else {
        room = await Rooms.create({
            name,
            creator: _id,
            type: type,
            speakers: [_id],
            password: randomPassword,
        });
    }

    room = await room.populate(
        'creator speakers',
        'email mobile user_id _id name username profile_photo',
    );

    if (type !== 'OPEN') {
        room.password = randomPassword;
    }

    res.status(200).json({
        success: true,
        room,
    });
});

exports.getRooms = BigPromise(async (req, res, next) => {
    const rooms = await Rooms.find({
        type: { $in: ['OPEN', 'SOCIAL'] },
    }).populate(
        'creator speakers',
        'email mobile user_id _id name username profile_photo',
    );

    res.status(200).json({
        success: true,
        rooms,
    });
});
