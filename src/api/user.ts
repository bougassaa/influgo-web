import axios from "axios";

type User = {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export function createUser(data: User) {
    return axios.post('/user', data);
}