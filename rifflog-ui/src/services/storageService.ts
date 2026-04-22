// handles token operations for authentication

export const getTokenFromStorage = () => {
    return localStorage.getItem('token');
}

export const setTokenInStorage = (token: string) => {
    return localStorage.setItem('token', token);
}

export const removeTokenFromStorage = () => {
    return localStorage.removeItem('token');
}