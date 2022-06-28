import React from 'react';
import { IconType } from 'react-icons';

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
    username: string;
    addAudioRef: addAudioRefType;
    userId: string;
    muted?: boolean;
}

export interface ChatBoxProps {
    onClose: () => void;
    isOpen: boolean;
    btnRef: React.RefObject<HTMLButtonElement>;
}

export interface ControlsProps {
    onOpen: () => void;
    btnRef: React.RefObject<HTMLButtonElement>;
    handleMuted: mutedFunction;
    userId: string;
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
    roomId: string;
    roomPassword: string;
    qrcode: string;

    authenticated: 'PENDING' | 'NOTAUTHENTICATED' | 'AUTHENTICATED';
    _id: string;
    name: string;
    room_id: string;
    type: 'OPEN' | 'SOCIAL' | 'PRIVATE';
    speakers: Array<userMiniType>;
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
    email: string;
    name: string;
    profile_photo: {
        id: string;
        secure_url: string;
    };
    user_id: string;
    username: string;
    _id: string;
}

export interface createRoomResponse {
    room: roomType;
    success: boolean;
}

export interface roomType {
    _id: string;
    name: string;
    creator: userMiniType;
    room_id: string;
    type: 'OPEN' | 'SOCIAL' | 'PRIVATE';
    speakers: Array<userMiniType>;
    password?: string;
    createdAt: Date;
    qrcode: {
        id: string;
        secure_url: string;
    };
}

export interface singleRoomCardType {
    roomName: string;
    speakers: Array<userMiniType>;
}

export interface copyFieldProps {
    labelText: string;
    inputCopyValue: string;
    marginTop: string;
    fieldType: 'ROOM_URL' | 'ROOM_PASSWORD';
}

export interface shareButtonProps {
    ToolTipText: string;
    Icon: IconType;
    ButtonColor: string;
    roomId: string;
    roomPassword: string;
    shareType: 'WHATSAPP' | 'TWITTER' | 'TELEGRAM';
}

export interface qrModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface shareModalProps {
    qrModalOnOpen: () => void;
}

export interface notFoundTemplateProps {
    mainContent: string;
    buttonText: string;
    buttonLink: string;
}

export type initialUsersType = Array<socketUser>;

export type newStateType = (
    prevState: initialUsersType,
) => initialUsersType | initialUsersType;

export type cbType = (users: initialUsersType) => void;

export type addUserType = (
    newUserInfo: socketUser | ((users: initialUsersType) => initialUsersType),
    cb: cbType | null,
) => void;

export type updateStateWithCallback = (
    initalUsers: initialUsersType,
) => [initialUsersType, addUserType];

export type useSingleRoomWebRtcType = (
    roomId: string,
    user: socketUser,
) => {
    users: Array<socketUser>;
    handleMuted: mutedFunction;
    addAudioRef: addAudioRefType;
};

export type socketUser = {
    userId: string;
    username: string;
    photo: string;
    muted: boolean;
};

export type cbRefType = {
    stateFunction: cbType | null;
};

export type addAudioRefType = (
    userId: string,
    instance: HTMLAudioElement,
) => void;

export interface singleRoomUsersProps {
    users: Array<socketUser>;
    addAudioRef: addAudioRefType;
}

export type currentUserAudioInput = {
    media: MediaStream | null;
};

export type roomUserType = {
    rtc: {
        [socketId: string]: RTCPeerConnection;
    };
    audio: {
        [userId: string]: HTMLAudioElement;
    };
};

export interface socketAddUserProps {
    addUser: addUserType;
    currentUserAudioInput: React.MutableRefObject<currentUserAudioInput>;
    roomUsers: React.MutableRefObject<roomUserType>;
}

export interface socketGetIceCandidateProps {
    roomUsers: React.MutableRefObject<roomUserType>;
}

export interface socketGetOfferAnsProps {
    roomUsers: React.MutableRefObject<roomUserType>;
}

export interface socketRemoveUserProps {
    addUser: addUserType;
    roomUsers: React.MutableRefObject<roomUserType>;
}

export interface socketADDUSERPROPS {
    socketId: string;
    createOffer: boolean;
    user: socketUser;
}

export interface socketICECANDIDATEPROPS {
    socketId: string;
    icecandidate: RTCIceCandidate;
}

export interface socketGETOFFERANSPROPS {
    socketId: string;
    offerOrAns: RTCSessionDescriptionInit;
}

export interface socketREMOVEUSERPROPS {
    userId: string;
    socketId: string;
}

export interface SingleRoomButton {
    tooltipLabel: string;
    buttonText: string;
    onClick?: () => void;
    btnRef?: React.RefObject<HTMLButtonElement>;
}

export type mutedFunction = (userId: string) => void;

export interface socketMuteUnmuteProps {
    addUser: addUserType;
}

export interface socketMUTEUNMUTEPROPS {
    userId: string;
    mute: boolean;
}
