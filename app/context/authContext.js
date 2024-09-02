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
        login: () => {},  // Placeholder function
        logout: () => {}, // Placeholder function
      };
    }
    return {
      tokens: null,
      login: () => {},  // Placeholder function
      logout: () => {}, // Placeholder function
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




      

      // Save tokens to state and localStorage
      setGlobalLoginState((prevState) => ({
        ...prevState,
        tokens: tokens,
        login: login,
        logout: logout,
      }));

      if (typeof window !== "undefined") {
        localStorage.setItem("tokens", JSON.stringify(tokens)); // Save to localStorage
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
    }));

    if (typeof window !== "undefined") {
      localStorage.removeItem("tokens"); // Remove tokens from localStorage
    }
  }

  // 6. Ensure login/logout functions are updated in the state
  useEffect(() => {
    setGlobalLoginState((prevState) => ({
      ...prevState,
      login: login,
      logout: logout,
      
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
