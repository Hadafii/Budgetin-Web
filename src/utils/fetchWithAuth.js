export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/Login";
        throw new Error("No token found, redirecting to login.");
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
        // Handle token expiration
        const refreshTokenResponse = await fetch("https://api.dafiutomo.com/GatewayApi/v1/refreshToken", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const refreshData = await refreshTokenResponse.json();

        if (refreshTokenResponse.ok && refreshData.success) {
            localStorage.setItem("token", refreshData.token);
            headers.Authorization = `Bearer ${refreshData.token}`;
            // Retry original request
            const retryResponse = await fetch(url, { ...options, headers });
            return await retryResponse.json();
        } else {
            localStorage.removeItem("token");
            window.location.href = "/Login";
            throw new Error("Session expired. Redirecting to login.");
        }
    }

    return await response.json();
};
