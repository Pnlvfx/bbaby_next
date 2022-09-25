import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<SessionProps | {}>({});

interface UserContextProvider {
    children: ReactNode
    session: SessionProps['session']
}

export const UserContextProvider = ({ children, session }: UserContextProvider) => {
    return (
        <UserContext.Provider value={{
            session
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useSession = () => {
    const context = useContext(UserContext) as SessionProps;
    if (!context) {
        throw new Error(
        'Session component must be used with UserContextProvider component',
        );
    }
    return context;
}