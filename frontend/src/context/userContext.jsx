import { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

    const [searchQuery, setSearchQuery] = useState('');

	const baseURL = import.meta.env.VITE_API_URL;

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            searchQuery,
            setSearchQuery,
            baseURL
        }}>
            {children}
        </UserContext.Provider>
    )
}