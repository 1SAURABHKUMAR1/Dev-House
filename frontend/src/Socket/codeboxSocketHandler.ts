import React from 'react';
import { chatType, initialChatType, socketCodeboxUser } from 'Types';
import SuccessToast from 'Utils/Toast/Success';
import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_JOIN,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_SEND_CODE_SERVER_CODE,
} from './actions';
import { socket } from './socket';

export const socketEmit = (codebox_id: string, user: socketCodeboxUser) =>
    socket.emit(ACTIONS_CODE_JOIN, { codebox_id, user });

export const socketAddUser = ({
    addUsers,
    setUsers,
    currentUserId,
}: {
    addUsers: (user: socketCodeboxUser) => void;
    setUsers: React.Dispatch<React.SetStateAction<socketCodeboxUser[]>>;
    currentUserId: string;
}) =>
    socket.on(
        ACTIONS_ADD_CODE_USER,
        async ({ user }: { user: socketCodeboxUser }) => {
            if (Array.isArray(user)) {
                setUsers(user);
            } else {
                if (user.userId !== currentUserId) {
                    addUsers(user);
                    SuccessToast(`${user.username} joined`);
                }
            }
        },
    );

export const socketRemoveUser = ({
    setUsers,
}: {
    setUsers: React.Dispatch<React.SetStateAction<socketCodeboxUser[]>>;
}) => {
    socket.on(
        ACTIONS_REMOVE_CODE_USER,
        async ({ userId, username }: { userId: string; username: string }) => {
            setUsers((users) => {
                return users.filter(
                    (singleUser) => singleUser.userId !== userId,
                );
            });

            username && SuccessToast(`${username} left`);
        },
    );
};

export const socketChat = ({
    setChats,
    addChats,
}: {
    setChats: React.Dispatch<React.SetStateAction<initialChatType>>;
    addChats: (user: chatType) => void;
}) => {
    socket.on(
        ACTIONS_CODE_CHAT,
        ({ chats }: { chats: chatType[] | chatType }) => {
            if (Array.isArray(chats)) {
                setChats(() => chats);
            } else {
                addChats(chats);
            }
        },
    );
};

export const socketCode = ({
    setMonacoCode,
}: {
    setMonacoCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
    socket.on(ACTIONS_SEND_CODE_SERVER_CODE, ({ code }: { code: string }) => {
        setMonacoCode(code);
    });
};
