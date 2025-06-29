"use client";

import React, { useState, useEffect, createContext } from "react";
import { useSession } from "next-auth/react";

export const AuthContext = createContext(null);

export default function WrappedAuthentication({ children }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true); // Auth lock
    // const [user, setUser] = useState();
    const { data: session } = useSession();

    async function getAuthStatus() {
        setIsAuthenticating(true);
        // const status = session;
        setAuthenticated(!!session);
        setIsAuthenticating(false);
    }

    useEffect(() => {
        getAuthStatus();
        // alert(status);
    }, [])

    return (
        !isAuthenticating && <AuthContext.Provider value={{ authenticated, session }}>{children}</AuthContext.Provider>
    );
};

