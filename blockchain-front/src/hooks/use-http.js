import { useState, useCallback } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method : 'GET',
                    headers: requestConfig.headers ? requestConfig.headers : { 'Content-Type': 'application/json' },
                    body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
                }
            );

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data ? data.message : 'Request has failed!');
            }

            applyData(data);
        } catch(e) {
            setError(e.message || 'Something went wrong!');
        }
        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
};

export default useHttp;