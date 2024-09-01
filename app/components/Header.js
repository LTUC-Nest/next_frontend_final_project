"use client";
import { useContext } from "react";
import { ThemeContext } from "../context/theme";

export default function Header() {
    const { light, toggleThemeHandler } = useContext(ThemeContext);

    return (
        <header className="bg-[#6d5841] text-white p-4 transition-colors duration-500 ease-in-out">
            <nav className="flex justify-between items-center">
                <h1 className="text-xl font-bold">My App</h1>
                <button
                    onClick={toggleThemeHandler}
                    className="p-2 rounded-full bg-[#b6a087] hover:bg-[#a58f76] transition-transform duration-500 ease-in-out"
                >
                    <div className="relative w-8 h-8">
                        <div
                            className={`absolute inset-0 transform ${
                                light ? 'rotate-0' : 'rotate-90'
                            } transition-transform duration-500 ease-in-out`}
                        >
                            {/* Sun Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className={`w-8 h-8 ${light ? 'opacity-100' : 'opacity-0'}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="5" />
                                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.02-1.42l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42m12.02 1.42l1.42-1.42" />
                            </svg>
                        </div>
                        <div
                            className={`absolute inset-0 transform ${
                                light ? '-rotate-90' : 'rotate-0'
                            } transition-transform duration-500 ease-in-out`}
                        >
                            {/* Moon Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                className={`w-8 h-8 ${light ? 'opacity-0' : 'opacity-100'}`}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            >
                                <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
                            </svg>
                        </div>
                    </div>
                </button>
            </nav>
        </header>
    );
}
