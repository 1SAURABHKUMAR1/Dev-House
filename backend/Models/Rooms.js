const mongoose = require('mongoose');
const uuid = require('uuid').v4;
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const roomsSchema = new mongoose.Schema({
    room_name: {
        type: String,
        maxlength: [40, 'Room Name Cannnot be greater than 40 character'],
        required: [true],
    },
    room_id: {
        type: String,
        default: uuid,
        required: [true],
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true],
    },
    room_type: {
        type: String,
        required: [true],
        enum: {
            values: ['OPEN', 'SOCIAL', 'PRIVATE'],
            message: `Please Select Category From- "OPEN", "SOCIAL", "PRIVATE"`,
        },
    },
    speakers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
    ],
    room_password: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24 * 60 * 60,
    },
});

roomsSchema.pre('save', async function (next) {
    if (this.room_type === 'OPEN') {
        return next();
    }

    this.room_password = await nanoid();
    this.room_password = await bcrypt.hash(this.room_password, 10);
});

roomsSchema.methods.isPasswordValid = async function (roomPassword) {
    return await bcrypt.compare(roomPassword, this.room_password);
};

module.exports = mongoose.model('rooms', roomsSchema);
