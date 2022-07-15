import { addChats, addUsers, removeUsers } from 'features';
import { Dispatch } from 'redux';

import SuccessToast from 'Utils/Toast/Success';
import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_JOIN,
    ACTIONS_REMOVE_CODE_USER,
    // ACTIONS_SEND_CODE_SERVER_CODE,
} from './actions';
import { socket } from './socket';

import { chatType, socketCodeboxUser } from 'Types';

export const socketEmit = (codebox_id: string, user: socketCodeboxUser) =>
    socket.emit(ACTIONS_CODE_JOIN, { codebox_id, user });

export const socketAddUser = ({
    dispatch,
    currentUserId,
}: {
    dispatch: Dispatch;
    currentUserId: string;
}) =>
    socket.on(
        ACTIONS_ADD_CODE_USER,
        async ({ user }: { user: socketCodeboxUser }) => {
            dispatch(addUsers({ user }));

            if (user.username && user.userId !== currentUserId) {
                SuccessToast(`${user.username} joined`);
            }
        },
    );

export const socketRemoveUser = ({ dispatch }: { dispatch: Dispatch }) => {
    socket.on(
        ACTIONS_REMOVE_CODE_USER,
        async ({ userId, username }: { userId: string; username: string }) => {
            dispatch(removeUsers({ userId }));
            username && SuccessToast(`${username} left`);
        },
    );
};

export const socketChat = ({ dispatch }: { dispatch: Dispatch }) => {
    socket.on(
        ACTIONS_CODE_CHAT,
        async ({ chats }: { chats: chatType[] | chatType }) => {
            dispatch(addChats({ chat: chats }));
        },
    );
};

export const socketCode = ({
    // setMonacoCode,
    dispatch,
}: {
    dispatch: Dispatch;
    // setMonacoCode: React.Dispatch<React.SetStateAction<string>>;
}) => {
    // socket.on(ACTIONS_SEND_CODE_SERVER_CODE, ({ code }: { code: string }) => {
    //     // setMonacoCode(code); //FIXME:
    // });
};
