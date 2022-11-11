import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { catchError } from "../API/common";

interface UserContextProps {
    session: SessionProps | null
    setSession: Dispatch<SetStateAction<SessionProps | null>>
    refreshSession: () => Promise<SessionProps>
}

const UserContext = createContext<UserContextProps | {}>({});

interface UserContextProvider {
    children: ReactNode
    session: SessionProps
}

export const UserContextProvider = ({ children, session: ssrSession }: UserContextProvider) => {
    const [session, setSession] = useState(ssrSession);

    const refreshSession = async () => {
        try {
            const server = process.env.NEXT_PUBLIC_SERVER_URL;
            const url = `${server}/user`;
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include'
            });
            const session = await response.json();
            if (!response.ok) {
                throw new Error(session?.msg);
            } else {
                return setSession(session);
            }
        } catch (err) {
            throw catchError(err);
        }
    }

    return (
        <UserContext.Provider value={{
            session,
            setSession,
            refreshSession
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useSession = () => {
    const context = useContext(UserContext) as UserContextProps;
    if (!context) {
        throw new Error(
        'Session component must be used with UserContextProvider component',
        );
    }
    return context;
}