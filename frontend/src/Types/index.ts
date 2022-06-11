import React from 'react';

export interface Children {
    children: React.ReactNode;
    center?: boolean;
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
