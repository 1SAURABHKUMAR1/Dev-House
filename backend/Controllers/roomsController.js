const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const User = require('../Models/User');
const Rooms = require('../Models/Rooms');

exports.createRoom = BigPromise(async (req, res, next) => {
    const { name, type } = req.body;
    const { _id } = req.user;

    // if roomType === 'GLOBAL' => generate  qr code from backend and redirect to stepShare to share link for room qr code and add icons for share to whatsapp , twitter or copy from clipboarrd or download qr code
    // if roomType === 'Private' | 'Social' => generate password and qr code from backend and redirect to stepShare to share link for room link, password and qr code and add icons for share to whatsapp , twitter or copy from clipboarrd or download qr code

    if (!(name || type))
        return next(CustomError(res, 'All fields are required', 400));

    if (type !== 'OPEN' && type !== 'SOCIAL' && type !== 'PRIVATE')
        return next(CustomError(res, 'Room Type is invalid', 400));

    let room = await Rooms.findOne({ room_name: name });

    if (room)
        return next(CustomError(res, 'Room already exits with name', 400));

    room = await Rooms.create({
        room_name: name,
        creator_id: _id,
        room_type: type,
        speakers: [_id],
    });

    room = await room.populate(
        'creator_id speakers',
        'email mobile user_id _id name username profile_photo',
    );

    room.room_password = undefined;

    res.status(200).json({
        success: true,
        room,
    });
});

exports.getRooms = BigPromise(async (req, res, next) => {
    const rooms = await Rooms.find({ room_type: { $in: ['OPEN', 'SOCIAL'] } });

    res.status(200).json({
        success: true,
        rooms,
    });
});
