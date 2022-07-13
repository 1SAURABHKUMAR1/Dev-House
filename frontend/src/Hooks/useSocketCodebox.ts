import { useEffect, useState } from 'react';
import {
    ACTIONS_ADD_CODE_USER,
    ACTIONS_CODE_CHAT,
    ACTIONS_CODE_LEAVE,
    ACTIONS_REMOVE_CODE_USER,
    ACTIONS_SEND_CODE_SERVER_CODE,
} from 'Socket/actions';
import {
    socketAddUser,
    socketChat,
    socketCode,
    socketEmit,
    socketRemoveUser,
} from 'Socket/codeboxSocketHandler';

import { socket } from 'Socket/socket';

import {
    chatType,
    fileFormat,
    initialChatType,
    socketCodeboxUser,
    useSocketCodebox as useSocketCodeboxType,
} from 'Types';

const useSocketCodebox: useSocketCodeboxType = (codeboxId, user) => {
    const [users, setUsers] = useState<Array<socketCodeboxUser>>([]);
    const [chats, setChats] = useState<initialChatType>([]);
    const [allFiles, setAllFiles] = useState<fileFormat[]>([
        {
            id: 'loading',
            directory: null,
            name: 'Loading....',
            type: 'directory',
        },
    ]);
    const [monacoEditorCode, setMonacoCode] = useState<string>('');

    const addUsers = (newUser: socketCodeboxUser) => {
        !users.find(
            (singleUser) =>
                singleUser.userId === newUser.userId &&
                singleUser.username === newUser.username,
        ) && setUsers((prev) => [...prev, newUser]);
    };

    const addChats = (newChat: chatType) => {
        chats.findIndex((chat) => chat.messageId === newChat.messageId) ===
            -1 && setChats((prev) => [...prev, newChat]);
    };

    useEffect(() => {
        const initalize = () => {
            addUsers(user);

            socketEmit(codeboxId, user);

            socketAddUser({
                addUsers,
                setUsers,
                currentUserId: user.userId,
            });

            socketRemoveUser({
                setUsers,
            });

            socketChat({
                setChats,
                addChats,
            });

            socketCode({
                setMonacoCode,
            });
        };

        initalize();

        return () => {
            socket.emit(ACTIONS_CODE_LEAVE, { codeboxId });
            socket.off(ACTIONS_ADD_CODE_USER);
            socket.off(ACTIONS_REMOVE_CODE_USER);
            socket.off(ACTIONS_CODE_CHAT);
            socket.off(ACTIONS_SEND_CODE_SERVER_CODE);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        users,
        chats,
        monacoEditorCode,
        setMonacoCode,
        allFiles,
        setAllFiles,
    };
};

export default useSocketCodebox;
