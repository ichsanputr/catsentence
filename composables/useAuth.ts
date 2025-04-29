export const useAuth = () => {
    const saveToken = async (token) => {
        localStorage.setItem('jwt_token', token);
    };

    const removeToken = async () => {
        localStorage.removeItem('jwt_token');
    };

    const getToken = () => {
        return localStorage.getItem('jwt_token');
    };

    return { saveToken, removeToken, getToken };
}