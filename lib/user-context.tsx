import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';

interface UserSessionContextType {
    session: Session | null;
    setSession: (session: Session | null) => void;
    isLoggedIn: boolean;
}

const defaultState: UserSessionContextType = {
    session: null,
    setSession: () => { },
    isLoggedIn: false
};

const UserSessionContext = createContext<UserSessionContextType>(defaultState);

interface UserSessionProviderProps {
    children: ReactNode;
}

export const UserSessionProvider: React.FC<UserSessionProviderProps> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);

    return (
        <UserSessionContext.Provider
            value={{
                session: session,
                setSession: setSession,
                isLoggedIn: !!session
            }}
        >
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => useContext(UserSessionContext);