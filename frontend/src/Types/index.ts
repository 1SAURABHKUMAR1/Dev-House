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
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface authSliceIntialState {
    login: boolean;
    userId: string;
    username: string;
    name: string;
    email: string;
    photo: string;
    id: string;
    getAuthState: string;
}
