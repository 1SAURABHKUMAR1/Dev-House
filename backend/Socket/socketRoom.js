const {
    ACTIONS_JOIN,
    ACTIONS_ADD_USER,
    ACTIONS_REMOVE_USER,
    ACTIONS_SEND_ICE,
    ACTIONS_SEND_SESSION_DESC,
    ACTIONS_SESSION_DESCRIPTION,
    ACTIONS_ICE_CANDIDATE,
    ACTIONS_LEAVE,
    ACTIONS_SEND_MUTE_UNMUTE,
    ACTIONS_MUTE_UNMUTE,
    ACTIONS_CHAT,
    ACTIONS_SEND_CHAT,
    ACTIONS_CODE_JOIN,
    ACTIONS_ADD_CODE_USER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_LEAVE,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_SEND_CODE_CHAT,
} = require('./actions');
const uuid = require('uuid').v4;

// BESTWAY use redis
const connectedUsers = {}; // object with socketId as key and value as user which contains username , photo and userId
const chats = {}; // object with roomId as key and value as single chat which contains messageBody and username

const getRoom = (roomId, io) => {
    return [...(io.sockets.adapter.rooms.get(roomId) || [])];
};

const socketRoom = (io) => {
    return io.on('connection', (socket) => {
        console.log('Socket is connected', socket.id);

        socket.on(ACTIONS_JOIN, ({ roomId, user }) => {
            connectedUsers[socket.id] = user;

            const allUsers = getRoom(roomId, io);

            allUsers.forEach((socketId) => {
                io.to(socketId).emit(ACTIONS_ADD_USER, {
                    socketId: socket.id,
                    createOffer: false,
                    user,
                });
                socket.emit(ACTIONS_ADD_USER, {
                    socketId,
                    createOffer: true,
                    user: connectedUsers[socketId],
                });
            });

            socket.emit(ACTIONS_CHAT, {
                chats: chats.roomId ?? [],
            });

            socket.join(roomId);
        });

        // get ice candidate and send it ot user
        socket.on(ACTIONS_SEND_ICE, ({ socketId, icecandidate }) => {
            io.to(socketId).emit(ACTIONS_ICE_CANDIDATE, {
                socketId: socket.id,
                icecandidate,
            });
        });

        // get offer and send it
        socket.on(ACTIONS_SEND_SESSION_DESC, ({ socketId, offerOrAns }) => {
            io.to(socketId).emit(ACTIONS_SESSION_DESCRIPTION, {
                socketId: socket.id,
                offerOrAns,
            });
        });

        socket.on(ACTIONS_LEAVE, ({ roomId }) => {
            const allUsers = getRoom(roomId, io);

            allUsers.forEach((socketId) => {
                io.to(socketId).emit(ACTIONS_REMOVE_USER, {
                    userId: connectedUsers[socket.id]?.userId,
                    socketId: socket.id,
                });
            });

            socket.leave(roomId);
        });

        socket.on('disconnecting', () => {
            const { rooms } = socket;

            rooms.forEach((roomId) => {
                const allUsers = getRoom(roomId, io);

                allUsers.forEach((socketId) => {
                    io.to(socketId).emit(ACTIONS_REMOVE_USER, {
                        userId: connectedUsers[socket.id]?.userId,
                        socketId: socket.id,
                    });
                    io.to(socketId).emit(ACTIONS_REMOVE_CODE_USER, {
                        userId: connectedUsers[socket.id]?.userId,
                        username: connectedUsers[socket.id]?.username,
                    });
                });

                socket.leave(roomId);
            });

            delete connectedUsers[socket.id];
        });

        // handle mute and unmute
        socket.on(ACTIONS_SEND_MUTE_UNMUTE, ({ roomId, userId, mute }) => {
            const allUsers = getRoom(roomId, io);

            allUsers.forEach((socketId) => {
                socket.id !== socketId &&
                    io.to(socketId).emit(ACTIONS_MUTE_UNMUTE, {
                        userId,
                        mute,
                    });
            });

            connectedUsers[socket.id].muted = mute;
        });

        socket.on(ACTIONS_SEND_CHAT, ({ roomId, messageBody, username }) => {
            const allUsers = getRoom(roomId, io);
            const messageId = uuid();

            allUsers.forEach((socketId) => {
                io.to(socketId).emit(ACTIONS_CHAT, {
                    chats: { messageBody, username, messageId },
                });
            });

            chats.roomId = [
                ...(chats.roomId ?? []),
                { messageBody, username, messageId },
            ];
        });

        // code box <!-- -->
        socket.on(ACTIONS_CODE_JOIN, ({ codebox_id, user }) => {
            connectedUsers[socket.id] = user;

            const allUsers = getRoom(codebox_id, io);

            allUsers.forEach((socketId) => {
                io.to(socketId).emit(ACTIONS_ADD_CODE_USER, {
                    user,
                });
                socket.emit(ACTIONS_ADD_CODE_USER, {
                    user: connectedUsers[socketId],
                });
            });

            socket.emit(ACTIONS_CODE_CHAT, {
                chats: chats[codebox_id] ?? [],
            });

            socket.join(codebox_id);
        });

        socket.on(ACTIONS_CODE_LEAVE, ({ codeboxId }) => {
            const allUsers = getRoom(codeboxId, io);

            allUsers.findIndex((user) => user === socket.id) !== -1 &&
                allUsers.forEach((socketId) => {
                    io.to(socketId).emit(ACTIONS_REMOVE_CODE_USER, {
                        userId: connectedUsers[socket.id]?.userId,
                        username: connectedUsers[socket.id]?.username,
                    });
                });

            socket.leave(codeboxId);
        });

        socket.on(
            ACTIONS_SEND_CODE_CHAT,
            ({ codeboxId, messageBody, username }) => {
                const allUsers = getRoom(codeboxId, io);
                const messageId = uuid();

                allUsers.forEach((socketId) => {
                    io.to(socketId).emit(ACTIONS_CODE_CHAT, {
                        chats: { messageBody, username, messageId },
                    });
                });

                chats[codeboxId] = [
                    ...(chats.codeboxId ?? []),
                    { messageBody, username, messageId },
                ];

                console.log(chats);
            },
        );
    });
};

module.exports = socketRoom;
