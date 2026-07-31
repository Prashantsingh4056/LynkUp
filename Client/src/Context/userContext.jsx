import { createContext, useContext, useState } from "react";

export const userContext = createContext(null);

export const UserProvider = ({children}) => {

    const [user , setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    return <userContext.Provider value={{user , setUser, setLoading, loading}}>
        {children}
    </userContext.Provider>
}


export const getUserData = () => useContext(userContext);