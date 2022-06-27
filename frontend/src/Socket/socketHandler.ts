import { Socket } from 'socket.io-client';
import {
    authSliceIntialState,
    socketADDUSERPROPS,
    socketAddUserProps,
    socketGetIceCandidateProps,
    socketGETOFFERANSPROPS,
    socketGetOfferAnsProps,
    socketICECANDIDATEPROPS,
    socketREMOVEUSERPROPS,
    socketRemoveUserProps,
} from '../Types';
import {
    ACTIONS_JOIN,
    ACTIONS_ADD_USER,
    ACTIONS_REMOVE_USER,
    ACTIONS_SEND_ICE,
    ACTIONS_SEND_SESSION_DESC,
    ACTIONS_SESSION_DESCRIPTION,
    ACTIONS_ICE_CANDIDATE,
} from './actions';
var freeice = require('freeice');

export const socketEmit = (
    roomId: string,
    user: authSliceIntialState,
    socket: Socket,
) => socket.emit(ACTIONS_JOIN, { roomId, user });

// flow => check if exits -> create new rtcconnection -> add .onicecandiate (send socket new generated) -> add .ontrack (add new user to users) -> add to local
export const socketAddUser = ({
    addUser,
    currentUserAudioInput,
    socket,
    roomUsers,
}: socketAddUserProps) =>
    socket.on(
        ACTIONS_ADD_USER,
        async ({ socketId, createOffer, user }: socketADDUSERPROPS) => {
            if (socketId in roomUsers.current.rtc) {
                return;
            }

            // add new rtcpeerin userConnection
            roomUsers.current.rtc[socketId] = new RTCPeerConnection({
                iceServers: freeice(),
            });

            // send icecandidate on backend to send to other users
            roomUsers.current.rtc[socketId].onicecandidate = (
                event: RTCPeerConnectionIceEvent,
            ) => {
                socket.emit(ACTIONS_SEND_ICE, {
                    socketId,
                    icecandidate: event.candidate,
                });
            };

            // if any data comes
            roomUsers.current.rtc[socketId].ontrack = (
                event: RTCTrackEvent,
            ) => {
                addUser(user, () => {
                    // check user audio element preset
                    if (roomUsers.current.audio[user.userId]) {
                        roomUsers.current.audio[user.userId].srcObject =
                            event.streams[0];
                    } else {
                        let isSettled = false;
                        // check again and again as it takes time
                        const settle = setInterval(() => {
                            if (roomUsers.current.audio[user.userId]) {
                                roomUsers.current.audio[user.userId].srcObject =
                                    event.streams[0];
                                isSettled = true;
                            }
                            if (isSettled) {
                                clearInterval(settle);
                            }
                        }, 400);
                    }
                });
            };

            // add tracks
            currentUserAudioInput.current.media
                ?.getTracks()
                .forEach((mediaStream) => {
                    roomUsers.current.rtc[socketId].addTrack(
                        mediaStream,
                        // @ts-ignore
                        currentUserAudioInput.current.media,
                    );
                });

            // create offer -> set to localDescription -> send it to others via socket
            if (createOffer) {
                const offer = await roomUsers.current.rtc[
                    socketId
                ].createOffer();

                await roomUsers.current.rtc[socketId].setLocalDescription(
                    offer,
                );

                socket.emit(ACTIONS_SEND_SESSION_DESC, {
                    socketId,
                    offerOrAns: offer,
                });
            }
        },
    );

export const socketGetIceCandidate = ({
    socket,
    roomUsers,
}: socketGetIceCandidateProps) =>
    socket.on(
        ACTIONS_ICE_CANDIDATE,
        async ({ socketId, icecandidate }: socketICECANDIDATEPROPS) => {
            if (
                icecandidate !== null &&
                roomUsers.current.rtc[socketId].remoteDescription !== null
            )
                await roomUsers.current.rtc[socketId].addIceCandidate(
                    icecandidate,
                );
        },
    );

export const socketGetOfferAns = ({
    socket,
    roomUsers,
}: socketGetOfferAnsProps) => {
    socket.on(
        ACTIONS_SESSION_DESCRIPTION,
        async ({ socketId, offerOrAns }: socketGETOFFERANSPROPS) => {
            await roomUsers.current.rtc[socketId].setRemoteDescription(
                new RTCSessionDescription(offerOrAns),
            );

            // if offer send answer
            if (offerOrAns.type === 'offer') {
                let answer = await roomUsers.current.rtc[
                    socketId
                ].createAnswer();

                await roomUsers.current.rtc[socketId]?.setLocalDescription(
                    answer,
                );

                socket.emit(ACTIONS_SEND_SESSION_DESC, {
                    socketId,
                    offerOrAns: answer,
                });
            }
        },
    );
};

export const socketRemoveUser = ({
    addUser,
    socket,
    roomUsers,
}: socketRemoveUserProps) => {
    socket.on(
        ACTIONS_REMOVE_USER,
        async ({ userId, socketId }: socketREMOVEUSERPROPS) => {
            roomUsers.current.rtc[socketId]?.close();
            delete roomUsers.current.rtc[socketId];
            delete roomUsers.current.audio[userId];
            addUser((user) => {
                return user.filter((single) => single.userId !== userId);
            }, null);
        },
    );
};