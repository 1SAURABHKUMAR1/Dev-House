import React from 'react';

export interface Children {
    children: React.ReactNode;
    center?: boolean;
    marginBottom: string;
}

export interface CardProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export interface AuthButtonProps {
    buttonText: string;
    marginTop: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface AuthStepProps {
    onClick: () => void;
}

export interface authSliceIntialState {
    login: boolean;
    userId: string;
    username: string;
    name: string;
    email: string;
    mobile: string;
    photo: string;
    id: string;
    activated: boolean;
    authType: 'MOBILE' | 'EMAIL';
}

export interface emailAction {
    email: string;
    mobile: string;
    authType: 'MOBILE' | 'EMAIL';
}

export interface authAction {
    _id: string;
    user_id: string;
}

export interface refreshTokenAction {
    user: {
        createdAt: string;
        email: string;
        user_id: string;
        _id: string;
        mobile: string;
        activated: boolean;
        name: string;
        profile_photo: {
            id: string;
            secure_url: string;
        };
        username: string;
    };
    success: string;
}

export interface activateInitalState {
    name: string;
    avatar: string;
    username: string;
}

export interface setNamePayload {
    name: string;
}

export interface setAvatarPayload {
    avatar: string;
}

export interface setUsernamePayload {
    username: string;
}

export interface controller {
    controller: AbortController;
}

export type controllerUnMounted = {
    controller: AbortController;
    unMounted: boolean;
};

export interface LoadingButtonProps {
    marginTop: string;
}

export interface SingleRoomAvatarProps {
    src: string;
}

export interface ChatBoxProps {
    onClose: () => void;
    isOpen: boolean;
    btnRef: React.RefObject<HTMLButtonElement>;
}

export interface ControlsProps {
    onOpen: () => void;
    btnRef: React.RefObject<HTMLButtonElement>;
}

export interface SingleChatProps {
    chatContent: string;
    userAvatar: string;
    position: 'LEFT' | 'RIGHT';
}

export interface CreateRoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    inputInitalRef: React.RefObject<HTMLInputElement>;
}

export interface ModalButtonProps {
    roomType: 'OPEN' | 'SOCIAL' | 'PRIVATE';
    setRoomType: React.Dispatch<
        React.SetStateAction<'OPEN' | 'SOCIAL' | 'PRIVATE'>
    >;
}

export interface RoomSliceIntial {
    //
}

export interface openRoomModalTypes {
    inputInitalRef: React.RefObject<HTMLInputElement>;
    onClose: () => void;
    nextModal: React.Dispatch<React.SetStateAction<number>>;
}

export interface stepShareProps {
    nextModal: React.Dispatch<React.SetStateAction<number>>;
}

export interface userMiniType {
    email: String;
    name: String;
    profile_photo: {
        id: String;
        secure_url: String;
    };
    user_id: String;
    username: String;
    _id: String;
}

export interface createRoomResponse {
    room: {
        createdAt: Date;
        creator_id: userMiniType;
        room_id: String;
        room_name: String;
        room_type: 'OPEN' | 'SOCIAL' | 'PRIVATE';
        speakers: Array<userMiniType>;
        _id: String;
    };
    success: true | false;
}
