import { codeBoxType } from 'Types';
import Axios from './Axios';

const createCodebox = (codeboxName: string, language: codeBoxType) =>
    Axios.post('/codebox/create', {
        room_name: codeboxName,
        language,
    });

const joinCodebox = (codeboxId: string) =>
    Axios.get(`/codebox/join/${codeboxId}`);

export { createCodebox, joinCodebox };
