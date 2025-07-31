import { use, useEffect, useState } from "react";

// This hook fetches data from a REST API endpoint and returns the response.
export const useFetch = (url) => {

    const [fetchResponse, setFetchResponse] = useState("...");

    // always POST for security reasons (Gateway will translate))
    useEffect(() => {
        const fetchRequest = async () => {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    targetMethod: "GET",
                    queryParams: {},
                    body: {}
                })
            });
            const data = await response.json();
            setFetchResponse(data);
        };

        fetchRequest();
    }, [url]);

    return fetchResponse;
};