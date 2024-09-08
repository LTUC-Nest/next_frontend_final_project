import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/app/context/authContext';
import useSWR from 'swr';
import { jwtDecode } from 'jwt-decode';

// Custom hook for user data operations
export const useUserData = (apiEndPoint) => {
    const { tokens } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (tokens) {
            try {
                const decoded = jwtDecode(tokens.access);
                setUserId(decoded.user_id);
            } catch (err) {
                console.log('Error decoding token:', err);
            }
        }
    }, [tokens]);

    const config = () => {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokens?.access
            }
        };
    };

    const fetcher = async (url) => {
        if (!tokens || !userId) return;
        try {
            const res = await fetch(url, config());
            const jsonRes = await res.json();
            setProfileImage(jsonRes.profile_picture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600');
            return jsonRes;
        } catch (err) {
            console.log('Error fetching data:', err);
            throw err;
        }
    };

    const { data: userData, error, mutate } = useSWR(userId ? `${apiEndPoint}/${userId}` : null, fetcher);

    const updateResource = async (userInfo) => {
        if (!tokens || !userId) return;
        try {
            const url = `${apiEndPoint}/${userId}`;
            const options = { ...config(), method: 'PUT', body: JSON.stringify(userInfo) };
            await fetch(url, options);
            mutate(); // Revalidate data after update
        } catch (err) {
            console.log('Error during updating data:', err);
        }
    };

    const retrieveResource = async () => {
        if (!tokens || !userId) return;
        try {
            const url = `${apiEndPoint}/${userId}`;
            const res = await fetch(url, config());
            const jsonRes = await res.json();
            return jsonRes;
        } catch (err) {
            console.log('Error during retrieving data:', err);
            throw err;
        }
    };

    return { userData, profileImage, updateResource, retrieveResource, error, loading: !userData && !error };
};
