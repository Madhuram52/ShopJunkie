import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const activehttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = "GET", data = null) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activehttpRequests.current.push(httpAbortCtrl);
        setError(null);

        try {
            const config = {
                method,
                url,
                data,
                signal: httpAbortCtrl.signal
            };

            const response = await axios(config);
            activehttpRequests.current = activehttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl);
            setIsLoading(false);
            return response.data;
        } catch (err) {
            setIsLoading(false);
            setError(err.response.data.message || "Something went wrong!");
            throw err;
        }
    }, []);
    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            activehttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};

export default useHttpClient;
