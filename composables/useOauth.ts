export const useOauth = () => {
    const { $axios} = useNuxtApp();
    
    const authGoogle = async (tokenResponse) => {
        const { data } = await $axios.post("/auth/google", {
            name: tokenResponse.displayName,
            picurl: tokenResponse?.photoUrl,
            email: tokenResponse.email,
            oauthtoken: tokenResponse.oauthAccessToken,
            idtoken: tokenResponse.oauthIdToken,
        });

        return data.data?.token
    };

    const authX = async (result) => {
        const { data } = await $axios.post("/auth/x", {
            name: result.user.displayName,
            iduser: result.user.providerData[0].uid,
            idtoken: result._tokenResponse.idToken,
        });

        return data.data?.token
    };

    const register = async (form) => {
        await $axios.post("/auth/register", form);
    };

    const login = async (form) => {
        const { data } = await $axios.post("/auth/login", form);
        return data.data?.token
    };

    return { authX, authGoogle, register, login };
}