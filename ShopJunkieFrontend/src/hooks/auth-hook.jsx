import { useState , useCallback, useEffect } from "react";

let logoutTimer;


export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [shopId, setShopId] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();


    const login = useCallback((sid, token, expirationDate) => {
        setToken(token)
        setShopId(sid)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem('shopData', JSON.stringify({ shopId: sid, token: token, expiration: tokenExpirationDate.toISOString() }));
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null);
        setShopId(null)
        localStorage.removeItem('shopData');
    }, []);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime)
        }
        else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('shopData'));
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.shopId, storedData.token, new Date(storedData.expiration));
        }
    }, [login])

    return {token , login, logout , shopId};

}