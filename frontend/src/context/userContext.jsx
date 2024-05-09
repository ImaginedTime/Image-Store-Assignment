import { createContext, useState } from "react";

export const UserContext = createContext("");

export default function UserContextProvider({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <UserContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            searchQuery,
            setSearchQuery
        }}>
            {children}
        </UserContext.Provider>
    )
}