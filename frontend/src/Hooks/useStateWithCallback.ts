import { useCallback, useEffect, useRef, useState } from 'react';
import {
    addUserType,
    cbRefType,
    initialUsersType,
    updateStateWithCallback,
} from '../Types';

const useStateWithCallBack: updateStateWithCallback = (
    initalUsers: initialUsersType,
) => {
    // users state
    const [users, setUsers] = useState<initialUsersType>(initalUsers);
    const cbRef = useRef<cbRefType>({ stateFunction: null });

    // add user based on many checks
    const addUser: addUserType = useCallback(
        (newUserInfo, cb) => {
            const isAdded =
                typeof newUserInfo === 'function'
                    ? -1
                    : users.findIndex(
                          (user) => user.userId === newUserInfo?.userId,
                      );

            if (isAdded === -1) {
                cbRef.current.stateFunction = cb ? cb : null;

                setUsers((prev) => {
                    if (typeof newUserInfo === 'function') {
                        return newUserInfo(prev);
                    }

                    return [...prev, newUserInfo];
                });
            }
        },
        [users],
    );

    // cb -> do when clients update
    useEffect(() => {
        if (cbRef.current) {
            cbRef.current.stateFunction?.(users);
            cbRef.current.stateFunction = null;
        }
    }, [users]);

    return [users, addUser];
};

export default useStateWithCallBack;
