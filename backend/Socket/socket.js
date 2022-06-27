const {
    ACTIONS_JOIN,
    ACTIONS_ADD_USER,
    ACTIONS_REMOVE_USER,
    ACTIONS_SEND_ICE,
    ACTIONS_SEND_SESSION_DESC,
    ACTIONS_SESSION_DESCRIPTION,
    ACTIONS_ICE_CANDIDATE,
    ACTIONS_LEAVE,
} = require('./actions');

const connectedUsers = {};

const getRoom = (roomId, io) => {
    return [...(io.sockets.adapter.rooms.get(roomId) || [])];
};

const socketHandler = (io) => {
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
                });

                socket.leave(roomId);
            });

            delete connectedUsers[socket.id];
        });
    });
};

module.exports = socketHandler;
