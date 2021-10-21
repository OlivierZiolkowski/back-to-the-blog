/**
 * Auth declares a new context to authenticates user
 * Its' contains an AuthProvider & a custom hook
 */

// Hooks / Functions
import { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChange } from "@lib/firebase";

// Declare a new context for authentication
const AuthContext = createContext({ user: null, userLoading: true });

//* AuthProvider component
export const AuthProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthStateChange((res) => {
            setUser(res);
            setUserLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={[user, userLoading]}>
            {children}
        </AuthContext.Provider>
    );
};

//* useAuth custom hook
export const useAuth = () => useContext(AuthContext);
