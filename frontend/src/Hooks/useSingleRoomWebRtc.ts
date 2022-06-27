/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

import { socket } from '../Socket/socket';
import {
    socketAddUser,
    socketEmit,
    socketGetIceCandidate,
    socketGetOfferAns,
    socketRemoveUser,
} from '../Socket/socketHandler';
import { ACTIONS_LEAVE } from '../Socket/actions';

import useStateWithCallback from './useStateWithCallback';
import { useAppSelector } from '../store/hooks';

import {
    addAudioRefType,
    currentUserAudioInput,
    useSingleRoomWebRtcType,
    roomUserType,
} from '../Types';
import { Socket } from 'socket.io-client';

import {
    ACTIONS_ADD_USER,
    ACTIONS_REMOVE_USER,
    ACTIONS_SESSION_DESCRIPTION,
    ACTIONS_ICE_CANDIDATE,
} from '../Socket/actions';

const useSingleRoomWebRtc: useSingleRoomWebRtcType = (roomId, user) => {
    const [users, addUser] = useStateWithCallback([]);
    const { authenticated } = useAppSelector((state) => state.rooms);

    // all clients connection  ,  all clients audio input ref for mute and unmute and audio
    const roomUsers = useRef<roomUserType>({ audio: {}, rtc: {} });

    // ref for socket.io
    const socketRef = useRef<Socket>(socket);

    // current user audio input box
    const currentUserAudioInput = useRef<currentUserAudioInput>({
        media: null,
    });

    // add audio to clients with ref of instance
    const addAudioRef: addAudioRefType = (userId, instance) => {
        roomUsers.current.audio[userId] = instance;
    };

    // capture user media
    const captureUserMedia = async () => {
        currentUserAudioInput.current.media =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
    };

    // called when user is authenticated for room
    useEffect(() => {
        const initalize = async () => {
            // capture user media
            await captureUserMedia();

            // add to users list
            addUser(user, () => {
                const currentUser = roomUsers.current.audio[user.userId];

                // mute currrent user
                if (currentUser) {
                    currentUser.volume = 0;
                    currentUser.srcObject = currentUserAudioInput.current.media;
                }
            });

            // join socket
            socketEmit(roomId, user, socket);

            // handle add new user
            socketAddUser({
                addUser,
                currentUserAudioInput,
                socket: socketRef.current,
                roomUsers,
            });

            // handle ice candidate
            socketGetIceCandidate({
                socket: socketRef.current,
                roomUsers,
            });

            // handle offer and ans
            socketGetOfferAns({
                socket: socketRef.current,
                roomUsers,
            });

            socketRemoveUser({
                addUser,
                socket: socketRef.current,
                roomUsers,
            });
        };

        if (authenticated === 'AUTHENTICATED') {
            initalize();
        }
    }, [authenticated, roomId]);

    // called on app mounted and unmounted
    useEffect(() => {
        if (socketRef.current === null) {
            socketRef.current = socket;
        }

        return () => {
            currentUserAudioInput.current.media
                ?.getTracks()
                .forEach((track) => track.stop());
            socketRef.current.emit(ACTIONS_LEAVE, { roomId });
            for (const socketId in roomUsers.current.rtc) {
                roomUsers.current.rtc[socketId].close();
                delete roomUsers.current.rtc[socketId];
            }
            socketRef.current.off(ACTIONS_ADD_USER);
            socketRef.current.off(ACTIONS_ICE_CANDIDATE);
            socketRef.current.off(ACTIONS_SESSION_DESCRIPTION);
            socketRef.current.off(ACTIONS_REMOVE_USER);
        };
    }, []);

    return { users, addAudioRef };
};

export default useSingleRoomWebRtc;
