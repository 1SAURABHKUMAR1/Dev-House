import Axios from './Axios';

const getAllRooms = () => Axios.get('/room/rooms');

const createRooms = (
    roomName: string,
    roomType: 'OPEN' | 'SOCIAL' | 'PRIVATE',
) =>
    Axios.post('/room/create', {
        name: roomName,
        type: roomType,
    });

export { getAllRooms, createRooms };
