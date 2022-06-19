const BigPromise = require('../Middleware/bigPromise');
const CustomError = require('../Utils/CustomError');
const User = require('../Models/User');
const Rooms = require('../Models/Rooms');
const { nanoid } = require('nanoid');
const QRCode = require('qrcode');
const cloudinary = require('cloudinary').v2;

exports.createRoom = BigPromise(async (req, res, next) => {
    const { name, type } = req.body;
    const { _id } = req.user;

    if (!(name || type))
        return next(CustomError(res, 'All fields are required', 400));

    if (type !== 'OPEN' && type !== 'SOCIAL' && type !== 'PRIVATE')
        return next(CustomError(res, 'Room Type is invalid', 400));

    let room = await Rooms.findOne({ name: name });

    if (room)
        return next(CustomError(res, 'Room already exits with name', 400));

    const randomPassword = nanoid();
    const qrLink = {
        id: '',
        secure_url: '',
    };

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

    QRCode.toDataURL(
        `Join the conversation on ${process.env.CLIENT_URL}/room/${
            room.room_id
        }${room.password ? `  where password is ${randomPassword}` : ''}`,
        async (error, url) => {
            if (error) return next(CustomError(res, 'Internal Error', 400));

            const cloudinaryPhoto = await cloudinary.uploader
                .upload(url, {
                    folder: 'devhouse',
                    width: 250,
                    crop: 'fit',
                })
                .catch(() => next(CustomError(res, 'Internal Error', 400)));

            qrLink.id = cloudinaryPhoto.public_id;
            qrLink.secure_url = cloudinaryPhoto.secure_url;

            room = await Rooms.findByIdAndUpdate(
                room._id,
                { qrcode: qrLink },
                { new: true },
            ).populate(
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
        },
    );
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
