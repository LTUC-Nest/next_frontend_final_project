"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeWrapper({ children }) {
    const [light, setLight] = useState(true);

    useEffect(() => {
        console.log("ThemeWrapper mounted"); // Add this line for debugging
        const savedLight = JSON.parse(localStorage.getItem("light"));
        if (savedLight === null) {
            localStorage.setItem("light", light);
        } else {
            setLight(savedLight);
            if (!savedLight) document.body.classList.add('dark');
        }
    }, []);

    function toggleThemeHandler() {
        setLight((prevLight) => {
            const newLight = !prevLight;
            localStorage.setItem("light", newLight);
            document.body.classList.toggle('dark', !newLight);
            return newLight;
        });
    }

    return (
        <ThemeContext.Provider value={{ light, toggleThemeHandler }}>
            {children}
        </ThemeContext.Provider>
    );
}
