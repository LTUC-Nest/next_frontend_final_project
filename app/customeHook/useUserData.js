import { useContext } from "react";
import axios from "axios";
import useSWR from "swr";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/authContext";

const fetcher = (url, token) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);

const updater = (url, token, data) =>
    axios
        .patch(url, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);

export function useUserData() {
    const { tokens, refreshAccessToken } = useContext(AuthContext);

    // Decode the JWT token to get the user_id and username
    let userId, username;
    if (tokens?.access) {
        const decodedToken = jwtDecode(tokens.access);
        userId = decodedToken?.user_id;  // Adjust if your token has a different structure
        username = decodedToken?.username;  // Adjust if your token has a different structure
    }

    const { data, error, isLoading, mutate } = useSWR(
        tokens?.access && userId
            ? `http://127.0.0.1:8000/api/v1/users/${userId}`
            : null,
        (url) => fetcher(url, tokens.access),
        {
            onError: async (err) => {
                if (err.response?.status === 401) {
                    try {
                        const newAccessToken = await refreshAccessToken();
                        if (newAccessToken) {
                            mutate(); // Revalidate data with new token
                        }
                    } catch (refreshError) {
                        console.error("Failed to refresh token", refreshError);
                    }
                }
            },
            revalidateOnFocus: false, // Optionally, disable revalidation on focus
        }
    );

    // Function to update user data
    const updateUserData = async (updateData) => {
        try {
            if (!tokens?.access || !userId) {
                throw new Error("No access token or user ID available for updating data");
            }

            const updatedUser = await updater(`http://127.0.0.1:8000/api/v1/users/${userId}`, tokens.access, updateData);
            mutate(updatedUser, false); // Optimistically update the SWR cache
        } catch (err) {
            console.error("Error updating user data:", err);
            if (err.response?.status === 401) {
                try {
                    const newAccessToken = await refreshAccessToken();
                    if (newAccessToken) {
                        const updatedUser = await updater(`http://127.0.0.1:8000/api/v1/users/${userId}`, newAccessToken, updateData);
                        mutate(updatedUser, false); // Optimistically update the SWR cache
                    }
                } catch (refreshError) {
                    console.error("Failed to refresh token for updating", refreshError);
                }
            }
        }
    };


    return {
        userData: data,
        loading: isLoading,
        error,
        userId,
        username,
        updateUserData,
    };
}