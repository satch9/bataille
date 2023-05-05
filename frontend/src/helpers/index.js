import { AUTH_TOKEN } from "../constants"

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
}

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}