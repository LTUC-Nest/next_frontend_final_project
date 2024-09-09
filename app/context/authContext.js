'use client';
import axios from "axios";
import { createContext, useEffect, useState } from "react";

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the context wrapper
export default function AuthWrapper({ children }) {
  // Add a loading state
  const [loading, setLoading] = useState(true);
  
  const [globalLoginState, setGlobalLoginState] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem('tokens');
      return {
        tokens: storedTokens ? JSON.parse(storedTokens) : null,
        user: null,
        login: () => {},  // Placeholder function
        logout: () => {}, // Placeholder function
        refreshAccessToken: () => {}, // Placeholder function for refreshing the token
        userRole: null, // New state for user role
        userList: [], // New state for user list
      };
    }
    return {
      tokens: null,
      user: null,
      login: () => {},  // Placeholder function
      logout: () => {}, // Placeholder function
      refreshAccessToken: () => {}, // Placeholder function for refreshing the token
      userRole: null, // New state for user role
      userList: [], // New state for user list
    };
  });

  // 3. useEffect to check localStorage and update loading state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTokens = localStorage.getItem('tokens');
      setGlobalLoginState((prevState) => ({
        ...prevState,
        tokens: storedTokens ? JSON.parse(storedTokens) : null,
      }));
      setLoading(false); // Set loading to false after tokens are checked
    }
  }, []);

  // 4. Define the login function
  async function login(userInfo) {
    try {
      const url = 'http://127.0.0.1:8000/api/token/';
      const res = await axios.post(url, userInfo);
      const tokens = res.data;

      // Fetch user data
      const userRes = await axios.get('http://127.0.0.1:8000/api/v1/users/', {
        headers: { Authorization: `Bearer ${tokens.access}` },
      });
      const users = userRes.data;
      
      // Assuming you want to set the user as the one corresponding to the login
      const loggedInUser = users.find(user => user.username === userInfo.username);
      
      // Save tokens and user to state and localStorage
      setGlobalLoginState((prevState) => ({
        ...prevState,
        tokens: tokens,
        user: loggedInUser || null, // Set the logged-in user or null
        userRole: loggedInUser ? loggedInUser.role : null, // Set user role if available
        userList: users, // Save user list
        login: login,
        logout: logout,
        refreshAccessToken: refreshAccessToken,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem("tokens", JSON.stringify(tokens));
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  // 5. Define the logout function
  function logout() {
    console.log('Logout button clicked');
    setGlobalLoginState((prevState) => ({
      ...prevState,
      tokens: null,
      user: null,
      userRole: null, // Clear user role on logout
      userList: [], // Clear user list on logout
    }));

    if (typeof window !== "undefined") {
      localStorage.removeItem("tokens");
    }
  }

  // Define the refresh token function
  async function refreshAccessToken() {
    try {
      const refreshToken = globalLoginState.tokens?.refresh;
      if (!refreshToken) throw new Error("No refresh token available");

      const url = 'http://127.0.0.1:8000/api/token/refresh/';
      const res = await axios.post(url, { refresh: refreshToken });
      const newAccessToken = res.data.access;

      // Update state and localStorage with the new access token
      setGlobalLoginState((prevState) => ({
        ...prevState,
        tokens: { ...prevState.tokens, access: newAccessToken },
      }));

      if (typeof window !== "undefined") {
        const updatedTokens = { ...globalLoginState.tokens, access: newAccessToken };
        localStorage.setItem("tokens", JSON.stringify(updatedTokens));
      }

      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout(); // Logout the user if the refresh fails
      return null;
    }
  }

  // 6. Ensure login/logout functions are updated in the state
  useEffect(() => {
    setGlobalLoginState((prevState) => ({
      ...prevState,
      login: login,
      logout: logout,
      refreshAccessToken: refreshAccessToken,
    }));
  }, []);

  // 7. Display loading spinner or blank screen while loading
  if (loading) {
    return <div>Loading...</div>; // Replace with a spinner or your preferred loading UI
  }

  return (
    <AuthContext.Provider value={globalLoginState}>
      {children}
    </AuthContext.Provider>
  );
}
